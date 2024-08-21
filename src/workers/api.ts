import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import { MarkdownTextSplitter } from '@langchain/textsplitters';
import { nanoid } from 'nanoid';

import { getDatabase } from '@/database';
import { Embedding } from '@/database/type';
import { ApiMessage, ApiMessageResponse, ApiMessageType } from '@/services/client/type';

type ApiHandleMap = {
  [k in ApiMessageType]: (
    data: Extract<ApiMessage, { type: k }> & { messageId: string },
  ) => Promise<ApiMessageResponse<any> & { messageId: string }>;
};

const apiHandle: ApiHandleMap = {
  [ApiMessageType.CreateFile]: async (message) => {
    const { default: pdf2md } = await import('@/lib/pdf2md');
    const content = await pdf2md(message.data);

    const blobId = nanoid();
    await getDatabase().blob.add({
      id: blobId,
      mimeType: message.mimeType,
      data: message.data,
      createdAt: new Date().toISOString(),
    });

    const fileId = nanoid();
    await getDatabase().file.add({
      id: fileId,
      name: message.name,
      mimeType: message.mimeType,
      content,
      createdAt: new Date().toISOString(),
      blobId,
    });

    return {
      messageId: message.messageId,
      success: true,
      data: {
        id: fileId,
      },
    };
  },
  [ApiMessageType.TextSplit]: async (message) => {
    const fileItem = await getDatabase().file.get({
      id: message.fileId,
    });
    if (!fileItem) {
      return {
        messageId: message.messageId,
        success: false,
        errors: [{ code: 'NOT_FOUND', message: 'file not found' }],
      };
    }

    const splitter = new MarkdownTextSplitter();
    const chunks = splitter.splitText(fileItem.content);

    return {
      messageId: message.messageId,
      success: true,
      data: {
        chunks,
      },
    };
  },
  [ApiMessageType.CreateFileChunk]: async (message) => {
    const { messageId, chunks, fileId } = message;
    // delete old chunks and embeddings
    try {
      const db = getDatabase();
      await db.transaction('rw', db.textChunk, db.embedding, async () => {
        await db.embedding.where('fileId').equals(fileId).delete();
        await db.textChunk.where('fileId').equals(fileId).delete();
      });

      const createdAt = new Date().toISOString();
      const chunksData = chunks.map((chunk) => ({
        id: nanoid(),
        fileId,
        content: chunk.content,
        createdAt,
      }));
      await db.textChunk.bulkAdd(chunksData);

      const embeddingsData: Embedding[] = [];
      const model = new HuggingFaceTransformersEmbeddings({
        model: 'Xenova/all-MiniLM-L6-v2',
      });
      for (const chunk of chunksData) {
        const embedding = await model.embedQuery(chunk.content);
        embeddingsData.push({
          id: nanoid(),
          chunkId: chunk.id,
          fileId,
          createdAt,
        });
      }
      await db.embedding.bulkAdd(embeddingsData);
    } catch (error) {
      return {
        messageId,
        success: false,
        errors: [{ code: 'NOT_FOUND', message: `${error}` }],
      };
    }

    return {
      messageId,
      success: true,
      data: null,
    };
  },
};

function returnMessage<T>(props: ApiMessageResponse<T> & { messageId: string }) {
  self.postMessage(props);
}

self.addEventListener('message', async (event) => {
  const message = event.data as ApiMessage & { messageId: string };

  // const model = new HuggingFaceTransformersEmbeddings({
  //   model: 'Xenova/all-MiniLM-L6-v2',
  // });
  // const data = await model.embedQuery(message.content);
  // return returnMessage({ success: true, data, messageId: message.messageId });

  const handler = apiHandle[message.type] as (
    data: any,
  ) => Promise<ApiMessageResponse<any> & { messageId: string }>;
  returnMessage(await handler(message));
});
