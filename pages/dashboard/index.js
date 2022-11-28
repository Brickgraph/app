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
import { EmptyCard } from "../../components/ui/cards/emptyCard";

const cards = [
  {
    title: "Properties & Units",
    icon: OfficeBuildingIcon,
    param: "Property,PropertyUnit",
    createNewDisabled: false,
  },
  {
    title: "Deals",
    icon: BriefcaseIcon,
    param: "Deal",
    createNewDisabled: false,
  },
  {
    title: "Users & Groups",
    icon: UsersIcon,
    param: "Organisation,UserGroup,User",
    createNewDisabled: false,
  },
  {
    title: "Funds",
    icon: CollectionIcon,
    param: "Fund",
    createNewDisabled: false,
  },
  {
    title: "Leases",
    icon: ClipboardListIcon,
    param: "Lease",
    createNewDisabled: false,
  },
  {
    title: "Tenants",
    icon: KeyIcon,
    param: "Tenant",
    createNewDisabled: false,
  },
  {
    title: "Sectors",
    icon: BriefcaseIcon,
    param: "Sector",
    createNewDisabled: true,
  },
  {
    title: "Geographies",
    icon: GlobeIcon,
    param: "Geography",
    createNewDisabled: true,
  },
  {
    title: "Investors",
    icon: CashIcon,
    param: "Investor",
    createNewDisabled: false,
  },
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
      <PageTitleHeader title={"Dashboard"} />
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((item) => (
            <div key={item.title}>
              <ActionCard
                item={item}
                viewAction={() => handleView(item.param)}
                createAction={() => handleCreate()}
                createDisabled={item.createNewDisabled}
              />
            </div>
          ))}
          <EmptyCard />
        </div>
      </div>
    </>
  );
}
