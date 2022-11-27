import { MainPageTabs } from "./tabs";
import { MainPageHeader } from "./header";

export const MainPageLayout = ({
  children,
  title,
  selectedTab,
  onSelect,
  newButtonAction = null,
  filterButtonAction,
}) => {
  return (
    <>
      <MainPageHeader
        title={title}
        newButtonAction={newButtonAction}
        filterButtonAction={filterButtonAction}
      />
      <MainPageTabs selectedTab={selectedTab} onSelect={onSelect} />
      <div className="pt-2">{children}</div>
    </>
  );
};
