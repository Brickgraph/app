import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { appDetails } from "../config";
import Layout from "../components/layout";

const publicPages = ["login", "signup", "forgot-password", "verify-email"];

export default function MyApp({ Component, pageProps }) {
  // Get the pathname
  const { pathname } = useRouter();
  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <>
      <ClerkProvider>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Layout>
                <Head>
                  <title>{appDetails.appName}</title>
                  <meta
                    name="description"
                    content={appDetails.metaDescription}
                  />
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
      {/* Loads the Google Places Autocomplete library */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`}
      />
    </>
  );
}
