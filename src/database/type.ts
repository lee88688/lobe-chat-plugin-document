export interface FileItem {
  blobId: string;
  content: string;
  createdAt: string;
  id: string;
  mimeType: string;
  name: string;
}

export interface BlobItem {
  createdAt: string;
  data: ArrayBuffer;
  id: string;
  mimeType: string;
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
