// ============================================================================
// GreenLock Cybersecurity — Portable Text to HTML Converter
// Converts Sanity Portable Text blocks to HTML at build time.
// This avoids needing a React client-side component for rendering.
// ============================================================================

import { urlFor } from './sanity';

// --- Types -------------------------------------------------------------------

interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
}

interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
  blank?: boolean;
}

interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: 'bullet' | 'number';
  level?: number;
}

interface PortableTextImage {
  _type: 'image';
  _key?: string;
  asset?: { _ref: string; _type: 'reference' };
  alt?: string;
  caption?: string;
}

interface PortableTextCode {
  _type: 'code';
  _key?: string;
  code?: string;
  language?: string;
}

type PortableTextNode = PortableTextBlock | PortableTextImage | PortableTextCode;

// --- Helpers -----------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSpan(span: PortableTextSpan, markDefs: PortableTextMarkDef[]): string {
  let html = escapeHtml(span.text);

  if (!span.marks || span.marks.length === 0) return html;

  // Apply marks from innermost to outermost
  for (const mark of span.marks) {
    switch (mark) {
      case 'strong':
        html = `<strong>${html}</strong>`;
        break;
      case 'em':
        html = `<em>${html}</em>`;
        break;
      case 'code':
        html = `<code>${html}</code>`;
        break;
      default: {
        // Check markDefs for annotations (e.g. links)
        const def = markDefs.find((d) => d._key === mark);
        if (def && def._type === 'link' && def.href) {
          const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
          html = `<a href="${escapeHtml(def.href)}"${target}>${html}</a>`;
        }
        break;
      }
    }
  }

  return html;
}

function renderBlock(block: PortableTextBlock): string {
  const markDefs = block.markDefs || [];
  const children = block.children || [];
  const innerHtml = children.map((child) => renderSpan(child, markDefs)).join('');

  // Don't wrap if this is a list item (handled by list grouping)
  if (block.listItem) {
    return innerHtml;
  }

  switch (block.style) {
    case 'h2':
      return `<h2>${innerHtml}</h2>`;
    case 'h3':
      return `<h3>${innerHtml}</h3>`;
    case 'h4':
      return `<h4>${innerHtml}</h4>`;
    case 'blockquote':
      return `<blockquote>${innerHtml}</blockquote>`;
    case 'normal':
    default:
      return innerHtml ? `<p>${innerHtml}</p>` : '';
  }
}

function renderImage(node: PortableTextImage): string {
  if (!node.asset) return '';
  try {
    const url = urlFor(node).width(800).auto('format').url();
    const alt = escapeHtml(node.alt || '');
    const caption = node.caption ? `<figcaption>${escapeHtml(node.caption)}</figcaption>` : '';
    return `<figure><img src="${url}" alt="${alt}" loading="lazy" />${caption}</figure>`;
  } catch {
    // urlFor throws if Sanity client not configured
    return '';
  }
}

function renderCode(node: PortableTextCode): string {
  if (!node.code) return '';
  const lang = node.language ? ` class="language-${escapeHtml(node.language)}"` : '';
  return `<pre><code${lang}>${escapeHtml(node.code)}</code></pre>`;
}

// --- Main Converter ----------------------------------------------------------

/**
 * Convert Sanity Portable Text blocks to an HTML string.
 * Handles text blocks, images, code blocks, and lists.
 */
export function portableTextToHtml(blocks: PortableTextNode[]): string {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return '';

  const result: string[] = [];
  let currentListType: 'bullet' | 'number' | null = null;

  for (let i = 0; i < blocks.length; i++) {
    const node = blocks[i];

    // Handle non-block types
    if (node._type === 'image') {
      // Close any open list first
      if (currentListType) {
        result.push(currentListType === 'bullet' ? '</ul>' : '</ol>');
        currentListType = null;
      }
      result.push(renderImage(node as PortableTextImage));
      continue;
    }

    if (node._type === 'code') {
      if (currentListType) {
        result.push(currentListType === 'bullet' ? '</ul>' : '</ol>');
        currentListType = null;
      }
      result.push(renderCode(node as PortableTextCode));
      continue;
    }

    // Text blocks
    if (node._type === 'block') {
      const block = node as PortableTextBlock;

      if (block.listItem) {
        // Start new list or switch list type
        if (currentListType !== block.listItem) {
          if (currentListType) {
            result.push(currentListType === 'bullet' ? '</ul>' : '</ol>');
          }
          currentListType = block.listItem;
          result.push(currentListType === 'bullet' ? '<ul>' : '<ol>');
        }
        result.push(`<li>${renderBlock(block)}</li>`);
      } else {
        // Close any open list
        if (currentListType) {
          result.push(currentListType === 'bullet' ? '</ul>' : '</ol>');
          currentListType = null;
        }
        result.push(renderBlock(block));
      }
    }
  }

  // Close any remaining open list
  if (currentListType) {
    result.push(currentListType === 'bullet' ? '</ul>' : '</ol>');
  }

  return result.join('\n');
}
