import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  SunMedium,
  Share2,
  RotateCcw,
  ExternalLink,
  Home,
} from "lucide-react";

const FAMILY_META = {
  A: {
    name: "Sunlit Fruity",
    longName: "Sunlit Fruity Family",
    emoji: "🍑",
    glow: "from-pink-200 via-yellow-100 to-orange-100",
    nightGlow: "from-pink-900/40 via-amber-900/20 to-rose-900/30",
  },
  B: {
    name: "Morning-Mist White Floral",
    longName: "Morning-Mist White Floral Family",
    emoji: "☁️",
    glow: "from-sky-100 via-cyan-50 to-indigo-100",
    nightGlow: "from-sky-900/40 via-cyan-900/20 to-indigo-900/30",
  },
  C: {
    name: "Moonlit Incense",
    longName: "Moonlit Incense Family",
    emoji: "🌙",
    glow: "from-violet-200 via-purple-100 to-fuchsia-100",
    nightGlow: "from-violet-900/40 via-purple-900/20 to-fuchsia-900/30",
  },
  D: {
    name: "Cold-Forest Metal",
    longName: "Cold-Forest Metal Family",
    emoji: "🌲",
    glow: "from-emerald-100 via-teal-50 to-slate-200",
    nightGlow: "from-emerald-900/30 via-teal-900/20 to-slate-900/40",
  },
};

const RESULTS = {
  A1: {
    family: "A",
    title: "Creamy Floral Fruity Soft Scent",
    vibe: "A delicate, pretty, softly glowing scent, like wandering through flowers in the woods.",
    description:
      "It feels like a light fluttery skirt, petals lit by sunlight, and a faint fruity sweetness left on the skin. It’s a natural kind of beauty, the kind that feels effortless and soft without ever looking forced. This perfume blooms quietly in its own little world. It’s not the kind of glow that blinds you right away, but the kind that makes you look back a second time.",
    keywords: ["pear", "peach", "rose", "creamy notes", "white musk", "soft sweet florals"],
    fits: ["pretty types", "artsy vibes", "gentle aesthetic lovers", "foresty vibes", "flower-themed characters", "detail lovers"],
  },
  A2: {
    family: "A",
    title: "Fairy Tale Berry Pink Mist",
    vibe: "A romantic, soft scent with a bit of childlike nostalgia in it.",
    description:
      "It feels like opening your favorite fairy tale book from childhood, with green gardens, pink sunsets, berry cream desserts, and soft floaty fabric drifting in the breeze. It smells dreamy and a little unreal, like stepping into another world for a while. This scent fits the kind of character who feels fragile and sparkly at the same time. It brings up thoughts of wishes, secrets, little poems, and late-night feelings that are too soft to say out loud.",
    keywords: ["grass", "after-rain air", "daisy", "vanilla", "musk", "sugar icing"],
    fits: ["fairy tale types", "dreamy vibes", "artsy people", "soft little animal energy", "poetry-loving types", "pure romance vibes"],
  },
  A3: {
    family: "A",
    title: "Sweet Peach Soda Fruity Floral",
    vibe: "A bright, passionate, super cute scent that practically glows.",
    description:
      "It feels like fruity sparkling drinks in summer, colorful candy in a candy shop, lively instant photos, and glittery little accessories shining in the sun. The whole thing feels cheerful, sweet, and super easy to notice. This scent has big idol energy. It’s not super complicated, but it’s lovable right away, like a tiny sun that makes everything around it feel brighter.",
    keywords: ["peach", "strawberry", "lychee", "sweet fruity florals", "ramune soda", "fruit candy"],
    fits: ["idol types", "sweet girls", "energetic pretty girls", "sunshine characters", "social center types", "sparkling main-character vibes"],
  },
  A4: {
    family: "A",
    title: "Pop-Rock Candy Fantasy Party Scent",
    vibe: "This fits a scent that feels lively, bouncy, and wonderfully weird in the cutest way.",
    description:
      "It feels like colorful candy wrappers, fireworks, juice, little bits of magic, and surprise after surprise appearing out of nowhere. The scent keeps jumping around in a super expressive way, like happiness that refuses to sit still. There’s a bit of childlike wonder in it, a bit of contrast, and a bit of unpredictability too. But overall it just feels fresh, bright, and full of life.",
    keywords: ["citrus", "berries", "orange blossom", "juice", "vanilla", "rainbow sprinkles"],
    fits: ["chaotic cuties", "adventurers", "little sunshine types", "huge imagination energy"],
  },
  B1: {
    family: "B",
    title: "Soap Scent Like Early Morning Air",
    vibe: "A clean, restrained, low-key kind of scent.",
    description:
      "At first it might feel kinda plain or simple, but then the image starts to come through: a freshly ironed white shirt, crisp morning air, and a room kept super neat and tidy. It just makes everything feel fresh, calm, and reliable. If this were a perfume, the opening wouldn’t be loud or attention-grabbing. You might even think, ‘oh, that’s pretty simple,’ but the longer it stays, the more you notice that cool, clean, structured charm. It’s subtle, but it really grows on you.",
    keywords: ["soapy", "fir", "cedar", "white musk", "iris", "clean fabric"],
    fits: ["uniform types", "serious ones", "orderly types", "stoic vibes", "older-and-steady feeling", "quiet and dependable people"],
  },
  B2: {
    family: "B",
    title: "Cotton Scent Through Early Spring Fog",
    vibe: "A gentle, caring scent that stays by your side like a quiet little white cat, warm and clear.",
    description:
      "It feels like a soft knit sweater, freshly washed sheets drying in the sun, and pale morning light coming through the window. It doesn’t try hard to stand out, but it has this super comfy feeling that makes people want to get a little closer. This kind of scent isn’t trying to overpower anyone. It feels more like helping someone relax and breathe easier for a while. Soft, warm, and quietly comforting from start to finish.",
    keywords: ["white tea", "lily of the valley", "cotton", "milky notes", "soft florals", "gentle musk"],
    fits: ["healing types", "neighbor vibes", "caring softies", "white moonlight type", "everyday cozy feeling", "gentle pretty people"],
  },
  B3: {
    family: "B",
    title: "Bright Bouquet Sweet Soft Scent",
    vibe: "A friendly, cheerful scent that feels as sweet and comforting as fresh-baked food.",
    description:
      "It feels like a bouquet you just received, delicious fruit beside a cream cake, and the person at a gathering who keeps smiling and making sure everything feels nice. Soft, likable, and full of warmth. This scent gives off that ‘you’re welcome here’ feeling. It’s bright, easy to like, and perfect for the kind of character who naturally makes the whole room feel softer.",
    keywords: ["peony", "jasmine", "pear", "white peach", "white musk", "mixed florals"],
    fits: ["group favorite", "social butterfly", "warm protagonist vibes", "caring types", "holiday mood makers"],
  },
  B4: {
    family: "B",
    title: "Red Rose Amber Main Character Scent",
    vibe: "A warm, radiant scent with calm and gentle charisma.",
    description:
      "It feels like roses, golden sunlight, and the center of a stage where everyone is looking, but the person standing there still looks completely at ease. It naturally gives off that ‘main character’ feeling. This scent has both warmth and depth. The opening catches attention, and the drydown lingers in a way that feels soft, mature, and quietly powerful.",
    keywords: ["rose", "amber", "berries", "sandalwood", "honey"],
    fits: ["main characters", "leaders", "center-stage types", "savior vibes", "prince charming types"],
  },
  C1: {
    family: "C",
    title: "Incense and Bathing on an Early Summer Night",
    vibe: "A mysterious, soft scent with a little bit of distance that you can’t fully figure out.",
    description:
      "It feels like faint purple mist on an early summer night, dried flowers tucked between old book pages, and quiet incense slowly burning in the dark. It’s the kind of scent that makes you pause for a second and think a little more. It doesn’t feel cold, just hard to fully read. The first impression is like a soft little mystery, and only later does the warmth underneath start to show.",
    keywords: ["violet", "iris", "incense", "amber", "misty woods", "old paper"],
    fits: ["prophet types", "mysterious guides", "spiritual mentor vibes", "elegant people with a bit of distance"],
  },
  C2: {
    family: "C",
    title: "Cool Mist, Book Pages, and Tea Wood",
    vibe: "A scent that feels smart, distant, quiet, and just a little restless.",
    description:
      "It feels like the corner of a room, notes left open past midnight, an old book flipped open, and fruit tea that’s gone half cold. It’s not the usual easy-to-love kind of scent. It feels more specific, more strange, more hard to label. The charm here isn’t social sparkle. It’s the weird little pull of intelligence, silence, and that ‘there’s definitely something going on in there’ kind of feeling.",
    keywords: ["tea", "blueberry", "cool musk", "cashmere wood", "dusty notes", "dry woods"],
    fits: ["scholars", "researchers", "genius homebody types", "niche-interest lovers", "quiet people who think a lot"],
  },
  C3: {
    family: "C",
    title: "Contrasty Spicy Fruity Wood",
    vibe: "A smart, flirty, dangerous-but-fun kind of scent.",
    description:
      "It feels like biting into a slightly spicy fruit, sharp words hidden inside a joke, and a whiskey glass swaying under dim lights. It’s a little stimulating, a little unruly, and gives off that ‘okay wait… was that on purpose?’ kind of mood. This isn’t the classic safe-and-stable type of scent. The longer it stays, the more little twists show up, and that’s exactly what makes it fun.",
    keywords: ["fig", "pink pepper", "ginger", "amber", "woods", "sweet spice"],
    fits: ["finance playboy vibes", "masters of their game", "chaos energy", "charming antagonist types"],
  },
  C4: {
    family: "C",
    title: "Dark Gold Spiced Wood Authority Scent",
    vibe: "A powerful, glamorous scent where pressure and charm exist at the same time.",
    description:
      "It feels like dark golden light hitting heavy curtains, expensive fabric brushing past the stage, sharp heels, and the kind of scene where one sentence is enough to decide everything. It isn’t soft or approachable. It feels purposeful and intense. This scent fits characters with undeniable aura, maybe even a little dangerous luxury mixed in. It’s not something everybody can pull off, but when it fits, it looks insanely good.",
    keywords: ["saffron", "oud", "amber", "blackcurrant", "spicy woods", "dark golden resin vibes"],
    fits: ["queen or king types", "villain bosses", "workaholics", "ambitious people", "ultimate powerhouses", "room-dominating characters"],
  },
  D1: {
    family: "D",
    title: "Black Obsidian Cool Wood Spice",
    vibe: "A sharp, logical scent with strong control vibes, like dancing right along the edge of a blade.",
    description:
      "It feels like a black coat, skyscrapers at night, cool-toned metal, and a complicated machine quietly running in the dark. Everything about it feels calm, precise, and a little untouchable. This scent doesn’t really try to please everybody. It feels more like a statement. Not loud, not sweet, not easy on purpose, but definitely hard to forget.",
    keywords: ["cypress", "black pepper", "vetiver", "patchouli", "cool woods", "a hint of smoke"],
    fits: ["strategists", "people in power", "cold intelligent types", "workplace elite vibes"],
  },
  D2: {
    family: "D",
    title: "Metal, Leather, and Citrus Wood",
    vibe: "A neat, independent scent that sways right near the edge of danger.",
    description:
      "It feels like cold wind against a motorcycle helmet, the metallic touch of a toolbox, freshly peeled citrus, and worn leather gloves. There’s a wild dusty edge to it that makes the whole scent feel cool without trying too hard. It has a bit of distance to it, and at first it can seem hard to approach. But the longer it stays, the more real it feels, with a rough little charm hidden underneath.",
    keywords: ["bergamot", "leather", "tobacco", "cedar", "mineral notes", "cold air"],
    fits: ["cool guys and girls", "quiet action types", "techwear vibes", "people who look super cool in a fight", "low-emotion-output types"],
  },
  D3: {
    family: "D",
    title: "Sparkling Citrus Leather",
    vibe: "A bold, confident, thrilling scent that walks right on the edge and gets remembered fast.",
    description:
      "It feels like a freshly opened ice-cold soda, a lively beach night, shiny leather under the noon sun, and wind rushing past your ears. It hits quickly and leaves a bright, exciting first impression. This scent isn’t mellow or gentle. It’s energetic, a little provocative, and very hard to ignore. Perfect for the kind of character who looks like trouble, but in a really attractive way.",
    keywords: ["citrus", "wild rose", "sea salt", "leather", "pepper", "fizzy soda vibes"],
    fits: ["party people", "sporty types", "city nightlife vibes", "dangerous but addictive types"],
  },
  D4: {
    family: "D",
    title: "Classic Chypre Citrus Moss",
    vibe: "A mature, dependable scent with strong execution power.",
    description:
      "It feels like a high-quality suit jacket, a spotless office, polished leather goods, and a perfectly organized schedule. It smells stable and put-together, with no extra decoration needed. This scent has a classic, authoritative feel. Steady, clear, and reliable from the first impression to the very end.",
    keywords: ["bergamot", "oakmoss", "patchouli", "vetiver", "clean florals", "chypre"],
    fits: ["leaders", "class president types", "career-minded people", "strong executors", "mature and steady characters"],
  },
};

const QUESTIONS = [
  {
    id: 1,
    prompt: "Pick a place you would disappear to for an hour.",
    options: [
      { key: "A", text: "A flower market full of candy colors.", resultId: "A1" },
      { key: "B", text: "A sunlit room with clean sheets and open windows.", resultId: "B1" },
      { key: "C", text: "A quiet library corner with old pages and violet dust.", resultId: "C2" },
      { key: "D", text: "A rooftop at night with cold wind and city steel.", resultId: "D1" },
    ],
  },
  {
    id: 2,
    prompt: "Which accessory suits you best?",
    options: [
      { key: "A", text: "A glossy ribbon or candy-shaped charm.", resultId: "A3" },
      { key: "B", text: "A soft linen scarf or pressed-flower bookmark.", resultId: "B2" },
      { key: "C", text: "A ring with an old stone and no explanation.", resultId: "C1" },
      { key: "D", text: "A sleek watch or dark leather gloves.", resultId: "D2" },
    ],
  },
  {
    id: 3,
    prompt: "What kind of first impression do you leave?",
    options: [
      { key: "A", text: "Bright, fun, and easy to notice.", resultId: "A4" },
      { key: "B", text: "Soft, safe, and strangely comforting.", resultId: "B3" },
      { key: "C", text: "Mysterious, elegant, and hard to figure out.", resultId: "C1" },
      { key: "D", text: "Cool, capable, and a little intimidating.", resultId: "D4" },
    ],
  },
  {
    id: 4,
    prompt: "Choose the light that feels most like you.",
    options: [
      { key: "A", text: "Honey-colored afternoon light.", resultId: "A1" },
      { key: "B", text: "Pale morning light through curtains.", resultId: "B2" },
      { key: "C", text: "Purple-blue dusk after rain.", resultId: "C3" },
      { key: "D", text: "White city reflections on black glass.", resultId: "D1" },
    ],
  },
  {
    id: 5,
    prompt: "Which texture feels most right to you?",
    options: [
      { key: "A", text: "Chiffon, petals, and glossy wrappers.", resultId: "A2" },
      { key: "B", text: "Fresh cotton and warm knit sleeves.", resultId: "B1" },
      { key: "C", text: "Velvet shadow and matte old paper.", resultId: "C2" },
      { key: "D", text: "Structured leather and brushed metal.", resultId: "D2" },
    ],
  },
  {
    id: 6,
    prompt: "How do you care for people?",
    options: [
      { key: "A", text: "By brightening the mood and making things fun.", resultId: "A3" },
      { key: "B", text: "By noticing what others need before they ask.", resultId: "B3" },
      { key: "C", text: "By understanding silently and speaking later.", resultId: "C4" },
      { key: "D", text: "By solving the problem without fuss.", resultId: "D4" },
    ],
  },
  {
    id: 7,
    prompt: "Pick a palette for your room.",
    options: [
      { key: "A", text: "Peach, strawberry pink, pale yellow, and glitter.", resultId: "A4" },
      { key: "B", text: "Cream white, washed blue, mint, and soft light.", resultId: "B1" },
      { key: "C", text: "Dusty violet, plum, old gold, and gray.", resultId: "C4" },
      { key: "D", text: "Forest green, charcoal, silver, and cold blue.", resultId: "D1" },
    ],
  },
  {
    id: 8,
    prompt: "Which scene feels most like you in motion?",
    options: [
      { key: "A", text: "Running downhill laughing with candy in hand.", resultId: "A3" },
      { key: "B", text: "Carrying tea and fixing someone's collar.", resultId: "B2" },
      { key: "C", text: "Pausing under moonlight like you heard something hidden.", resultId: "C1" },
      { key: "D", text: "Walking fast through the city without looking back.", resultId: "D3" },
    ],
  },
  {
    id: 9,
    prompt: "What kind of charm do you have?",
    options: [
      { key: "A", text: "Colorful, sweet, sparkling, and expressive.", resultId: "A4" },
      { key: "B", text: "Warm, graceful, approachable, and calming.", resultId: "B4" },
      { key: "C", text: "Sharp, beautiful, and secretly dangerous.", resultId: "C3" },
      { key: "D", text: "Effortlessly cool and hard to forget.", resultId: "D3" },
    ],
  },
  {
    id: 10,
    prompt: "What detail would people remember about you the longest?",
    options: [
      { key: "A", text: "A glossy smile and fruit-sweet air.", resultId: "A2" },
      { key: "B", text: "Clean fabric and a reassuring voice.", resultId: "B1" },
      { key: "C", text: "A slow glance and the scent of old pages.", resultId: "C2" },
      { key: "D", text: "A silver watch and exact posture.", resultId: "D4" },
    ],
  },
  {
    id: 11,
    prompt: "Which social role fits you best?",
    options: [
      { key: "A", text: "The one who makes every plan more fun.", resultId: "A1" },
      { key: "B", text: "The one everyone feels safe beside.", resultId: "B3" },
      { key: "C", text: "The one who notices everything quietly.", resultId: "C4" },
      { key: "D", text: "The one who leads without wasting motion.", resultId: "D4" },
    ],
  },
  {
    id: 12,
    prompt: "Which small object feels most like you?",
    options: [
      { key: "A", text: "A peach soda bottle charm.", resultId: "A3" },
      { key: "B", text: "A folded handkerchief that smells clean.", resultId: "B2" },
      { key: "C", text: "A silver bookmark hiding a dried flower.", resultId: "C1" },
      { key: "D", text: "A cool metal lighter with a precise click.", resultId: "D2" },
    ],
  },
  {
    id: 13,
    prompt: "Key question — what kind of warmth do you hide underneath?",
    options: [
      { key: "A", text: "Playful, fizzy, and golden.", resultId: "A4" },
      { key: "B", text: "Tender, steady, and always there.", resultId: "B4" },
      { key: "C", text: "Private, deep, and low-burning.", resultId: "C4" },
      { key: "D", text: "Protective, controlled, and shown through action.", resultId: "D2" },
    ],
  },
  {
    id: 14,
    prompt: "Key question — how would your presence spread through a room?",
    options: [
      { key: "A", text: "In bright sweet bursts that pull eyes instantly.", resultId: "A3" },
      { key: "B", text: "Softly, close to the skin like clean cotton.", resultId: "B2" },
      { key: "C", text: "Slowly, like smoke and violet dusk.", resultId: "C1" },
      { key: "D", text: "Sharply, with cold edges and dark structure.", resultId: "D3" },
    ],
  },
  {
    id: 15,
    prompt: "Final key question — years later, what remains most clearly about you?",
    options: [
      { key: "A", text: "A bright smile and candy-colored warmth.", resultId: "A2" },
      { key: "B", text: "A calm hand, clean fabric, and quiet comfort.", resultId: "B1" },
      { key: "C", text: "A strange ache and a line you never forgot.", resultId: "C3" },
      { key: "D", text: "Cold night air, steel, and absolute composure.", resultId: "D1" },
    ],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatFamilyList(list) {
  if (!list.length) return "None";
  if (list.length === 1) return FAMILY_META[list[0]].name;
  return list.map((k) => FAMILY_META[k].name).join(" / ");
}

function DecorativeLayer({ night }) {
  const blobs = [
    "left-[5%] top-[8%] h-32 w-32",
    "right-[10%] top-[12%] h-40 w-40",
    "left-[12%] bottom-[16%] h-28 w-28",
    "right-[8%] bottom-[10%] h-24 w-24",
  ];

  const bubbles = [
    { left: "8%", size: 36, delay: 0, duration: 10 },
    { left: "18%", size: 22, delay: 2, duration: 12 },
    { left: "31%", size: 54, delay: 1, duration: 11 },
    { left: "46%", size: 28, delay: 4, duration: 9 },
    { left: "58%", size: 44, delay: 3, duration: 13 },
    { left: "69%", size: 24, delay: 6, duration: 10 },
    { left: "81%", size: 58, delay: 2.5, duration: 12 },
    { left: "91%", size: 30, delay: 5, duration: 11 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((cls, i) => (
        <motion.div
          key={`blob-${i}`}
          className={cn(
            "absolute rounded-full blur-3xl",
            cls,
            night ? (i % 2 === 0 ? "bg-violet-500/12" : "bg-sky-400/10") : i % 2 === 0 ? "bg-pink-300/25" : "bg-cyan-300/20"
          )}
          animate={{
            y: [0, -18, 8, 0],
            x: [0, 12, -10, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {bubbles.map((bubble, i) => (
        <motion.div
          key={`bubble-${i}`}
          className={cn(
            "absolute bottom-[-10%] rounded-full border backdrop-blur-sm",
            night ? "border-white/10 bg-white/5" : "border-white/60 bg-white/20"
          )}
          style={{ left: bubble.left, width: bubble.size, height: bubble.size }}
          initial={{ y: 120, opacity: 0, scale: 0.7 }}
          animate={{ y: -980, opacity: [0, 0.28, 0.18, 0], scale: [0.7, 1, 1.08, 1.16] }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className={cn("absolute h-1.5 w-1.5 rounded-full", night ? "bg-white/40" : "bg-white/75")}
          style={{ left: `${(i * 17) % 100}%`, top: `${(i * 11) % 100}%` }}
          animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ night, value }) {
  return (
    <div className={cn("h-3 overflow-hidden rounded-full", night ? "bg-white/8" : "bg-black/5")}>
      <motion.div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-pink-300 via-sky-200 to-violet-300",
          night && "from-pink-400/45 via-sky-400/35 to-violet-400/45"
        )}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function ResultSection({ result, night, onRestart, onShare, shareBusy, toast }) {
  const cardRef = useRef(null);
  const scent = RESULTS[result.resultId];
  const family = FAMILY_META[result.mainFamily];

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__shareCardRef = cardRef;
    }
  }, []);

  const scoreRows = Object.keys(FAMILY_META).map((key) => ({
    key,
    name: FAMILY_META[key].name,
    emoji: FAMILY_META[key].emoji,
    score: result.familyScores[key],
  }));

  return (
    <div className="space-y-4">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
        <span className={cn("rounded-full border px-4 py-2 text-sm font-medium", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white/80 text-slate-700")}>
          {family.emoji} Main family: {family.longName}
        </span>
        <span className={cn("rounded-full border px-4 py-2 text-sm", night ? "border-white/10 bg-white/5 text-white/70" : "border-black/5 bg-white/80 text-slate-600")}>
          Secondary lean: {formatFamilyList(result.secondaryFamilies)}
        </span>
      </div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={cn(
          "relative mx-auto w-full max-w-4xl overflow-hidden rounded-[34px] border p-5 md:p-6",
          night ? "border-white/10 bg-slate-950/80 text-white" : "border-white/70 bg-white/85 text-slate-900",
          "shadow-2xl backdrop-blur-xl"
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", night ? family.nightGlow : family.glow)} />
        <div className={cn("absolute inset-0", night ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),transparent_35%)]")} />

        <div className="relative flex flex-col gap-4">
          <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold leading-tight md:text-4xl">
                  {family.emoji} {scent.title}
                </h2>
              </div>

            <p className={cn("text-base md:text-lg", night ? "text-white/85" : "text-slate-700")}>
              {scent.vibe}
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
                <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.22em]", night ? "text-white/55" : "text-slate-500")}>
                  Scent Story
                </p>
                <p className={cn("text-sm leading-7", night ? "text-white/82" : "text-slate-700")}>
                  {scent.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
                  <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.22em]", night ? "text-white/55" : "text-slate-500")}>
                    Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scent.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className={cn("rounded-full border px-3 py-1 text-xs md:text-sm", night ? "border-white/10 bg-white/5 text-white/80" : "border-black/5 bg-white text-slate-700")}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
                  <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.22em]", night ? "text-white/55" : "text-slate-500")}>
                    Fits characters like
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scent.fits.map((item) => (
                      <span
                        key={item}
                        className={cn("rounded-full border px-3 py-1 text-xs md:text-sm", night ? "border-white/10 bg-white/5 text-white/80" : "border-black/5 bg-white text-slate-700")}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
            <div className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
              <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.22em]", night ? "text-white/55" : "text-slate-500")}>
                Family Scores
              </p>
              <div className="space-y-3">
                {scoreRows.map((row) => {
                  const pct = Math.max(8, Math.round((row.score / 18) * 100));
                  return (
                    <div key={row.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {row.emoji} {row.name}
                        </span>
                        
                      </div>
                      <div className={cn("h-2.5 overflow-hidden rounded-full", night ? "bg-white/10" : "bg-black/5")}>
                        <div
                          className={cn("h-full rounded-full bg-gradient-to-r", night ? FAMILY_META[row.key].nightGlow : FAMILY_META[row.key].glow)}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
              <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.22em]", night ? "text-white/55" : "text-slate-500")}>
                Actions
              </p>
              <div className="space-y-3 text-center">
                <motion.button
                  onClick={onShare}
                  disabled={shareBusy}
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" } }}
                  className="mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 shadow-xl transition disabled:opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,190,210,0.95), rgba(190,235,255,0.95), rgba(221,214,255,0.95), rgba(255,241,176,0.95), rgba(255,190,210,0.95))",
                    backgroundSize: "220% 220%",
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  {shareBusy ? "Preparing..." : "Share result"}
                </motion.button>

                <a href="https://vgen.co/Fur31mu" target="_blank" rel="noreferrer" className={cn("mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-800")}>My VGen <ExternalLink className="h-4 w-4" /></a>
                <a href="https://x.com/Fur31mu" target="_blank" rel="noreferrer" className={cn("mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-800")}>My X <ExternalLink className="h-4 w-4" /></a>
                <button onClick={onRestart} className={cn("mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-800")}>
                  <RotateCcw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={cn("fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-sm shadow-2xl", night ? "bg-white text-slate-900" : "bg-slate-900 text-white")}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function IntroSection({ night, onStart }) {
  return (
    <motion.section
      key="intro"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl"
    >
      <div className={cn("rounded-[34px] border p-6 md:p-8", night ? "border-white/10 bg-white/5" : "border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(255,182,225,0.16)]")}>
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight md:text-5xl">
          What's your perfume aura?
        </h2>
        <p className={cn("mx-auto mt-4 max-w-2xl text-center text-base leading-7 md:text-lg", night ? "text-white/74" : "text-slate-600")}>
          A simple and quick test—step into this fantasy dream and explore the scent hidden in your soul.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {Object.entries(FAMILY_META).map(([key, item]) => (
            <div key={key} className={cn("rounded-3xl border p-4", night ? "border-white/10 bg-white/5" : "border-black/5 bg-white/70")}>
              <div className="mb-2 flex items-center gap-2 text-lg font-medium">
                {item.emoji} {item.name}
              </div>
              <div className={cn("h-2 rounded-full bg-gradient-to-r", night ? item.nightGlow : item.glow)} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={onStart}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" } }}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl md:text-base"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,190,210,0.95), rgba(190,235,255,0.95), rgba(221,214,255,0.95), rgba(255,241,176,0.95), rgba(255,190,210,0.95))",
              backgroundSize: "220% 220%",
            }}
          >
            <span aria-hidden="true">❤</span>
            <span>Start the quiz</span>
            <span aria-hidden="true">❤</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

function QuizSection({ night, question, current, total, progress, onPick }) {
  return (
    <motion.section
      key={`quiz-${question.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="mx-auto max-w-4xl"
    >
      <div className={cn("mb-4 rounded-[28px] border p-4 md:p-5", night ? "border-white/10 bg-white/5" : "border-white/70 bg-white/80")}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className={night ? "text-white/70" : "text-slate-600"}>
            Question {current + 1} / {total}
          </span>
          <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]", current >= 12 ? night ? "border-violet-400/30 bg-violet-500/10 text-violet-200" : "border-violet-200 bg-violet-50 text-violet-700" : night ? "border-white/10 bg-white/5 text-white/60" : "border-black/5 bg-white text-slate-500")}>
            {current >= 12 ? "Key question · 2 points" : "Standard question · 1 point"}
          </span>
        </div>
        <ProgressBar night={night} value={progress} />
      </div>

      <div className={cn("rounded-[34px] border p-6 md:p-8", night ? "border-white/10 bg-white/5" : "border-white/70 bg-white/85 shadow-[0_24px_70px_rgba(255,182,225,0.14)]")}>
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">{question.prompt}</h2>

        <div className="mt-6 grid gap-4">
          {question.options.map((option) => (
            <motion.button
              key={`${question.id}-${option.key}`}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onPick(option)}
              className={cn("group relative overflow-hidden rounded-[28px] border p-5 text-left transition", night ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/5 bg-white/80 hover:bg-white")}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-r opacity-75", night ? FAMILY_META[option.key].nightGlow : FAMILY_META[option.key].glow)} />
              <div className={cn("absolute inset-[1px] rounded-[27px]", night ? "bg-slate-950/72" : "bg-white/88")} />
              <div className="relative flex gap-4">
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>
                  {option.key}
                </div>
                <p className={cn("text-sm leading-7 md:text-base", night ? "text-white/86" : "text-slate-700")}>
                  {option.text}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function computeResult(answers) {
  const familyScores = { A: 0, B: 0, C: 0, D: 0 };
  const subScores = Object.fromEntries(Object.keys(RESULTS).map((key) => [key, 0]));

  answers.forEach((answer, index) => {
    const weight = index >= 12 ? 2 : 1;
    familyScores[answer.key] += weight;
    subScores[answer.resultId] += weight;
  });

  const topScore = Math.max(...Object.values(familyScores));
  let mainCandidates = Object.keys(familyScores).filter((key) => familyScores[key] === topScore);

  if (mainCandidates.length > 1 && answers.length > 0) {
    mainCandidates = [answers[answers.length - 1].key];
  }

  const mainFamily = mainCandidates[0] || "A";
  const otherScores = Object.entries(familyScores)
    .filter(([key]) => key !== mainFamily)
    .map(([, value]) => value);
  const secondScore = otherScores.length ? Math.max(...otherScores) : 0;
  const secondaryFamilies = Object.keys(familyScores).filter((key) => key !== mainFamily && familyScores[key] === secondScore && secondScore > 0);

  const subtypeCandidates = Object.keys(RESULTS).filter((id) => RESULTS[id].family === mainFamily);
  let best = subtypeCandidates[0];
  let bestScore = -1;

  subtypeCandidates.forEach((id) => {
    if (subScores[id] > bestScore) {
      best = id;
      bestScore = subScores[id];
    } else if (subScores[id] === bestScore) {
      const lastHit = [...answers].reverse().find((item) => item.resultId === id || item.resultId === best);
      if (lastHit?.resultId === id) best = id;
    }
  });

  return {
    mainFamily,
    secondaryFamilies,
    resultId: best,
    familyScores,
    subScores,
  };
}

export default function CharacterPerfumeQuizApp() {
  const [night, setNight] = useState(false);
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [toast, setToast] = useState("");
  const [shareBusy, setShareBusy] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (media?.matches) setNight(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const progress = useMemo(() => {
    if (step === "result") return 100;
    return Math.max(0, ((current + (step === "quiz" ? 1 : 0)) / QUESTIONS.length) * 100);
  }, [current, step]);

  const currentQuestion = QUESTIONS[current];
  const result = useMemo(() => (answers.length === QUESTIONS.length ? computeResult(answers) : null), [answers]);

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setStep("quiz");
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrent(0);
    setStep("intro");
  };

  const handlePick = (option) => {
    const next = [...answers, { questionId: currentQuestion.id, key: option.key, resultId: option.resultId }];
    setAnswers(next);

    if (current === QUESTIONS.length - 1) {
      setStep("result");
      return;
    }

    setCurrent((prev) => prev + 1);
  };

  const handleShare = async () => {
    const baseText = result
      ? [
          `I got ${RESULTS[result.resultId].title} in Character Perfume Quiz ✨`,
          `Main family: ${FAMILY_META[result.mainFamily].longName}`,
          `Secondary lean: ${formatFamilyList(result.secondaryFamilies)}`,
          `VGen: https://vgen.co/Fur31mu`,
          `X: https://x.com/Fur31mu`,
        ].join("\n")
      : "Character Perfume Quiz by Fur31mu\nVGen: https://vgen.co/Fur31mu\nX: https://x.com/Fur31mu";

    try {
      await navigator.clipboard.writeText(baseText);
    } catch (error) {
      console.error(error);
    }

    if (!result) {
      setToast("Share text copied.");
      return;
    }

    setShareBusy(true);
    try {
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default;
      const node = window.__shareCardRef?.current;
      if (!node) throw new Error("Share card not found");

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Failed to create PNG");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `fur31mu-perfume-aura-${result.resultId}.png`;
      link.click();
      URL.revokeObjectURL(url);

      setToast("Share text copied. Result card saved as PNG.");
    } catch (error) {
      console.error(error);
      setToast("Share text copied.");
    } finally {
      setShareBusy(false);
    }
  };

  return (
    <div className={cn("min-h-screen overflow-hidden transition-colors duration-500", night ? "bg-slate-950 text-white" : "bg-[#fff9fe] text-slate-900")}>
      <style>{`
        ::selection { background: rgba(255, 182, 225, 0.35); }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className={cn("relative min-h-screen", night ? "bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,#0a0f1f_0%,#090b12_100%)]" : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_30%),linear-gradient(180deg,#fff8fb_0%,#f7fbff_100%)]")}>
        <DecorativeLayer night={night} />

        <div className="relative mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <header className={cn("mx-auto mb-6 flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-[28px] border px-5 py-4 backdrop-blur-xl", night ? "border-white/10 bg-white/5" : "border-white/70 bg-white/75 shadow-[0_20px_60px_rgba(255,182,225,0.15)]")}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={handleRestart} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>
                <Home className="h-4 w-4" />
                Home
              </button>
              <button onClick={handleShare} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <a href="https://vgen.co/Fur31mu" target="_blank" rel="noreferrer" className={cn("rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>My VGen</a>
              <a href="https://x.com/Fur31mu" target="_blank" rel="noreferrer" className={cn("rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>My X</a>
              <button onClick={() => setNight((v) => !v)} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5", night ? "border-white/10 bg-white/5 text-white" : "border-black/5 bg-white text-slate-700")}>
                {night ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {night ? "Day mode" : "Night mode"}
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {step === "intro" && <IntroSection night={night} onStart={handleStart} />}

            {step === "quiz" && currentQuestion && (
              <QuizSection
                night={night}
                question={currentQuestion}
                current={current}
                total={QUESTIONS.length}
                progress={progress}
                onPick={handlePick}
              />
            )}

            {step === "result" && result && (
              <motion.section
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <ResultSection
                  result={result}
                  night={night}
                  onRestart={handleRestart}
                  onShare={handleShare}
                  shareBusy={shareBusy}
                  toast={toast}
                />
              </motion.section>
            )}
          </AnimatePresence>

          <footer className={cn("mx-auto mt-8 w-full max-w-4xl rounded-[28px] border px-5 py-4 text-center text-sm", night ? "border-white/10 bg-white/5 text-white/65" : "border-white/70 bg-white/75 text-slate-600")}>
            Made by Fur31mu · Built with React, Tailwind, Framer Motion, and html2canvas · Code assistance by GPT
          </footer>
        </div>
      </div>
    </div>
  );
}
