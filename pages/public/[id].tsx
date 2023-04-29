import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Article from "../../components/Article";
import { client } from "../../libs/client";
import type { ArticleListDetail, Article as ArticleType } from "../../types";

export const getStaticPaths = async () => {
  const data = await client.getList<ArticleType>({
    endpoint: "articles",
    queries: {
      filters: "private[equals]false",
    },
  });

  const paths = data.contents.map((content) => `/public/${content.id}`);
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;
  const data = await client.getListDetail<ArticleType>({
    endpoint: "articles",
    contentId: id,
  });

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

type Props = {
  data: ArticleListDetail;
};

const PublicId: NextPage<Props> = ({ data }) => {
  return (
    <main className="max-w-screen-lg m-auto py-4">
      <Head>
        <title>{data.title} - みみみみみブログ</title>
      </Head>
      <Article data={data} />
    </main>
  );
};

export default PublicId;
