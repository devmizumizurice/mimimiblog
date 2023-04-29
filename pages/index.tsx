import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { client } from "../libs/client";
import type { Article, ArticleList } from "../types";

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      fields: [
        "id",
        "private",
        "title",
        "description",
        "thumbnail",
        "organization",
      ],
    },
  });

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

type Props = {
  data: ArticleList;
};

const Index: NextPage<Props> = ({ data }) => {
  const { contents } = data;
  return (
    <div className="p-8">
      <Head>
        <title>みみみみみブログ</title>
      </Head>
      <ul className="flex flex-wrap">
        {contents.map((content) => (
          <li
            key={content.id}
            className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <Link
              href={`/${content.private ? "private" : "public"}/${content.id}`}
            >
              <div className="w-full rounded-lg overflow-hidden shadow-lg cursor-pointer easein duration-300 hover:scale-105 hover:bg-gray-50">
                <div className="bg-gray-50 relative max-w-full h-48">
                  {content.thumbnail !== undefined ? (
                    <Image
                      src={content.thumbnail.url}
                      alt={content.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src="/noimg.png"
                      alt={content.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>

                <div className="px-4 py-4">
                  {content.private ? (
                    <p className="text-sm flex items-center mb-1 text-gray-500">
                      <svg
                        className="fill-current  w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      {content.organization?.includes("allusers")
                        ? "会員専用"
                        : `${content.organization?.join(", ")} に属している人`}
                    </p>
                  ) : (
                    <div></div>
                  )}

                  <div className="font-bold text-xl mb-2">{content.title}</div>

                  <p className="text-gray-700 text-base">
                    {content.description}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
