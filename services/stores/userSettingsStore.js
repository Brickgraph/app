import create from "zustand";

export const useUserSettingsStore = create((set) => ({
  userSettings: {},
  setUserSettings: (userSettings) => set({ userSettings }),
  addUserSetting: (userSetting) =>
    set((state) => ({ userSettings: [...state.userSettings, userSetting] })),
  removeUserSetting: (userSetting) =>
    set((state) => ({
      userSettings: state.userSettings.filter((n) => n.id !== userSetting.id),
    })),
  updateUserSetting: (userSetting) =>
    set((state) => ({
      userSettings: state.userSettings.map((n) =>
        n.id === userSetting.id ? userSetting : n
      ),
    })),
}));
