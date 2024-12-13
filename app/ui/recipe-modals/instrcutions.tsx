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
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Instructions({ setValue }: { setValue: any }) {
  const [activeInstructionId, setActiveInstructionId] = useState<string | null>(
    null
  );
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {}
  );
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>(
    []
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

  const handleRemoveSelectedInstructions = () => {
    selectedInstructions.forEach((id) => removeInstruction(id));
    setSelectedInstructions([]);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedInstructions((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  setValue("instructions", intruText({ instructions }));

  return (
    <div className="flex flex-col mt-10 relative">
      <div className="flex items-center justify-between">
        <label className="text-sm font-sans font-medium text-black/40 mx-2">
          Instructions
        </label>
        <div className="flex items-center justify-center gap-2">
          <div
            onClick={addInstruction}
            className="px-4 py-[6px] text-sm bg-black rounded-lg cursor-pointer text-white flex items-center gap-1"
          >
            <Image src="/icons/plus.svg" width={12} height={12} alt="plus" />
            <p>Add </p>
          </div>
          {instructions.length > 0 && false && (
            <div
              onClick={handleRemoveSelectedInstructions}
              className="cursor-pointer"
            >
              <Image
                src="/icons/delete.svg"
                width={20}
                height={20}
                alt="delete"
              />
            </div>
          )}
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

                {/* Instruction Textarea */}
               <MyTextarea 
               setActiveInstructionId={setActiveInstructionId}
               instruction={instruction}
               updateInstruction={updateInstruction}
               activeInstructionId={activeInstructionId}/>

                {/* <input 
                  type="checkbox" 
                  className="rounded-full mt-2"
                  checked={selectedInstructions.includes(instruction.id)}
                  onChange={() => handleCheckboxChange(instruction.id)}
                /> */}
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
  activeInstructionId:any
}

const MyTextarea: React.FC<Props> = ({ instruction, setActiveInstructionId, updateInstruction ,activeInstructionId}) => {
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    if (textareaRefs.current[instruction.id]) {
      if (textareaRefs.current[instruction.id]) {
        textareaRefs.current[instruction.id]!.style.height = `${textareaRefs.current[instruction.id]!.scrollHeight}px`;
      }
    }
  }, [instruction.text]);

  return (
    <textarea
      ref={(el) => {
        textareaRefs.current[instruction.id] = el;
      }}
      key={Date.now()}
      value={instruction.text}
      name="instruction"
      onFocus={() => setActiveInstructionId(instruction.id)}
      onBlur={() => setActiveInstructionId(null)}
      onChange={(e) => updateInstruction(instruction.id, e.target.value)}
      className={`w-full h-auto rounded-lg focus:outline-none border p-2 resize-none ${
        activeInstructionId === instruction.id
          ? "border-primary-orange focus:border-primary-orange"
          : instruction.text?.length > 0
          ? "border-white hover:border-primary-orange"
          : "border-primary-orange/70"
      } hover:border-primary-orange focus:border-primary-orange`}
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
      }}
    />
  );
};

