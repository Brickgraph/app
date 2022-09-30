import {
  BellIcon,
  PresentationChartBarIcon,
  HomeIcon,
  ViewGridAddIcon,
  MenuAlt2Icon,
  UserGroupIcon,
  XIcon,
  DatabaseIcon,
  LightningBoltIcon,
  CogIcon,
  BeakerIcon,
} from "@heroicons/react/outline";
import SidebarLogo from "./sidebarLogo";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Integrations",
    href: "/integrations",
    icon: DatabaseIcon,
  },
  {
    name: "Connections",
    href: "/connections",
    icon: LightningBoltIcon,
  },
  { name: "Groups", href: "/groups", icon: UserGroupIcon },
  { name: "API Docs", href: "#", icon: BeakerIcon },
  /* {
    name: "Marketplace - coming soon",
    href: "#",
    icon: ViewGridAddIcon,
  },
  {
    name: "Reports - coming soon",
    href: "#",
    icon: PresentationChartBarIcon,
  }, */
  { name: "Settings", href: "/settings", icon: CogIcon },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Account", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar(props) {
  return (
    <>
      <div className="flex items-center">
        <SidebarLogo />
      </div>

      <div className="mt-5 flex-1 h-0 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.href === props.path
                  ? "bg-orange-400 text-white"
                  : "text-gray-300 hover:bg-white hover:text-orange-400",
                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
              )}
            >
              <item.icon
                className={classNames(
                  item.href === props.path
                    ? "text-white"
                    : "text-gray-300 group-hover:text-orange-400",
                  "mr-4 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
