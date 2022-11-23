import Link from "next/link";
import Image from "next/image";

export function SidebarLogo() {
  return (
    <div className="flex h-16 items-center flex-shrink-0 px-2">
      <div>
        <Link href="/">
          <a>
            <Image
              src="/images/logos/bg-logo-only.png"
              alt="Brickgraph logo"
              width={100}
              height={60}
              href="/"
            />
          </a>
        </Link>
      </div>
      <div className="text-2xl font-mono text-white">
        <Link href="/">Brickgraph</Link>
      </div>
    </div>
  );
}

export function SidebarLogoNoText() {
  return (
    <div className="flex h-16 items-center flex-shrink-0">
      <div>
        <Link href="/">
          <a>
            <Image
              src="/images/logos/bg-logo-only.png"
              alt="Brickgraph logo"
              width={90}
              height={50}
              href="/"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
