import { getServerSidePropsWrapper, getSession } from "@auth0/nextjs-auth0";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Alert from "../../components/Alert";
import Article from "../../components/Article";
import { client } from "../../libs/client";
import { ArticleListDetail, Article as ArticleType } from "../../types";

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(
  async (context) => {
    const { req, res } = context;
    const id = context?.params?.id as string;
    const session = await getSession(req, res);

    const data = await client.getListDetail<ArticleType>({
      endpoint: "articles",
      contentId: id,
    });

    if (!session || !session.user) {
      return {
        props: {
          data: {
            title: data.title,
            description: data.description || "",
            thumbnail: data.thumbnail,
          },
          type: "nouser",
          organization: data.organization,
        },
      };
    }

    const roles = session.user["https://mimimivlog.module/roles"];
    const isUniversity =
      (roles && data.organization?.some((r) => roles.includes(r))) ?? false;

    if (!isUniversity) {
      return {
        props: {
          data: {
            title: data.title,
            description: data.description || "",
            thumbnail: data.thumbnail,
          },
          type: "notverified",
          organization: data.organization,
        },
      };
    }

    return {
      props: {
        data,
      },
    };
  }
);

type Props = {
  data?: ArticleListDetail;
  type: string;
  organization: Array<String>;
};

const PrivateId: NextPage<Props> = ({ data, type, organization }) => {
  if (!data) {
    return null;
  }

  const allusers = data.organization?.includes("allusers");
  const org =
    organization != undefined ? organization.join(", ").toString() : "";

  if (type == "nouser" && !allusers) {
    return (
      <main className="max-w-screen-lg m-auto py-4">
        <Head>
          <title>組織専用記事 - みみみみみブログ</title>
        </Head>
        <Article data={data} />
        <Alert
          title="特定の組織専用記事です"
          msg={`この記事は ${org} に属している人のみが閲覧できるため，先に認証をする必要があります。`}
        />
      </main>
    );
  }

  if (type == "nouser") {
    return (
      <main className="max-w-screen-lg m-auto py-4">
        <Head>
          <title>会員専用記事 - みみみみみブログ</title>
        </Head>
        <Article data={data} />
        <Alert
          title="会員専用記事です"
          msg="この記事は会員専用記事です。詳しくは，管理人にお問い合わせください。"
        />
      </main>
    );
  }

  if (type == "notverified") {
    return (
      <main className="max-w-screen-lg m-auto py-4">
        <Head>
          <title>組織専用記事 - みみみみみブログ</title>
        </Head>
        <Article data={data} />
        <Alert
          title="あなたは特定の組織ではありません"
          msg={`この記事は ${org} に属している人のみが閲覧できます。`}
        />
      </main>
    );
  }

  return (
    <main className="max-w-screen-lg m-auto py-4">
      <Head>
        <title>{data.title} - みみみみみブログ</title>
      </Head>
      <Article data={data} />
    </main>
  );
};

export default PrivateId;
