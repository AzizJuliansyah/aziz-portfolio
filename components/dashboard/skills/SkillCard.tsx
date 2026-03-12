import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Image as ImageIcon, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Skill } from "@/types/skill";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SkillCardProps {
  skill: Skill;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export const SkillCard = ({ skill, index, onEdit, onDelete }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card noPadding className="group relative overflow-hidden transition-all duration-300 hover:border-blue-500/50 flex flex-col h-full border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md">
        
        {/* Header Section */}
        <div className="px-3 py-2 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Drag Handle */}
            <div 
              {...listeners}
              className="p-1.5 bg-white/90 dark:bg-gray-900/90 rounded-lg cursor-grab active:cursor-grabbing text-gray-600 hover:text-blue-500 shadow-sm"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Rank Number */}
            <div className="px-2 py-1.5 bg-blue-600/90 text-white text-[10px] font-bold rounded-lg shadow-sm flex items-center">
              #{index + 1}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={onEdit}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 shadow-sm"
              title="Edit Skill"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 shadow-sm"
              title="Delete Skill"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-3 flex items-start gap-4">
          {/* Skill Image/Icon */}
          <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-blue-600 overflow-hidden relative flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-800">
            {skill.image ? (
              <Image src={skill.image as string} alt={skill.title} width={48} height={48} className="w-full h-full object-cover" unoptimized />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-300" />
            )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-[13px] font-extrabold text-gray-900 dark:text-white truncate leading-none mb-1.5">
              {skill.title}
            </h3>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              {isExpanded ? (
                <>Hide Description <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Show Description <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Description */}
        {isExpanded && (
          <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-3 italic font-medium">
              {skill.description || "No description provided."}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
