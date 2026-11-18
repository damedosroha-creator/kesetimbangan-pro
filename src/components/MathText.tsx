import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'div' | 'span';
}

/**
 * Renders Indonesian prose mixed with inline ($...$) and block ($$...$$) LaTeX
 * via KaTeX without external CDN dependencies.
 */
export const MathText: React.FC<MathTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
}) => {
  // Split on $$...$$ first, then $...$
  const tokens: Array<{ type: 'text' | 'block' | 'inline'; content: string }> = [];
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: 'block', content: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'inline', content: match[2] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <Component className={className}>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return <React.Fragment key={idx}>{tok.content}</React.Fragment>;
        }
        const html = katex.renderToString(tok.content, {
          displayMode: tok.type === 'block',
          throwOnError: false,
          strict: false,
        });
        if (tok.type === 'block') {
          return (
            <span
              key={idx}
              className="block my-2 max-w-full overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return (
          <span
            key={idx}
            className="inline-block align-baseline max-w-full"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </Component>
  );
};
