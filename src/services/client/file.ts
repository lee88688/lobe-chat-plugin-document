import { ApiCreateFileMessage, ApiMessageType } from './type';
import { request } from './worker';

export function createFile(props: Omit<ApiCreateFileMessage, 'type'>) {
  return request<{ id: string }>({ ...props, type: ApiMessageType.CreateFile });
}
