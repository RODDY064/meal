import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-tab";
import { cn } from "@/utils/cn";
import { useBoundStore } from "@/store/store";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function Instructions({ setValue }: { setValue: any }) {
  const [activeInstructionId, setActiveInstructionId] = useState<string | null>(
    null
  );
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {}
  );

  const {
    instructions,
    addInstruction,
    updateInstruction,
    reorderInstructions,
    resetInstructions,
    type,
    isOpen,
    removeInstruction,
    intruText,
  } = useBoundStore();

  const sensors = useSensors(useSensor(PointerSensor));

  // handle drag
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = instructions.findIndex(
        (item: any) => item.id === active.id
      );
      const newIndex = instructions.findIndex(
        (item: any) => item.id === over.id
      );
      reorderInstructions(oldIndex, newIndex);
    }
  };

  // reset instruction when modal close 
  useEffect(() => {
    if (type === "create" && !isOpen) {
      resetInstructions();
    }
  }, [isOpen, type]);

  useEffect(() => {
    // Focus the textarea when an instruction is activated
    if (activeInstructionId) {
      const textarea = textareaRefs.current[activeInstructionId];
      if (textarea) {
        textarea.focus();
      }
    }
  }, [activeInstructionId]);

  // Memoized add instruction handler to prevent unnecessary re-renders
  const handleAddInstruction = useCallback((e:any) => {
    addInstruction(e);
  }, [addInstruction]);

  setValue("instructions", intruText({ instructions }));

  return (
    <div className="flex flex-col mt-10 relative">
      <div className="flex items-center justify-between">
        <label className="text-sm font-sans font-medium text-black/40 mx-2">
          Instructions
        </label>
        <div className="flex items-center justify-center gap-2">
          <div
            onClick={handleAddInstruction}
            className="px-4 py-[6px] text-sm bg-black rounded-lg cursor-pointer text-white flex items-center gap-1"
          >
            <Image src="/icons/plus.svg" width={12} height={12} alt="plus" />
            <p>Add </p>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={instructions.map((i: any) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {instructions.map((instruction: any) => (
            <SortableItem key={instruction.id} id={instruction.id}>
              <div className="relative flex items-start mt-4 gap-1">
                <div className="absolute left-[-1rem] cursor-grab mt-4">
                  <Image
                    src="/icons/drag.svg"
                    width={16}
                    height={16}
                    alt="drag"
                  />
                </div>

                <MyTextarea 
                  ref={(el) => {
                    textareaRefs.current[instruction.id] = el;
                  }}
                  instruction={instruction}
                  setActiveInstructionId={setActiveInstructionId}
                  updateInstruction={updateInstruction}
                  activeInstructionId={activeInstructionId}
                />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}



interface Instruction {
  id: string;
  text: string;
}

interface Props {
  instruction: Instruction;
  setActiveInstructionId: (id: string | null) => void;
  updateInstruction: (id: string, text: string) => void;
  activeInstructionId: string | null;
}

const MyTextarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ instruction, setActiveInstructionId, updateInstruction, activeInstructionId }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    
    // Combine external and internal refs
    React.useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      // Auto-adjust textarea height
      if (internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [instruction.text]);

    const handleFocus = () => {
      setActiveInstructionId(instruction.id);
    };

    const handleBlur = () => {
      setActiveInstructionId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Adjust height
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
      
      // Update instruction
      updateInstruction(instruction.id, e.target.value);
    };

    return (
      <textarea
        ref={internalRef}
        value={instruction.text}
        name="instruction"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`w-full h-auto rounded-lg focus:outline-none border p-2 resize-none ${
          activeInstructionId === instruction.id
            ? "border-primary-orange focus:border-primary-orange"
            : instruction.text?.length > 0
            ? "border-white hover:border-primary-orange"
            : "border-primary-orange/70"
        } hover:border-primary-orange focus:border-primary-orange`}
      />
    );
  }
);


