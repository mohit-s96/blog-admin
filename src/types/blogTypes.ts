import { ObjectId } from "bson";

export type BlogPathNames = {
  _id: ObjectId;
  pathNames: Array<string>;
};

export interface BlogImages {
  hero: string;
  subImage1: string;
  subImage2: string;
}

export interface BlogMetadata {
  links: string[];
  atMentions: string[];
  hashTags: string[];
}

export interface BlogSlug {
  _id: ObjectId;
  title: string;
  url: string;
  tags: string[];
  createdAt: number;
  images: BlogImages;
  blogData: string;
  shares: number;
  likes: number;
  excerpt: string;
  author: string;
  commentsAllowed: string;
  commentCount: number;
  metadata: BlogMetadata;
  viewCount: number;
}

export interface CommentMetadata {
  links: string[];
  markdown: string;
  atMentions: string[];
}

export interface CommentSlug {
  _id: ObjectId;
  blogId: string;
  createdAt: number;
  author: string;
  inReplyToUser: string;
  isAdmin: boolean;
  hasMarkdown: boolean;
  isVisible: boolean;
  isDeleted: boolean;
  metadata: CommentMetadata;
  inReplyToComment: ObjectId | "";
  body: string;
}

export type BlogListType = Omit<BlogPathNames, "metadata" | "blogData">;
