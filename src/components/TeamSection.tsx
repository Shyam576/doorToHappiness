import React from "react";
import Image from "next/image";
import team from "../data/team.json";
import { Reveal } from "./motion/Reveal";
import { StaggerText } from "./motion/StaggerText";
import { RevealImage } from "./motion/RevealImage";

// Populate src/data/team.json to activate this section. Each entry:
// { "name": "...", "role": "...", "photo": "/team/your-photo.jpg", "bio": "optional short line" }
// Photos must be real staff — do not use stock or placeholder photos of people.
interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio?: string;
}

const members = team as TeamMember[];

const TeamSection: React.FC = () => {
  if (members.length === 0) return null;

  return (
    <section aria-labelledby="team-heading" className="w-full border-t border-stone-300 bg-brand-ivory py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-14 max-w-2xl sm:mb-20">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
            <span className="h-px w-10 bg-amber-500" aria-hidden="true" />
            Our people
          </p>
          <h2 id="team-heading" className="font-heading text-4xl font-medium leading-[1.05] text-stone-900 sm:text-5xl">
            <StaggerText>
              Meet the people behind <em className="font-normal text-emerald-900">your Bhutan journey</em>
            </StaggerText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone-600">
            You&apos;ll spend days, not minutes, with our team. Here&apos;s who you&apos;ll be travelling with.
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 80}>
              <RevealImage delay={i * 80} className="relative aspect-[4/5] bg-stone-200" from={i % 2 === 0 ? "bottom" : "top"}>
                <div className="relative h-full w-full">
                  <Image src={member.photo} alt={member.name} fill unoptimized className="object-cover" />
                </div>
              </RevealImage>
              <h3 className="mt-5 font-heading text-2xl font-medium text-stone-900">{member.name}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">{member.role}</p>
              {member.bio && <p className="mt-3 text-sm leading-relaxed text-stone-600">{member.bio}</p>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
