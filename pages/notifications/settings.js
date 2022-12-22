import { useUserSettingsStore } from "../../services/stores/userSettingsStore";
import { PageTitleHeader } from "../../components/pageLayouts/titleHeader";

export default function SettingsPage() {
  const {
    userSettings,
    setUserSettings,
    removeUserSetting,
    updateUserSetting,
  } = useUserSettingsStore();

  console.log(userSettings);
  return (
    <>
      <PageTitleHeader title="Notification Settings" />
    </>
  );
}
