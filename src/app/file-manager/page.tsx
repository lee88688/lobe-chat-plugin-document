'use client';

import { ColumnDef } from '@tanstack/react-table';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];

export default function Page() {
  const [openDialog, setOpenDialog] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container mx-auto py-10">
      <Button onClick={() => setOpenDialog(true)}>上传</Button>
      <DataTable columns={columns} data={[]} />
      <Dialog onOpenChange={(open) => setOpenDialog(open)} open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>选择文件</DialogTitle>
            <DialogDescription>选择文件进行解析并创建搜索库</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">文件</Label>
              <Input className="col-span-3" ref={fileInputRef} type={'file'} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">名称</Label>
              <Input className="col-span-3" value="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">上传</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
