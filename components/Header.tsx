import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>ローディング中...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <header>
        <nav className="border-b w-full bg-white px-6 py-4">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/">
              <div className="text-xl font-semibold whitespace-nowrap cursor-pointer">
                みみみみみブログ
              </div>
            </Link>
            <div>
              <span className="hidden sm:inline-flex mr-2">
                ようこそ
                <span className="mx-2 flex">
                  <Image
                    src={user.picture || ""}
                    width="24"
                    height="24"
                    className="rounded-full"
                  />
                  <span className="pl-1"> {user.name}</span>
                </span>
                さん
              </span>

              <Link href="/api/auth/logout">
                <span className="border text-primary-500 hover:text-primary-700 hover:bg-primary-50 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
                  サインアウト
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav className="bg-white px-4 lg:px-6 py-3 sticky top-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <div className="text-xl font-semibold whitespace-nowrap cursor-pointer">
              みみみみみブログ
            </div>
          </Link>
          <Link href="/api/auth/login">
            <span className="text-white bg-primary-500 hover:bg-primary-700 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
              サインイン
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
