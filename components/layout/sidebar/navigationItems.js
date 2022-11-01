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
