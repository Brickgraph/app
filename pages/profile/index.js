import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../../utils/users";
import { useRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage({ user }) {
  const ref = useRef(null);

  return (
    <>
      <main className="flex-1">
        <div className="relative mx-auto max-w-4xl md:px-4 xl:px-0">
          <div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Profile
                    </h3>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">
                            {user.first_name} {user.last_name}
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Photo
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                user.profile_image_url.includes(
                                  "https://www.gravatar.com/avatar"
                                )
                                  ? "/images/profiles/giraffe-close-up.png"
                                  : `${user.profile_image_url}`
                              }
                              alt=""
                            />
                          </span>
                          <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                            <span className="text-gray-300" aria-hidden="true">
                              |
                            </span>
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                              Remove
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">
                            {user.email_addresses[0].email_address}
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">
                          API Key
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <p
                            className="flex-grow"
                            id="api-key"
                            ref={ref}
                            disabled
                          >
                            {user.email_addresses[0].email_address}
                          </p>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  ref.current.innerText
                                );
                                alert(`API Key copied to your clipboard.`);
                              }}
                              type="button"
                              className="rounded-md bg-white font-medium text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                              Copy to Clipboard
                            </button>
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { userId, sessionId } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    const user = await getUserById(userId);

    return { props: { user } };
  }
);
