import React from 'react';
import type { RichTextNode } from './sampleContent';

interface IRichText {
  node: RichTextNode;
  parentType?: string;
  depth?: number;
}

function RichText({ node, parentType, depth = 0 }: IRichText) {
  switch (node.type) {
    case 'paragraph': {
      return (
        <p>
          {(node.content as RichTextNode[]).map((node, index) => (
            <RichText
              key={index}
              node={node}
              parentType={node.type}
              depth={depth + 1}
            />
          ))}
        </p>
      );
    }

    case 'header': {
      const Tag = `h${node.level}` as React.ElementType;
      return (
        <Tag>
          {(node.content as RichTextNode[]).map((child, index) => (
            <RichText
              key={index}
              node={child}
              parentType={node.type}
              depth={depth + 1}
            />
          ))}
        </Tag>
      );
    }

    case 'span': {
      return (
        <span>
          {(node.content as RichTextNode[]).map((node, index) => (
            <RichText
              key={index}
              node={node}
              parentType={node.type}
              depth={depth + 1}
            />
          ))}
        </span>
      );
    }

    case 'text': {
      let content: React.ReactNode;

      if (typeof node.content === 'string' || node.content == null) {
        content = node.content ?? null;
      } else if (Array.isArray(node.content)) {
        content = (node.content as RichTextNode[]).map((child, index) => (
          <RichText
            key={index}
            node={child}
            parentType={node.type}
            depth={depth + 1}
          />
        ));
      } else {
        content = null;
      }

      if (node.format?.bold) {
        content = <strong>{content}</strong>;
      }
      if (node.format?.italic) {
        content = <em>{content}</em>;
      }
      if (node.format?.underline) {
        content = <u>{content}</u>;
      }
      if (node.format?.code) {
        content = <code>{content}</code>;
      }

      return <>{content}</>;
    }

    // unordered-list - parent wrapper
    case 'list': {
      return (
        <ul>
          {(node.content as RichTextNode[]).map((node, index) => (
            <RichText
              key={index}
              node={node}
              parentType={node.type}
              depth={depth + 1}
            />
          ))}
        </ul>
      );
    }

    case 'listItem': {
      return (
        <li>
          {(node.content as RichTextNode[]).map((node, index) => (
            <RichText
              key={index}
              node={node}
              parentType={node.type}
              depth={depth + 1}
            />
          ))}
        </li>
      );
    }

    default: {
      return null;
    }
  }
}

export default RichText;
