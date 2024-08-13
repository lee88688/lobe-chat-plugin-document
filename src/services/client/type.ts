export type ApiCreateFileMessage = {
  data: ArrayBuffer;
  mimeType: string;
  name: string;
  type: 'createFile';
};

export type ApiMessage = ApiCreateFileMessage;

export type ApiMessageResponse<T> = {
  data: T;
  success: true;
} | {
  errors: { code: string; message: string }[];
  success: false;
};
