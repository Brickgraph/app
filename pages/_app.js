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
import { axios } from "../services/axios";

const publicPages = [];

function SetAxiosAuthHeader() {
  const { session } = useSession();

  const setAuthFromSession = async () => {
    const token = await session.getToken();

    console.log("Session", session.user);
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
            <Component {...pageProps} />
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
