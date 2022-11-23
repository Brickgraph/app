import { ActionCard } from "../../components/ui/cards/actionCard";
import {
  PlusCircleIcon,
  BriefcaseIcon,
  OfficeBuildingIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const actions = [
  { title: "Properties", icon: OfficeBuildingIcon, href: "/properties" },
  { title: "Deals", icon: UsersIcon, href: "/groups" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
  { title: "Deals", icon: BriefcaseIcon, href: "/deals" },
];

export default function SettingsPage() {
  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((item) => (
            <ActionCard item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
