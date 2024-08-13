import { ApiMessage } from '@/services/client/type';

self.addEventListener('message', async (event) => {
  const message = event.data as ApiMessage;
  switch (message.type) {
    case 'createFile': {
      break;
    }
  }
});
