export interface FileItem {
  content: string;
  createdAt: Date;
  data: ArrayBuffer;
  id: string;
  mimeType: string;
  name: string;
}

export interface TextChunk {
  content: string;
  createdAt: Date;
  fileId: string;
  id: string;
}

export interface Embedding {
  chunkId: string;
  createdAt: Date;
  data: ArrayBuffer;
  fileId: string;
  id: string;
}
