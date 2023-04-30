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

interface Outline {
  text: string;
  id: string;
}

const createOutlines = (html: string) => {
  const $ = load(html);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
  }));

  return toc;
};

const Article: FC<Props> = ({ data }) => {
  const { thumbnail, title, description, body, publishedAt, updatedAt } = data;
  const highlightedBody = highlightCode(body || "");
  const outlines = createOutlines(highlightedBody);

  return (
    <main className="max-w-screen-lg flex flex-row m-auto py-4">
      <div className="w-full lg:w-2/3 px-2">
        {thumbnail !== null && thumbnail !== undefined && (
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
        <div className="h-8" />

        {outlines.length != 0 && (
          <div className="border border-gray-400 bg-gray-100 p-4 mb-8">
            <div className="flex items-center">
              <h2 className="text-lg font-bold mr-2">目次</h2>
            </div>
            <ol className="list-decimal pl-5">
              {outlines.map(({ id, text }) => (
                <li key={id} className="">
                  <a
                    href={`#${id}`}
                    className="text-primary-600 hover:underline"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div
          className="prose prose-sm sm:prose lg:prose-lg break-words"
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
