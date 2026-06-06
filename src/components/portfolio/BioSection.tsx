"use client";

import { Mail, Phone, MapPin, Download } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface BioSectionProps {
  profile: {
    email?: string | null;
    phone?: string | null;
    location?: string | null;
    cv?: string | null;
    bio?: string | null;
  };
  onCvModalOpen: () => void;
}

export function BioSection({ profile, onCvModalOpen }: BioSectionProps) {
  return (
    <section className="py-6 px-6 md:px-20 bg-transparent relative overflow-hidden" id="bio">
      <ScrollReveal variant="slideUp">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16 relative z-10 ">
          <div className="md:col-span-4 space-y-8">
          <div className="space-y-3">
            <h3 className="font-label text-xs uppercase tracking-[0.3em] text-outline">Contact Details</h3>
            <ul className="space-y-4 font-label text-sm font-semibold">
              {profile.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  {profile.email}
                </li>
              )}
              {profile.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  {profile.phone}
                </li>
              )}
              {profile.location && (
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  {profile.location}
                </li>
              )}
            </ul>
          </div>
          {profile.cv && (
            <button
              onClick={onCvModalOpen}
              className="inline-flex items-center gap-3 font-label text-sm font-bold text-primary px-5 py-3 rounded-xl hover:bg-primary/10 transition-colors group border border-transparent hover:border-primary/20"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Preview Curriculum Vitae
              <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-300 ml-2"></span>
            </button>
          )}
        </div>
        <div className="md:col-span-8">
          <h3 className="font-headline text-4xl mb-4 leading-tight">
            Engineering <span className="italic font-body">the backbone</span> of modern web applications.
          </h3>
          <div className="space-y-6 font-body text-xl text-on-surface-variant leading-relaxed">
            <p className="whitespace-pre-wrap">
              {profile.bio || "With over a decade of experience, I approach software through the lens of architectural minimalism. I believe a codebase should be as intentional as a structural blueprint, prioritizing longevity over ephemeral trends."}
            </p>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
