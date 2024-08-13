import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { nanoid } from 'nanoid';

import { getDatabase } from '@/database';
import { ApiMessage, ApiMessageResponse } from '@/services/client/type';

function returnMessage<T>(props: ApiMessageResponse<T> & { messageId: string }) {
  self.postMessage(props);
}

let pdfWorker: Worker;
let pdfjs: any;

self.addEventListener('message', async (event) => {
  const message = event.data as ApiMessage & { messageId: string };
  switch (message.type) {
    case 'createFile': {
      const blob = new Blob([message.data], { type: message.mimeType });
      const [document] = await new WebPDFLoader(blob, {
        splitPages: false,
        async pdfjs() {
          if (pdfjs) {
            return pdfjs;
          }

          if (!pdfWorker) {
            pdfWorker = new Worker(new URL('pdfjsWorker', import.meta.url));
          }
          pdfjs = await import('pdfjs-dist');
          pdfjs.GlobalWorkerOptions.workerPort = pdfWorker;
          return pdfjs;
        },
      }).load();

      console.log(document.pageContent);

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
