import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";
import Image from "next/image";

import { FC } from "react";
import { formatDate } from "../libs/util";
import type { ArticleListDetail } from "../types";

type Props = {
  data: ArticleListDetail;
};

const highlightCode = (html: string) => {
  const $ = load(html);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return $.html();
};

const Article: FC<Props> = ({ data }) => {
  const { thumbnail, title, description, body, publishedAt, updatedAt } = data;
  const highlightedBody = highlightCode(body || "");

  return (
    <main className="max-w-screen-lg flex flex-row m-auto py-4">
      <div className="w-full lg:w-2/3 px-2">
        {thumbnail !== undefined && (
          <div className="mb-2">
            <Image
              src={thumbnail.url}
              width={thumbnail.width}
              height={thumbnail.height}
              alt=""
              className="rounded-lg"
            />
          </div>
        )}
        <h1 className="font-bold text-3xl pb-2">{title}</h1>
        <p>{description}</p>
        <div className="h-2" />
        <div className="md:hidden text-sm text-gray-500">
          公開日: {formatDate(publishedAt)}
        </div>
        <div className="md:hidden pb-2 text-sm text-gray-500">
          最終更新: {formatDate(updatedAt)}
        </div>
        <div className="h-4" />
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: highlightedBody,
          }}
        />
      </div>
      <div className="hidden lg:block w-1/3 px-2 divide-y bg-gray-50 rounded-lg h-min">
        <div className="p-2"> 公開日: {formatDate(publishedAt)}</div>
        <div className="p-2">最終更新: {formatDate(updatedAt)}</div>
        <div className="p-2">タグ</div>
      </div>
    </main>
  );
};

export default Article;
