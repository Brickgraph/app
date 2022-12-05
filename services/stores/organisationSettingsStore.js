import create from "zustand";

export const useOrganisationSettingsStore = create((set) => ({
  organisationSettings: {},
  setOrganisationSettings: (organisationSettings) =>
    set({ organisationSettings }),
  addOrganisationSetting: (organisationSetting) =>
    set((state) => ({
      organisationSettings: [
        ...state.organisationSettings,
        organisationSetting,
      ],
    })),
  removeOrganisationSetting: (organisationSetting) =>
    set((state) => ({
      organisationSettings: state.organisationSettings.filter(
        (n) => n.id !== organisationSetting.id
      ),
    })),
  updateOrganisationSetting: (organisationSetting) =>
    set((state) => ({
      organisationSettings: state.organisationSettings.map((n) =>
        n.id === organisationSetting.id ? organisationSetting : n
      ),
    })),
}));
