'use client';

import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { DataTable } from '@/components/ui/dataTable';

export const columns: ColumnDef[] = [
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
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
