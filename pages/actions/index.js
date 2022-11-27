import { ActionCard } from "../../components/ui/cards/actionCard";
import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  UsersIcon,
  CurrencyPoundIcon,
  ClipboardListIcon,
  GlobeIcon,
  KeyIcon,
  CashIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import Router from "next/router";
import { useState } from "react";
import { PageTitleHeader } from "../../components/pageLayouts/titleHeader";

const cards = [
  {
    title: "Properties & Units",
    icon: OfficeBuildingIcon,
    param: "Property,PropertyUnit",
  },
  { title: "Deals", icon: BriefcaseIcon, param: "Deal" },
  {
    title: "Users & Groups",
    icon: UsersIcon,
    param: "Organisation,UserGroup,User",
  },
  { title: "Funds", icon: CollectionIcon, param: "Fund" },
  { title: "Leases", icon: ClipboardListIcon, param: "Lease" },
  { title: "Tenants", icon: KeyIcon, param: "Tenant" },
  { title: "Sectors", icon: BriefcaseIcon, param: "Sector" },
  { title: "Geographies", icon: GlobeIcon, param: "Geography" },
  { title: "Investors", icon: CashIcon, param: "Investor" },
];

export default function SettingsPage() {
  const [query, setQuery] = useState("");
  const handleCreate = () => {
    console.log("Create");
  };

  const handleView = (param) => {
    Router.push("/nodes/?label=" + param);
  };

  const filteredItems =
    query === ""
      ? []
      : data.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <PageTitleHeader title={"Actions"} />
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((item) => (
            <ActionCard
              item={item}
              viewAction={() => handleView(item.param)}
              createAction={() => handleCreate()}
            />
          ))}
        </div>
      </div>
    </>
  );
}
