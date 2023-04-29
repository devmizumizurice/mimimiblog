import {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
} from "microcms-js-sdk";

export type Article = {
  title?: string;
  description?: string;
  body?: string;
  thumbnail?: MicroCMSImage;
  private: boolean;
  organization?: Array<string>;
};

export type ArticleList = MicroCMSListResponse<Article>;
export type ArticleListDetail = Article & MicroCMSListContent;
