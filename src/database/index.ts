import Dexie from 'dexie';

import { Embedding, FileItem, TextChunk } from '@/database/type';

class Database extends Dexie {
  embedding: Dexie.Table<Embedding, string>;
  file: Dexie.Table<FileItem, string>;
  textChunk: Dexie.Table<TextChunk, string>;

  constructor() {
    super('FileManager');
    this.version(1).stores({
      embedding: '&id, chunkId, fileId, createdAt',
      file: '&id, name, mimeType, createdAt',
      textChunk: '&id, fileId, content, createdAt',
    });

    this.embedding = this.table('embedding');
    this.file = this.table('file');
    this.textChunk = this.table('textChunk');
  }
}

let db: Database;

export function createDatabase() {
  db = new Database();
}

export function getDatabase() {
  if (!db) {
    createDatabase();
    if (!db) {
      throw new Error('Database not initialized');
    }
  }
  return db;
}
