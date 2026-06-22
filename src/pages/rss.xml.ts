import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedPosts } from '@data/blog-posts';

export async function GET(context: APIContext) {
  const posts = getSortedPosts();

  return rss({
    title: 'GreenLock Cybersecurity | Blog',
    description:
      'Artículos sobre pentesting, seguridad ofensiva, compliance y ciberseguridad empresarial. Por los expertos certificados de GreenLock.',
    site: context.site ?? 'https://greenlock.tech',
    items: posts.map((p) => ({
      title: p.title,
      link: `/recursos/blog/${p.slug}`,
      pubDate: new Date(p.publishedAt),
      description: p.excerpt,
      categories: p.category ? [p.category] : [],
    })),
    customData: [
      `<language>es-ES</language>`,
      `<copyright>© 2026 GreenLock Cybersecurity</copyright>`,
      `<managingEditor>info@greenlock.tech (GreenLock Cybersecurity)</managingEditor>`,
      `<webMaster>info@greenlock.tech (GreenLock Cybersecurity)</webMaster>`,
    ].join(''),
  });
}
