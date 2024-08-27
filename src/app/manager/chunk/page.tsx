'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TransformersEmbeddings } from '@/lib/transformersEmbedding';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChunkPage() {

  useEffect(() => {
    const model = new TransformersEmbeddings();
    (async () => {
      const embeddings = await model.embed('how are you', 'fine');
      console.log('Embeddings:', embeddings);
    })();
  }, []);

  return (
    <div className="p-4 flex justify-center">
      <div className="max-w-screen-lg w-full px-4">
        <h2 className="text-xl font-bold mb-4">Subtitle</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2 flex flex-wrap gap-2">
            <Card>
              <CardHeader>
                <CardTitle>#1</CardTitle>
                <CardContent></CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
