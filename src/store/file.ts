import { getDatabase } from '@/database';
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useFileStore = create(combine({
  files: [],
}, (set, get) => ({
    async getFiles() {
      const db = getDatabase();
      const fileItems = await db.file.toArray();
      return fileItems;
    },
  }),
));
