export type Category = 
  | 'Lifestyle'
  | 'Student Life'
  | 'Personal Growth'
  | 'Technology'
  | 'Culture'
  | 'Career';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonicalSlug: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSection {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  pullquote?: string;
  keyTakeaway?: string;
  isQuestionFormat?: boolean;
  inlineImage?: {
    url: string;
    caption: string;
    credit: string;
    alt: string;
    name?: string;
    description?: string;
    fileSizeKB?: number;
  };
}

export interface Article {
  id: string;
  slug: string;
  number: string;
  title: string;
  deck: string;
  category: Category;
  author: Author;
  publishDate: string;
  isoDate: string;
  readingTime: string;
  heroImage: string;
  imageName: string;
  imageDescription: string;
  imageSizeKB: number;
  imageCredit: string;
  imageAlt: string;
  seo: SEOData;
  introduction: string[];
  sections: ArticleSection[];
  faqItems: FAQItem[];
  conclusion?: string;
  keyTakeaways: string[];
  relatedSlugs: string[];
  featured?: boolean;
  trendingRank?: number;
  tags: string[];
}
