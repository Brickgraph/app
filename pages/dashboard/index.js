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
    viewParam: "Property,PropertyUnit",
    createParam: "Property",
    createNewDisabled: false,
  },
  {
    title: "Deals",
    icon: BriefcaseIcon,
    viewParam: "Deal",
    createParam: "Deal",
    createNewDisabled: false,
  },
  {
    title: "Users & Groups",
    icon: UsersIcon,
    viewParam: "Organisation,UserGroup,User",
    createParam: "User",
    createNewDisabled: false,
  },
  {
    title: "Funds",
    icon: CollectionIcon,
    viewParam: "Fund",
    createParam: "Fund",
    createNewDisabled: false,
  },
  {
    title: "Leases",
    icon: ClipboardListIcon,
    viewParam: "Lease",
    createParam: "Lease",
    createNewDisabled: false,
  },
  {
    title: "Tenants",
    icon: KeyIcon,
    viewParam: "Tenant",
    createParam: "Tenant",
    createNewDisabled: false,
  },
  {
    title: "Sectors",
    icon: BriefcaseIcon,
    viewParam: "Sector",
    createNewDisabled: true,
  },
  {
    title: "Geographies",
    icon: GlobeIcon,
    viewParam: "Geography",
    createNewDisabled: true,
  },
  {
    title: "Investors",
    icon: CashIcon,
    viewParam: "Investor",
    createParam: "Investor",
    createNewDisabled: false,
  },
];

export default function SettingsPage() {
  const [query, setQuery] = useState("");
  const handleCreate = (createParam) => {
    Router.push("/create/?label=" + createParam);
  };

  const handleView = (viewParam) => {
    Router.push("/nodes/?label=" + viewParam);
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
                viewAction={() => handleView(item.viewParam)}
                createAction={() => handleCreate(item.createParam)}
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
