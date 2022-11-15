import {
  HomeIcon,
  UserGroupIcon,
  LightningBoltIcon,
  CogIcon,
  BeakerIcon,
  ViewGridAddIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/outline";

export const navigationItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Integrations",
    href: "/integrations",
    icon: LightningBoltIcon,
    disabled: false,
  },
  { name: "Access and Groups", href: "/groups", icon: UserGroupIcon },

  /* {
    name: "Marketplace - coming soon",
    href: "#",
    icon: ViewGridAddIcon,
    disabled: true,
  }, */
  {
    name: "Reports - coming soon",
    href: "#",
    icon: PresentationChartBarIcon,
    disabled: true,
  },
  {
    name: "API Docs",
    href: "http://127.0.0.1:8000/redoc",
    icon: BeakerIcon,
    disabled: false,
  },
  { name: "Settings", href: "/settings", icon: CogIcon, disabled: false },
];
