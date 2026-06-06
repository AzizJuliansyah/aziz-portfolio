"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface ProjectsBentoGridProps {
  projects: Array<{
    id: string | number;
    title: string;
    overview: string;
    thumbnail: string;
    info?: string;
  }>;
}

export function ProjectsBentoGrid({ projects }: ProjectsBentoGridProps) {
  return (
    <section className="py-12 px-6 md:px-20 bg-transparent relative overflow-hidden" id="projects">
      <ScrollReveal variant="slideUp">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-headline text-5xl font-bold mb-8">Selected Works</h2>
          
          <style>{`
            /* Text glow effect on hover */
            .light .project-bento-card:hover .project-glow-text {
              text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.9);
            }
            .dark .project-bento-card:hover .project-glow-text {
              text-shadow: 0 0 10px var(--color-primary), 0 0 5px rgba(0, 0, 0, 0.8);
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {projects?.slice(0, 4).map((project, index) => {
              const totalProjects = Math.min(projects.length, 4);
              
              let colSpan = "md:col-span-6";
              let rowSpan = "md:row-span-1";
              let aspectRatio = "aspect-[16/10]";
              
              if (totalProjects === 4) {
                if (index === 0) {
                  colSpan = "md:col-span-8";
                  rowSpan = "md:row-span-2";
                  aspectRatio = "aspect-[16/10] md:aspect-auto";
                } else if (index === 1 || index === 2) {
                  colSpan = "md:col-span-4";
                  rowSpan = "md:row-span-1";
                  aspectRatio = "aspect-[16/10]";
                } else if (index === 3) {
                  colSpan = "md:col-span-12";
                  rowSpan = "md:row-span-1";
                  aspectRatio = "aspect-[16/10] md:aspect-[3/1]";
                }
              } else if (totalProjects === 3) {
                if (index === 0) {
                  colSpan = "md:col-span-8";
                  rowSpan = "md:row-span-2";
                  aspectRatio = "aspect-[16/10] md:aspect-auto";
                } else {
                  colSpan = "md:col-span-4";
                  rowSpan = "md:row-span-1";
                  aspectRatio = "aspect-[16/10]";
                }
              } else if (totalProjects === 2) {
                colSpan = "md:col-span-6";
                rowSpan = "md:row-span-1";
                aspectRatio = "aspect-[16/10]";
              } else {
                colSpan = "md:col-span-12";
                rowSpan = "md:row-span-1";
                aspectRatio = "aspect-[16/10] md:aspect-[21/9]";
              }

              const isFeatured = index === 0 || (totalProjects === 4 && index === 3);
              const titleSize = isFeatured 
                ? "text-2xl md:text-3xl lg:text-4xl" 
                : "text-xl md:text-2xl lg:text-3xl";

              const colRowSpan = `${colSpan} ${rowSpan} h-full`;

              return (
                <ScrollReveal key={project.id} variant="scale" delay={index * 150} className={colRowSpan}>
                  <div
                    className={`project-bento-card group ${aspectRatio} relative overflow-hidden bg-surface-container-lowest rounded-lg shadow-sm w-full h-full`}
                  >
                    <div className="absolute inset-0 bg-surface-container-lowest">
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover grayscale brightness-[0.85] opacity-60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-108"
                        src={project.thumbnail}
                        style={{ objectPosition: 'center center' }}
                      />
                    </div>
                    <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <p className="hidden md:block font-label text-xs font-bold uppercase tracking-widest text-primary mb-2 opacity-70 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 project-glow-text">
                        {project.info || "Visual Case Study"}
                      </p>
                      <h3 className={`font-headline ${titleSize} font-bold mb-4 opacity-85 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 project-glow-text`}>
                        {project.title}
                      </h3>
                      <a className="ml-1.5 text-on-surface font-label font-bold flex items-center gap-2 inline-flex opacity-60 -translate-x-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 project-glow-text" href={`/projects/${project.id}`}>
                        Case Study
                        <ArrowRight className="w-5 h-5 text-primary transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

