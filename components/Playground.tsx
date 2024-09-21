"use client";
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { LiveProvider, LivePreview } from 'react-live';
import * as React from 'react';
import { Button } from './ui/button';

interface PlaygroundProps {
  code: string;
}

const Playground = ({ code: defaultCode }: PlaygroundProps) => {
  const [code, setCode] = useState(defaultCode);

  // Inject Tailwind CSS styles directly into the LivePreview's rendered content
  const tailwindCSS = `
    @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  `;

  const PreviewWithTailwind = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        {/* Add a style block with Tailwind CSS to the preview area */}
        <style>{tailwindCSS}</style>
        <div className="preview-content">
        {children}
        </div>
      </div>
    );
  };

  function handleOnChange(value?: string) {
    setCode(value || '');
  }

  return (
    <div className="bg-white h-screen grid grid-cols-2">
      <div className="bg-[#1e1e1e] py-6">
        <Editor
          className="h-screen"
          defaultLanguage="javascript"
          defaultValue={code.trim()}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            contextmenu: false,
          }}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex max-w-3xl m-auto align-center items-center justify-center p-6">
        <LiveProvider
          code={code}
          scope={{
            React,
            Button,
          }}
        >
          <PreviewWithTailwind>
            <LivePreview />
          </PreviewWithTailwind>
        </LiveProvider>
      </div>
    </div>
  );
};

export default Playground;
