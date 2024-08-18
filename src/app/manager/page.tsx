'use client';

import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Button, ButtonLoading } from '@/components/ui/button';
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
import { createFile } from '@/services/client/file';

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
  const [name, setName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useMutation({
    async mutationFn() {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        return;
      }
      const data = await createFile({
        data: await file.arrayBuffer(),
        mimeType: file.type,
        name,
      });

      return data;
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end pb-1">
        <Button
          onClick={() => {
            setName('');
            setOpenDialog(true);
          }}
          size={'sm'}
        >
          <Upload className="h-3.5 w-3.5 mr-1" />
          <span>上传</span>
        </Button>
      </div>
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
              <Input
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <DialogFooter>
            <ButtonLoading isLoading={isPending} onClick={() => mutate()} type="submit">
              上传
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
