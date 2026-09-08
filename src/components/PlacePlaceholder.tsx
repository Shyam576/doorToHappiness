import React from "react";
import { FaPrayingHands, FaTree, FaStore, FaMountain } from "react-icons/fa";

interface PlacePlaceholderProps {
  name: string;
  className?: string;
}

const RELIGIOUS_KEYWORDS = [
  "dzong",
  "lhakhang",
  "monastery",
  "temple",
  "chorten",
  "goenpa",
  "stupa",
  "nunnery",
  "palace",
];
const MARKET_KEYWORDS = ["market", "town", "institute", "museum", "craft"];
const NATURE_KEYWORDS = [
  "village",
  "valley",
  "river",
  "pass",
  "lake",
  "trek",
  "forest",
  "wildlife",
  "sanctuary",
  "park",
  "farm",
  "bridge",
];

const getCategory = (name: string): "religious" | "market" | "nature" | "general" => {
  const lower = name.toLowerCase();
  if (RELIGIOUS_KEYWORDS.some((k) => lower.includes(k))) return "religious";
  if (MARKET_KEYWORDS.some((k) => lower.includes(k))) return "market";
  if (NATURE_KEYWORDS.some((k) => lower.includes(k))) return "nature";
  return "general";
};

// Deterministic pick from a small warm-palette pool so the same place always
// renders the same shade, without every tile in a grid looking identical.
const GRADIENTS = [
  "from-amber-100 to-amber-200",
  "from-emerald-100 to-emerald-200",
  "from-stone-100 to-amber-100",
  "from-amber-50 to-stone-200",
];

const hashIndex = (input: string, mod: number) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
};

const ICONS = {
  religious: FaPrayingHands,
  market: FaStore,
  nature: FaTree,
  general: FaMountain,
};

// Stands in for attraction photography we don't have the rights to display —
// see the "hotlinked images" audit. Renders a named, categorized tile instead
// of a broken or borrowed photo.
const PlacePlaceholder: React.FC<PlacePlaceholderProps> = ({
  name,
  className = "",
}) => {
  const category = getCategory(name);
  const Icon = ICONS[category];
  const gradient = GRADIENTS[hashIndex(name, GRADIENTS.length)];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradient} text-amber-900/70 px-3 text-center ${className}`}
    >
      <Icon className="w-6 h-6 opacity-60" aria-hidden="true" />
      <span className="text-xs font-semibold leading-snug line-clamp-2">
        {name}
      </span>
    </div>
  );
};

export default PlacePlaceholder;
