import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { nanoid } from 'nanoid';

import { getDatabase } from '@/database';
import { ApiMessage, ApiMessageResponse } from '@/services/client/type';

function returnMessage<T>(props: ApiMessageResponse<T> & { messageId: string }) {
  self.postMessage(props);
}

self.addEventListener('message', async (event) => {
  const message = event.data as ApiMessage & { messageId: string };
  switch (message.type) {
    case 'createFile': {
      const blob = new Blob([message.data], { type: message.mimeType });
      const [document] = await new WebPDFLoader(blob, {
        async pdfjs() {
          const pdfjs = await import('pdfjs-dist');
          return pdfjs;
        },
      }).load();
      const id = nanoid();
      await getDatabase().file.add({
        id,
        name: message.name,
        mimeType: message.mimeType,
        content: document.pageContent,
        data: message.data,
        createdAt: new Date(),
      });

      return returnMessage({
        messageId: message.messageId,
        success: true,
        data: {
          id,
        },
      });
    }
  }
});
