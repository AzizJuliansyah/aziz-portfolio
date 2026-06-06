"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface ExperienceTimelineProps {
  workExperience: Array<{
    id: string | number;
    position: string;
    company_name: string;
    start_date: string;
    end_date: string;
    responsibilities?: Array<{
      id: string | number;
      responsibility: string;
    }>;
  }>;
}

export function ExperienceTimeline({ workExperience }: ExperienceTimelineProps) {
  return (
    <section className="py-12 px-6 md:px-20 bg-transparent relative overflow-hidden" id="experience">
      <ScrollReveal variant="slideUp">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Professional History</h2>
          </div>

          <div className="max-w-6xl space-y-8 relative mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 -translate-x-1/2 pointer-events-none" />

            {workExperience?.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <ScrollReveal
                  key={exp.id}
                  variant="fadeIn"
                  delay={index * 150}
                  className={`w-full md:w-[50%] pl-10 relative group/exp ${
                    isEven
                      ? "md:pr-12 md:mr-auto md:pl-0"
                      : "md:pl-12 md:ml-auto"
                  }`}
                >
                  {/* Timeline Dot */}
                  <span
                    className={`absolute top-6 w-5 h-5 rounded-full bg-surface border-[4px] border-primary group-hover/exp:scale-125 transition-transform duration-300 z-10 shadow-[0_0_0_4px_rgba(var(--surface-container-low))] ${
                      isEven
                        ? "left-[6px] md:left-auto md:right-0 md:translate-x-1/2"
                        : "left-[6px] md:left-0 md:-translate-x-1/2"
                    }`}
                  ></span>

                  <div className="bg-surface-container-low rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col gap-2 mb-4">
                      <h3 className="font-headline text-2xl font-bold text-on-surface leading-tight">{exp.position}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base">
                        <span className="font-label text-primary font-bold">{exp.company_name}</span>
                        <span className="text-on-surface-variant/30 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-xs font-semibold bg-surface-container-high px-2.5 py-1 rounded-lg border border-outline/5 shadow-sm">
                          <Calendar className="w-3.5 h-3.5 text-primary/70" />
                          <span>{exp.start_date} — {exp.end_date}</span>
                        </div>
                      </div>
                    </div>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-2.5 font-body text-base text-on-surface-variant leading-relaxed list-none">
                        {exp.responsibilities.map((res) => (
                          <li key={res.id} className="flex items-start gap-3 hover:text-on-surface transition-colors duration-200">
                            <span className="text-primary/60 mt-1.5 flex-shrink-0"><ArrowRight className="w-4 h-4"/></span>
                            <span>{res.responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}

            {!workExperience?.length && (
              <div className="py-12 text-outline italic font-body pl-10 md:pl-0 md:text-center">Professional history will be documented soon.</div>
            )}
          </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
