import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import team from "../data/team.json";

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
    <div className="w-full bg-white py-16 sm:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Meet the People Behind Your Bhutan Journey
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            You&apos;ll spend days, not minutes, with our team. Here&apos;s
            who you&apos;ll be travelling with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {members.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-100">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-stone-900">
                {member.name}
              </h3>
              <p className="text-amber-700 text-sm font-medium mb-2">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TeamSection;
