"use client";

import { Terminal, Layers, Database, Cloud, Palette, Shield } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const skillIconMap: Record<string, any> = {
  "Core Systems": Terminal,
  "Frontend Craft": Layers,
  "Data Persistence": Database,
  "Infrastructure": Cloud,
  "UI/UX Systems": Palette,
  "Cyber Security": Shield,
};

interface SkillsGridProps {
  skills: Array<{
    id: string | number;
    title: string;
    image?: string | null;
  }>;
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <section className="py-12 px-6 md:px-20 bg-transparent relative overflow-hidden" id="skills">
      <ScrollReveal variant="slideUp">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <h2 className="font-headline text-5xl font-bold tracking-tight">The Toolkit</h2>
            <p className="font-label text-sm text-outline max-w-xs text-right">A curated selection of technologies utilized to build robust digital foundations.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-y-16 gap-x-8 md:gap-x-12 lg:gap-x-16 pt-12">
            {skills?.map((skill, index) => {
              const Icon = skillIconMap[skill.title] || Terminal;
              return (
                <ScrollReveal key={skill.id} variant="scale" delay={index * 100}>
                  <div className="flex flex-col items-center justify-end w-[80px] md:w-[100px] group cursor-default">
                    <div className="w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 mb-4">
                      {skill.image ? (
                        <img
                          src={skill.image}
                      alt={skill.title}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
                    />
                  ) : (
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-on-surface-variant group-hover:text-primary transition-colors duration-300" />
                  )}
                </div>
                <h4 className="font-label text-xs md:text-sm font-bold text-outline group-hover:text-on-surface transition-colors duration-300 text-center w-full truncate">
                  {skill.title}
                </h4>
              </div>
              </ScrollReveal>
            );
          })}
          {!skills?.length && (
            <div className="w-full py-12 text-center text-outline italic font-body">No skills documented yet.</div>
          )}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
