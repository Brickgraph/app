import create from "zustand";
import { persist } from "zustand/middleware";

export const useEdgeStore = create(
  persist(
    (set, get) => ({
      edges: [],
      setEdges: (edges) => set({ nodes }),
      addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
      removeNode: (edge) =>
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== edge.id),
        })),
      updateNode: (edge) =>
        set((state) => ({
          edges: state.edges.map((e) => (e.id === edge.id ? edge : e)),
        })),
    }),
    {
      name: "edge-store",
      getStorage: () => localStorage,
    }
  )
);
