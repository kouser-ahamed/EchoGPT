import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Code2 } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className={`prose-dark font-sans text-xs sm:text-sm text-slate-200 leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-4 mb-2 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-bold text-white mt-3.5 mb-2 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-bold text-white mt-3 mb-1.5 flex items-center gap-1.5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-bold text-indigo-300 mt-2.5 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed mb-2.5 last:mb-0 text-slate-200">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="my-2 space-y-1.5 list-disc list-outside pl-4 text-slate-300 marker:text-indigo-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 space-y-1.5 list-decimal list-outside pl-4 text-slate-300 marker:text-indigo-400 marker:font-bold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 p-3.5 rounded-xl bg-indigo-500/10 border-l-4 border-indigo-500 text-indigo-200 text-xs sm:text-sm shadow-sm space-y-1">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-3.5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 shadow-md">
              <table className="w-full text-left border-collapse text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-200 uppercase tracking-wider font-bold text-[11px]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/70">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-slate-900/50 odd:bg-slate-950/40 hover:bg-slate-850 hover:bg-slate-800/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-3 font-bold text-white text-left border-r border-slate-800/60 last:border-r-0 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 text-slate-300 border-r border-slate-800/40 last:border-r-0 align-top">
              {children}
            </td>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const isInline = !codeClassName && !String(children).includes('\n');
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-slate-850 bg-slate-800/90 text-cyan-300 font-mono text-[11px] sm:text-xs border border-slate-700/60"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const match = /language-(\w+)/.exec(codeClassName || '');
            const lang = match ? match[1] : 'code';
            const codeIndex = Math.abs(codeString.length + codeString.charCodeAt(0));

            return (
              <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-lg">
                <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    {lang}
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeString, codeIndex)}
                    className="hover:text-white flex items-center gap-1 text-[11px] text-slate-400 transition-colors px-1.5 py-0.5 rounded bg-slate-800/60"
                    title="Copy code"
                  >
                    {copiedCodeIndex === codeIndex ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 overflow-x-auto text-slate-200 leading-relaxed font-mono text-xs">
                  <code>{children}</code>
                </pre>
              </div>
            );
          },
          hr: () => <hr className="my-4 border-slate-800" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
