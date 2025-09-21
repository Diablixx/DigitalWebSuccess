export interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  featured_image: string;
  tags: string[];
}

export interface WordPressPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  template: string;
}