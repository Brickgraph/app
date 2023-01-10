import create from "zustand";
import { persist } from "zustand/middleware";

export const useEdgeStore = create(
  (set, get) => ({
    edges: [],
    setEdgesInStore: (edges) => set({ edges }),
    addEdgeInStore: (edge) =>
      set((state) => ({ edges: [...state.edges, edge] })),
    removeEdgeInStore: (edge) =>
      set((state) => ({
        edges: state.edges.filter((e) => e.id !== edge.id),
      })),
    updateEdgeInStore: (edge) =>
      set((state) => ({
        edges: state.edges.map((e) => (e.id === edge.id ? edge : e)),
      })),
  }),
  {
    name: "edge-store",
    getStorage: () => sessionStorage,
  }
);
