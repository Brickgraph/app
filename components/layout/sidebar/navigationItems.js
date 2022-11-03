import {
  HomeIcon,
  UserGroupIcon,
  DatabaseIcon,
  LightningBoltIcon,
  CogIcon,
  BeakerIcon,
} from "@heroicons/react/outline";

export const navigationItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Connections",
    href: "/connections",
    icon: LightningBoltIcon,
  },
  { name: "Groups", href: "/groups", icon: UserGroupIcon },
  { name: "API Docs", href: "http://127.0.0.1:8000/redoc", icon: BeakerIcon },
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
