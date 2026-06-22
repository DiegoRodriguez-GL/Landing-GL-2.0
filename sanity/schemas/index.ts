import post from './post';
import caseStudy from './caseStudy';
import teamMember from './teamMember';
import faq from './faq';
import guide from './guide';
import siteSettings from './siteSettings';

export const schemaTypes = [
  // Content
  post,
  guide,
  caseStudy,

  // People
  teamMember,

  // Structured data
  faq,

  // Singleton
  siteSettings,
];
