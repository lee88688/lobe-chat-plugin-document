import { nanoid } from 'nanoid';

import { ApiMessage, ApiMessageResponse } from './type';

type Resolver<T> = {
  reject: (reason?: any) => void;
  resolve: (value: T) => void;
};

let worker: Worker;
const messages: Record<string, Resolver<ApiMessageResponse<any>>> = {};

function create() {
  worker = new Worker(new URL('../../workers/api.ts', import.meta.url));
  worker.addEventListener('message', (event) => {
    const { messageId, ...rest } = event.data;
    const message = messages[messageId];
    if (message) {
      message.resolve(rest);
      delete messages[messageId];
    }
  });
}

export function getWorker() {
  if (!worker) {
    create();
  }
  return worker;
}

export function request<T = any>(message: ApiMessage) {
  const worker = getWorker();
  const messageId = nanoid();

  return new Promise<ApiMessageResponse<T>>((resolve, reject) => {
    messages[messageId] = { reject, resolve };
    worker.postMessage({ ...message, messageId });
  });
}
