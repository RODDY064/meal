import {  StateCreator } from "zustand";
import { Store } from "./store";

interface InstructionState {
  id: string;
  text: string;
}

interface InstructionFunction {
  instructions: InstructionState[];
  addInstruction: (event:any,text?:string) => void;
  updateInstruction: (id: string, text: string) => void;
  reorderInstructions: (fromIndex: number, toIndex: number) => void;
  intruText: (state: { instructions: { text: any; }[]; }) => void;
  resetInstructions: () => void;
  removeInstruction: (id: string) => void;
}

export type InstructionStore = InstructionFunction ;

export const useInstructionStore: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  InstructionStore> = (set) => ({
    instructions: [] ,
    addInstruction: (event: any, text?: string) => {
      const instructionText = text || (event?.target?.value as string) || '';
      set((state) => ({
        instructions: [
          ...state.instructions,
          { id: `${Date.now()}`, text: instructionText },
        ],
      }));
    },
    updateInstruction: (id, text) =>
      set((state) => ({
        instructions: state.instructions.map((instruction) =>
          instruction.id === id ? { ...instruction, text } : instruction
        ),
      })),
    reorderInstructions: (fromIndex, toIndex) =>
      set((state) => {
        const updated = [...state.instructions];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        return { instructions: updated };
      }),
      intruText: (state: { instructions: { text: any; }[]; }) => {
         const intruText = state.instructions.map((instruction: { text: any; }) => instruction.text);
        return intruText;
      },
        resetInstructions() {
            set({ instructions: [] });
        },
        removeInstruction(id) {
            set((state) => ({
                instructions: state.instructions.filter((instruction) => instruction.id !== id),
            }));
        },
});

