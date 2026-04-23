import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a || []), ["target"], ["rel"]],
    img: [...(defaultSchema.attributes?.img || []), ["loading"], ["alt"], ["title"]],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https", "data"],
    href: ["http", "https", "mailto", "tel"],
  },
};

interface Props {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: Props) {
  return (
    <div className={`prose prose-green max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-img:rounded-xl prose-img:my-6 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-li:text-muted-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:text-foreground ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />
          ),
          img: ({ node, ...props }) => (
            <img {...props} loading="lazy" />
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}
