import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useSession,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { setAuthorizationHeader } from "../services/auth";
import { useEffect } from "react";
import Head from "next/head";
import { appDetails } from "../config";
import Layout from "../components/layout/layout";

const publicPages = [];

function SetAxiosAuthHeader() {
  const { session } = useSession();

  const setAuthFromSession = async () => {
    const token = await session.getToken();

    setAuthorizationHeader(token);
  };

  useEffect(() => {
    if (session) {
      setAuthFromSession();
    }
  }, [session]);

  return <></>;
}

function MyApp({ Component, pageProps }) {
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <SetAxiosAuthHeader />
            <Layout>
              <Head>
                <title>{appDetails.appName}</title>
                <meta name="description" content={appDetails.metaDescription} />
                <meta
                  name="viewport"
                  content="initial-scale=1 width=device-width"
                />
                <link rel="icon" href={appDetails.favicon} />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
