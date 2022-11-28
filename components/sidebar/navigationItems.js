import {
  HomeIcon,
  UserGroupIcon,
  LightningBoltIcon,
  CogIcon,
  BeakerIcon,
  ViewGridAddIcon,
  PresentationChartBarIcon,
  DocumentSearchIcon,
} from "@heroicons/react/outline";

export const navigationItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ViewGridAddIcon,
    disabled: false,
  },
  {
    name: "Access and Groups",
    href: "/groups",
    icon: UserGroupIcon,
    disable: false,
  },
  {
    name: "Integrations - coming soon",
    href: "/integrations",
    icon: LightningBoltIcon,
    disabled: false,
  },

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
    icon: DocumentSearchIcon,
    disabled: false,
  },
  { name: "Settings", href: "/settings", icon: CogIcon, disabled: false },
];
