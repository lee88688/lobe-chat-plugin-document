export interface FileItem {
  content: string;
  createdAt: string;
  data: ArrayBuffer;
  id: string;
  mimeType: string;
  name: string;
}

export interface TextChunk {
  content: string;
  createdAt: string;
  fileId: string;
  id: string;
}

export interface Embedding {
  chunkId: string;
  createdAt: string;
  data: ArrayBuffer;
  fileId: string;
  id: string;
}
