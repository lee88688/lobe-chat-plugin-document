'use client';

import { lobeChat } from '@lobehub/chat-plugin-sdk/client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchClothes } from '@/services/clothes';
import { ResponseData } from '@/type';

export default function IframePage() {
  // 初始化渲染状态
  const [data, setData] = useState<ResponseData>();

  const workerRef = useRef<Worker>();

  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化时从主应用同步状态
  useEffect(() => {
    lobeChat.getPluginMessage().then((res) => {
      console.log('getPluginMessage', res);
    });
  }, []);

  // 记录请求参数
  const [payload, setPayload] = useState<any>();

  useEffect(() => {
    lobeChat.getPluginPayload().then((payload) => {
      console.log('getPluginPayload', payload);
    });
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL('../../workers/test.ts', import.meta.url));
    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = undefined;
    };
  }, []);

  const fetchData = async () => {
    const data = await fetchClothes(payload);
    setData(data);
    lobeChat.setPluginMessage(data);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // const content = await new Promise<string>((resolve, reject) => {
    //   const fileReader = new FileReader();
    //   fileReader.addEventListener('load', () => {
    //     resolve(fileReader.result as string);
    //   });
    //   fileReader.addEventListener('error', () => {
    //     reject();
    //   });
    //   fileReader.readAsText(file);
    // });

    if (workerRef.current) {
      workerRef.current.postMessage(await file.arrayBuffer());
    }

    const text = await new Promise<string>((resolve) => {
      workerRef.current?.addEventListener('message', (e) => {
        resolve(e.data);
      });
    });
    console.log('text', text);

    lobeChat.setPluginMessage(text, true);
  };

  return (
    <div className={'h-screen flex flex-col p-2'}>
      <div className={'flex flex-row items-center gap-2'}>
        <Input placeholder={'搜索文件名称'} />
        <Button onClick={() => inputRef.current?.click()}>添加新文件</Button>
      </div>
      <input
        className={'hidden'}
        onChange={handleFileChange}
        ref={inputRef}
        type={'file'}
        value={''}
      />
    </div>
  );
}
