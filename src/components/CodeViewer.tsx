"use client"; // Needs client-side interactivity for Tabs

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a style (e.g., atomDark, dracula, github, etc.)
// You might need to adjust imports based on the chosen style if using async loading
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Corrected theme name

interface CodeFile {
  name: string;
  content: string;
  language?: string; // Optional: language for highlighting (defaults to 'javascript')
}

interface CodeViewerProps {
  files: CodeFile[];
  defaultTab?: string; // Optional: filename to select by default
}

const CodeViewer: React.FC<CodeViewerProps> = ({ files, defaultTab }) => {
  if (!files || files.length === 0) {
    return <div className="border p-4 bg-muted text-muted-foreground">No code files provided.</div>;
  }

  // Determine the default value for Tabs, fallback to the first file name
  const defaultTabValue = defaultTab || files[0]?.name;

  return (
    <Tabs defaultValue={defaultTabValue} className="w-full border rounded-md">
      <TabsList className="bg-muted rounded-t-md rounded-b-none p-1 h-auto">
        {files.map((file) => (
          <TabsTrigger key={file.name} value={file.name} className="text-xs px-3 py-1.5">
            {file.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((file) => (
        <TabsContent key={file.name} value={file.name} className="m-0">
          {/* Apply max height and overflow for scrollable code blocks */}
           <div className="max-h-[600px] overflow-auto">
             <SyntaxHighlighter
               language={file.language || 'javascript'}
               style={atomDark} // Corrected theme name
               customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }} // Adjust padding/fontSize
               showLineNumbers // Optional: show line numbers
              wrapLines={true}
              wrapLongLines={true}
            >
              {file.content}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CodeViewer;
