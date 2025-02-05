import React from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

const MarkdownContainer = ({ content }: Props) => {
  const handleCopyCode = (code: React.ReactNode) => {
    navigator.clipboard.writeText(code?.toString() || "");
    toast.success("Copied to clipboard");
  };
  return (
    <Markdown
      components={{
        h1: ({ children }) => {
          return <h1 className="text-2xl font-bold mb-1">{children}</h1>;
        },
        h2: ({ children }) => {
          return <h2 className="text-lg font-bold mb-1">{children}</h2>;
        },
        code: ({ node, className, children, ref, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className="relative my-4 rounded-xl overflow-hidden p-0 ">
              <button
                className="absolute top-3 right-3 hover:scale-110 transition duration-300 ease-in-out active:scale-80"
                onClick={() => handleCopyCode(children)}
              >
                <FaCopy className="h-6 w-6 " />
              </button>

              <SyntaxHighlighter
                {...props}
                PreTag="div"
                customStyle={{
                  margin: "0",
                  overflow: "scroll",
                }}
                language={match[1]}
                style={coldarkDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownContainer;
