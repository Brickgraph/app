import Image from "next/image";

export default function NotFoundPage() {
  return (
    <>
      <main className="min-h-full bg-cover bg-top sm:bg-top bg-gradient-to-br from-white to-orange-500 rounded-lg">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <p className="text-base font-semibold text-black text-3xl">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-4xl">
            Uh oh! I think you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like the page you’re looking for doesn't exist.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black text-opacity-75 hover:bg-gray-100"
            >
              Go back home
            </a>
            {/* <Image src="/images/logos/bg-logo-only.png" layout="fill" /> */}
          </div>
        </div>
      </main>
    </>
  );
}
