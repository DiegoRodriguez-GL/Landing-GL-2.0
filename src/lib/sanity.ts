// ============================================================================
// GreenLock Cybersecurity — Sanity CMS Client + Typed GROQ Queries
// ============================================================================

import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ============================================================================
// CLIENT (lazy initialization — only created when CMS is configured)
// ============================================================================

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const isSanityConfigured = projectId && projectId !== 'your_project_id' && /^[a-z0-9-]+$/.test(projectId);

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-02-01',
      useCdn: true,
    });
  }
  return _client;
}

export const client = getClient();

// ============================================================================
// IMAGE HELPER
// ============================================================================

export function urlFor(source: SanityImageSource) {
  const c = getClient();
  if (!c) throw new Error('Sanity client not configured');
  return imageUrlBuilder(c).image(source);
}

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: SanitySlug;
  metaDescription: string;
  excerpt: string;
  featuredImage?: SanityImage;
  category: string;
  tags?: string[];
  author: SanityTeamMember;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  body: any[]; // Portable Text blocks
  relatedService?: string;
  relatedPosts?: SanityPost[];
  cta?: {
    text: string;
    href: string;
  };
}

export interface SanityCaseStudy {
  _id: string;
  _type: 'caseStudy';
  title: string;
  slug: SanitySlug;
  sector: string;
  client?: string;
  description: string;
  challenge?: any[]; // Portable Text
  solution?: any[]; // Portable Text
  results?: Array<{
    value: string;
    metric: string;
  }>;
  testimonial?: {
    quote: string;
    name?: string;
    role?: string;
    company?: string;
  };
  featured: boolean;
  order?: number;
}

export interface SanityTeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  role: string;
  photo?: SanityImage;
  bio: string;
  certifications?: string[];
  linkedin?: string;
  order: number;
}

export interface SanityFAQ {
  _id: string;
  _type: 'faq';
  question: string;
  answer: string;
  serviceSlug?: string;
  order: number;
}

export interface SanityGuide {
  _id: string;
  _type: 'guide';
  title: string;
  slug: SanitySlug;
  metaDescription?: string;
  excerpt?: string;
  featuredImage?: SanityImage;
  category?: string;
  author?: SanityTeamMember;
  publishedAt: string;
  body: any[]; // Portable Text
  relatedService?: string;
}

export interface SanitySettings {
  _id: string;
  _type: 'siteSettings';
  companyName: string;
  description?: string;
  logo?: SanityImage;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: {
    city: string;
    country: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
  };
}

// ============================================================================
// GROQ QUERIES
// All queries gracefully return null/[] when Sanity is not configured,
// enabling components to fall back to hardcoded data.
// ============================================================================

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.fetch<T>(query, params);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

// --- Posts -------------------------------------------------------------------

/** Lightweight query: only slugs, for getStaticPaths() */
export async function getAllPostSlugs(): Promise<string[]> {
  const result = await sanityFetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current }`
  );
  return result ? result.map((p) => p.slug.current) : [];
}

export async function getRecentPosts(limit = 3): Promise<SanityPost[] | null> {
  const posts = await sanityFetch<SanityPost[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id, title, slug, excerpt, category, publishedAt, readTime,
      featuredImage { ..., alt },
      author-> { _id, name, role, photo }
    }`
  );
  return posts && posts.length > 0 ? posts : null;
}

export async function getAllPosts(): Promise<SanityPost[]> {
  return (await sanityFetch<SanityPost[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, metaDescription, category, tags, publishedAt, readTime,
      featuredImage { ..., alt },
      author-> { _id, name, role, photo },
      relatedService
    }`
  )) || [];
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return await sanityFetch<SanityPost>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, metaDescription, excerpt, category, tags,
      publishedAt, updatedAt, readTime, body,
      featuredImage { ..., alt },
      author-> { _id, name, role, photo, bio, certifications, linkedin },
      relatedService,
      relatedPosts[]-> {
        _id, title, slug, excerpt, category, publishedAt, readTime,
        featuredImage { ..., alt }
      },
      cta
    }`,
    { slug }
  );
}

// --- Case Studies ------------------------------------------------------------

export async function getFeaturedCaseStudy(): Promise<SanityCaseStudy | null> {
  return await sanityFetch<SanityCaseStudy>(
    `*[_type == "caseStudy" && featured == true] | order(order asc)[0] {
      _id, title, slug, sector, client, description, results, testimonial
    }`
  );
}

export async function getAllCaseStudies(): Promise<SanityCaseStudy[]> {
  return (await sanityFetch<SanityCaseStudy[]>(
    `*[_type == "caseStudy"] | order(order asc) {
      _id, title, slug, sector, client, description, results, testimonial, featured
    }`
  )) || [];
}

export async function getCaseStudyBySlug(slug: string): Promise<SanityCaseStudy | null> {
  return await sanityFetch<SanityCaseStudy>(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, slug, sector, client, description, challenge, solution, results, testimonial
    }`,
    { slug }
  );
}

// --- Team Members ------------------------------------------------------------

export async function getTeamMembers(): Promise<SanityTeamMember[] | null> {
  const members = await sanityFetch<SanityTeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, photo { ..., alt }, bio, certifications, linkedin, order
    }`
  );
  return members && members.length > 0 ? members : null;
}

// --- FAQs --------------------------------------------------------------------

export async function getFAQsByService(serviceSlug: string): Promise<SanityFAQ[]> {
  return (await sanityFetch<SanityFAQ[]>(
    `*[_type == "faq" && serviceSlug == $serviceSlug] | order(order asc) {
      _id, question, answer, serviceSlug, order
    }`,
    { serviceSlug }
  )) || [];
}

// --- Guides ------------------------------------------------------------------

export async function getAllGuides(): Promise<SanityGuide[]> {
  return (await sanityFetch<SanityGuide[]>(
    `*[_type == "guide"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, publishedAt,
      featuredImage { ..., alt },
      author-> { _id, name, role },
      relatedService
    }`
  )) || [];
}

export async function getGuideBySlug(slug: string): Promise<SanityGuide | null> {
  return await sanityFetch<SanityGuide>(
    `*[_type == "guide" && slug.current == $slug][0] {
      _id, title, slug, metaDescription, excerpt, category, publishedAt, body,
      featuredImage { ..., alt },
      author-> { _id, name, role, photo, bio, certifications, linkedin },
      relatedService
    }`,
    { slug }
  );
}

// --- Site Settings -----------------------------------------------------------

export async function getSiteSettings(): Promise<SanitySettings | null> {
  return await sanityFetch<SanitySettings>(
    `*[_type == "siteSettings"][0] {
      _id, companyName, description, logo, email, phone, whatsapp, address, social
    }`
  );
}
