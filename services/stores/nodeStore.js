import create from "zustand";
import { persist } from "zustand/middleware";

const initialState = [];

export const useNodeStore = create(
  (set, get) => ({
    nodes: initialState,
    setNodesInStore: (data) => set({ nodes: data }),
    addNodeToStore: (node) =>
      set((state) => ({ nodes: [...state.nodes, node] })),
    removeNodeInStore: (node) =>
      set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== node.id),
      })),
    updateNodeInStore: (node) =>
      set((state) => ({
        nodes: state.nodes.map((n) => (n.id === node.id ? node : n)),
      })),
  }),
  {
    name: "node-store",
    // For persist method
    // getStorage: () => sessionStorage,
  }
);
