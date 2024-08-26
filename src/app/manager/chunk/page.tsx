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

export default function ChunkPage() {

  useEffect(() => {
    const model = new TransformersEmbeddings();
    (async () => {
      const embeddings = await model.embed('how are you', 'fine');
      console.log('Embeddings:', embeddings);
    })();
  }, []);

  return (
    <div className="p-4 flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-xl font-bold mb-4">Subtitle</h2>
        <Select>
          <SelectTrigger className="w-1/2">
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
      <div className="w-1/2 flex flex-wrap gap-2">
        <div className="p-2 border rounded">Text 1</div>
        <div className="p-2 border rounded">Text 2</div>
        <div className="p-2 border rounded">Text 3</div>
        <div className="p-2 border rounded">Text 4</div>
        <div className="p-2 border rounded">Text 5</div>
      </div>
    </div>
  );
}
