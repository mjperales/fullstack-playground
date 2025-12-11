export interface RichTextNode {
  type: 'paragraph' | 'header' | 'list' | 'listItem' | 'span' | 'text';
  content?: RichTextNode[] | string;
  level?: number; // header level (1–6)
  format?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
  };
}

export const sampleContent: RichTextNode[] = [
  {
    type: 'header',
    level: 2,
    content: [{ type: 'text', content: 'Welcome to RichText' }],
  },
  {
    type: 'paragraph',
    content: [
      { type: 'text', content: 'This is a ' },
      {
        type: 'span',
        content: [
          {
            type: 'text',
            content: 'formatted',
            format: { bold: true, italic: true },
          },
        ],
      },
      { type: 'text', content: ' text example.' },
    ],
  },
  {
    type: 'list',
    content: [
      {
        type: 'listItem',
        content: [{ type: 'text', content: 'First item' }],
      },
      {
        type: 'listItem',
        content: [{ type: 'text', content: 'Second item' }],
      },
    ],
  },
];
