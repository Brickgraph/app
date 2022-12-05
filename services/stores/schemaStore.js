import create from "zustand";

export const useSchemaStore = create((set) => ({
  schemas: [],
  setSchemas: (schemas) => set({ schemas }),
  addSchema: (schema) =>
    set((state) => ({ schemas: [...state.schemas, schema] })),
  removeSchema: (schema) =>
    set((state) => ({
      schemas: state.schemas.filter((n) => n.id !== schema.id),
    })),
  updateSchema: (schema) =>
    set((state) => ({
      schemas: state.schemas.map((n) => (n.id === schema.id ? schema : n)),
    })),
}));
