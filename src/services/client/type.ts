export enum ApiMessageType {
  CreateFile = 'createFile',
  CreateFileChunk = 'createFileChunk',
  TextSplit = 'textSplit',
}

export type ApiCreateFileMessage = {
  data: ArrayBuffer;
  mimeType: string;
  name: string;
  type: ApiMessageType.CreateFile;
};

export type ApiTextSplitMessage = {
  fileId: string;
  type: ApiMessageType.TextSplit;
};

export type ApiCreateFileChunkMessage = {
  chunks: {
    content: string;
  }[];
  fileId: string;
  type: ApiMessageType.CreateFileChunk;
};

export type ApiMessage = ApiCreateFileMessage | ApiTextSplitMessage | ApiCreateFileChunkMessage;

export type ApiExtra = { id: string };

export type ApiMessageResponse<T> =
  | {
      data: T;
      success: true;
    }
  | {
      errors: { code: string; message: string }[];
      success: false;
    };
