import create from "zustand";
import { persist } from "zustand/middleware";

const initialState = [];

export const useNodeStore = create(
  persist(
    (set, get) => ({
      nodes: initialState,
      setNodes: (data) => set({ nodes: data }),
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      removeNode: (node) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== node.id),
        })),
      updateNode: (node) =>
        set((state) => ({
          nodes: state.nodes.map((n) => (n.id === node.id ? node : n)),
        })),
    }),
    {
      name: "node-store",
      getStorage: () => localStorage,
    }
  )
);
