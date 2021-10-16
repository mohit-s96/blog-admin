import { ObjectId } from "bson";
import { NewImageData, SlugType } from "./globalTypes";

export type BlogPathNames = {
  _id: ObjectId;
  pathNames: Array<string>;
};
export interface ImageData {
  alt: string;
  uri: string;
  isHero?: boolean;
}
export interface BlogImages {
  hero: ImageData;
  subImage1: ImageData;
  subImage2: ImageData;
}

export interface BlogMetadata {
  links: string[];
  atMentions: string[];
  hashTags: string[];
}

export interface BlogSlug {
  _id?: ObjectId;
  rawBody?: string;
  title: string;
  uri: string;
  tags: string[];
  createdAt: number;
  images: NewImageData[];
  blogData: string;
  shares: number;
  likes: number;
  excerpt: string;
  author: string;
  commentsAllowed: boolean;
  commentCount: number;
  metadata?: BlogMetadata;
  viewCount: number;
  slugType: SlugType;
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

export type BlogListType = Omit<BlogSlug, "metadata" | "blogData">;
