import React from "react";

/* ---------------------------------------------------------------
   Hand-built flat-vector illustrations for the Infographics &
   Gallery cards, styled to match the reference mockup: rounded
   friendly characters, soft decorative blobs, blue/green accents
   with warm skin-tone and coin-yellow highlights for contrast.

   Each illustration is a self-contained <svg> with viewBox
   "0 0 300 220" and no external assets, so it drops straight
   into a card or a modal banner and scales to fill its box
   (see InfographicsGallery.css: .ig-thumb svg / .ig-modal-banner svg).
----------------------------------------------------------------- */

const SKIN = "#f5c69a";
const HAIR = "#3b2a20";
const PAPER = "#ffffff";
const COIN = "#fbbf24";
const COIN_DARK = "#f59e0b";

/* Budgeting Basics — a person at a laptop with a simple bar chart */
function WalletIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="252" cy="38" r="46" fill="#ffffff22" />
      <circle cx="34" cy="186" r="36" fill="#ffffff18" />
      <rect x="30" y="158" width="240" height="12" rx="6" fill="#ffffff33" />

      {/* laptop */}
      <rect x="92" y="92" width="116" height="78" rx="10" fill={PAPER} />
      <rect x="104" y="104" width="92" height="10" rx="3" fill="#93c5fd" />
      <rect x="112" y="126" width="14" height="32" rx="3" fill="#10b981" />
      <rect x="132" y="116" width="14" height="42" rx="3" fill="#2563eb" />
      <rect x="152" y="134" width="14" height="24" rx="3" fill={COIN} />
      <rect x="80" y="168" width="140" height="10" rx="5" fill="#1e293b" opacity="0.15" />

      {/* coin stack */}
      <ellipse cx="240" cy="150" rx="20" ry="7" fill={COIN_DARK} />
      <ellipse cx="240" cy="141" rx="20" ry="7" fill={COIN} />
      <ellipse cx="240" cy="132" rx="20" ry="7" fill={COIN_DARK} />

      {/* person */}
      <rect x="118" y="46" width="64" height="52" rx="22" fill={PAPER} />
      <circle cx="150" cy="42" r="24" fill={SKIN} />
      <path d="M126 34a24 24 0 0 1 48 0c0-14-10-24-24-24s-24 10-24 24Z" fill={HAIR} />
      <circle cx="141" cy="43" r="2.4" fill="#1f2937" />
      <circle cx="159" cy="43" r="2.4" fill="#1f2937" />
      <path d="M142 50q8 6 16 0" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Needs vs Wants — two baskets, one "need" one "want", with a decision arrow */
function ScaleIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="46" cy="34" r="40" fill="#ffffff20" />
      <circle cx="260" cy="180" r="46" fill="#ffffff16" />

      {/* need basket (left) */}
      <path d="M56 118h64l-8 46a8 8 0 0 1-8 7H72a8 8 0 0 1-8-7l-8-46Z" fill={PAPER} />
      <rect x="60" y="104" width="56" height="14" rx="7" fill="#10b981" />
      <path d="M70 118v-8a18 18 0 0 1 36 0v8" stroke="#10b981" strokeWidth="6" fill="none" />
      <circle cx="80" cy="140" r="7" fill="#10b981" />
      <rect x="93" y="134" width="16" height="12" rx="3" fill="#059669" />
      <text x="88" y="180" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="inherit">NEED</text>

      {/* want basket (right) */}
      <path d="M180 118h64l-8 46a8 8 0 0 1-8 7h-32a8 8 0 0 1-8-7l-8-46Z" fill={PAPER} />
      <rect x="184" y="104" width="56" height="14" rx="7" fill={COIN} />
      <rect x="196" y="130" width="18" height="24" rx="4" fill="#f472b6" />
      <circle cx="228" cy="140" r="8" fill="#fb923c" />
      <text x="196" y="180" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="inherit">WANT</text>

      {/* decision arrow / thinking figure */}
      <circle cx="150" cy="52" r="20" fill={SKIN} />
      <path d="M130 46a20 20 0 0 1 40 0c0-12-9-20-20-20s-20 8-20 20Z" fill={HAIR} />
      <circle cx="143" cy="52" r="2.2" fill="#1f2937" />
      <circle cx="157" cy="52" r="2.2" fill="#1f2937" />
      <path d="M136 82c4-10 10-14 14-14s10 4 14 14" stroke={PAPER} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M118 98l16-14M182 98l-16-14" stroke="#ffffff55" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* The 50/30/20 Rule — a donut chart with a person pointing at it */
function ChartIllustration() {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="248" cy="176" r="44" fill="#ffffff16" />
      <circle cx="30" cy="30" r="30" fill="#ffffff20" />

      <g transform="translate(150,120) rotate(-90)">
        <circle r={r} fill="none" stroke="#ffffff33" strokeWidth="20" />
        <circle
          r={r}
          fill="none"
          stroke={PAPER}
          strokeWidth="20"
          strokeDasharray={`${c * 0.5} ${c}`}
        />
        <circle
          r={r}
          fill="none"
          stroke={COIN}
          strokeWidth="20"
          strokeDasharray={`${c * 0.3} ${c}`}
          strokeDashoffset={-c * 0.5}
        />
        <circle
          r={r}
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeDasharray={`${c * 0.2} ${c}`}
          strokeDashoffset={-c * 0.8}
        />
      </g>
      <text x="150" y="125" fill="#ffffff" fontSize="20" fontWeight="800" textAnchor="middle" fontFamily="inherit">50%</text>

      {/* person pointing */}
      <circle cx="86" cy="150" r="20" fill={SKIN} />
      <path d="M66 144a20 20 0 0 1 40 0c0-12-9-20-20-20s-20 8-20 20Z" fill={HAIR} />
      <circle cx="80" cy="150" r="2.2" fill="#1f2937" />
      <circle cx="93" cy="150" r="2.2" fill="#1f2937" />
      <rect x="60" y="170" width="52" height="40" rx="18" fill={PAPER} />
      <path d="M96 178l24-10" stroke={PAPER} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

/* Savings Goals — a piggy bank collecting a coin, with a target */
function TargetIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="250" cy="46" r="42" fill="#ffffff18" />
      <circle cx="36" cy="176" r="34" fill="#ffffff16" />

      {/* target */}
      <circle cx="228" cy="150" r="34" fill={PAPER} />
      <circle cx="228" cy="150" r="22" fill="#f87171" opacity="0.85" />
      <circle cx="228" cy="150" r="10" fill="#dc2626" />
      <path d="M228 108v-14M186 150l40 0" stroke="#ffffff55" strokeWidth="3" />

      {/* piggy bank */}
      <ellipse cx="115" cy="150" rx="58" ry="40" fill={PAPER} />
      <circle cx="70" cy="132" r="12" fill={PAPER} />
      <rect x="98" y="118" width="16" height="6" rx="3" fill="#f472b6" />
      <circle cx="90" cy="150" r="3" fill="#1f2937" />
      <rect x="100" y="108" width="30" height="8" rx="4" fill="#f472b6" />
      <path d="M60 175q-6 12 4 16" stroke="#f472b6" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M160 175q6 12-4 16" stroke="#f472b6" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* falling coin */}
      <ellipse cx="112" cy="82" rx="14" ry="14" fill={COIN} />
      <ellipse cx="112" cy="82" rx="7" ry="7" fill={COIN_DARK} />
      <path d="M112 96v14" stroke="#ffffff66" strokeWidth="2" strokeDasharray="3 4" />
    </svg>
  );
}

/* Expense Planner — a clipboard checklist with a small calculator */
function TableIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="40" cy="40" r="38" fill="#ffffff1c" />
      <circle cx="256" cy="180" r="40" fill="#ffffff16" />

      {/* clipboard */}
      <rect x="96" y="56" width="108" height="140" rx="12" fill={PAPER} />
      <rect x="126" y="46" width="48" height="20" rx="8" fill="#94a3b8" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${i * 28})`}>
          <rect x="112" y="88" width="14" height="14" rx="4" fill={i < 2 ? "#10b981" : "#e2e8f0"} />
          {i < 2 && <path d="M115 95l3 3 6-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />}
          <rect x="134" y="90" width="56" height="9" rx="4" fill="#cbd5e1" />
        </g>
      ))}

      {/* calculator */}
      <rect x="204" y="120" width="52" height="66" rx="10" fill="#2563eb" />
      <rect x="212" y="130" width="36" height="14" rx="3" fill="#ffffffcc" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={212 + col * 13}
            y={152 + row * 12}
            width="9"
            height="8"
            rx="2"
            fill="#ffffff77"
          />
        ))
      )}
    </svg>
  );
}

/* Common Money Mistakes — a surprised person with bills flying away */
function AlertIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="250" cy="44" r="40" fill="#ffffff1c" />
      <circle cx="40" cy="180" r="34" fill="#ffffff16" />

      {/* flying bills */}
      <g opacity="0.95">
        <rect x="196" y="60" width="40" height="26" rx="4" fill={PAPER} transform="rotate(-14 216 73)" />
        <rect x="228" y="92" width="40" height="26" rx="4" fill={PAPER} transform="rotate(10 248 105)" />
        <rect x="204" y="120" width="34" height="22" rx="4" fill={PAPER} transform="rotate(-6 221 131)" />
        <circle cx="216" cy="73" r="6" fill={COIN} transform="rotate(-14 216 73)" />
        <circle cx="248" cy="105" r="6" fill={COIN} transform="rotate(10 248 105)" />
      </g>

      {/* warning triangle */}
      <path d="M96 66l30 54H66l30-54Z" fill="#fbbf24" />
      <rect x="93" y="98" width="6" height="14" rx="3" fill="#78350f" />
      <circle cx="96" cy="118" r="3.2" fill="#78350f" />

      {/* surprised person */}
      <circle cx="110" cy="168" r="22" fill={SKIN} />
      <path d="M88 162a22 22 0 0 1 44 0c0-13-10-22-22-22s-22 9-22 22Z" fill={HAIR} />
      <circle cx="102" cy="168" r="2.6" fill="#1f2937" />
      <circle cx="118" cy="168" r="2.6" fill="#1f2937" />
      <ellipse cx="110" cy="177" rx="4" ry="5" fill="#1f2937" />
      <rect x="86" y="190" width="48" height="26" rx="14" fill={PAPER} />
    </svg>
  );
}

/* Emergency Fund — an umbrella shielding a coin stack from rain */
function ShieldIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="46" cy="40" r="36" fill="#ffffff1c" />
      <circle cx="252" cy="176" r="42" fill="#ffffff16" />

      {/* rain */}
      {[40, 90, 210, 250].map((x, i) => (
        <path key={i} d={`M${x} 40 l-8 20`} stroke="#ffffff55" strokeWidth="4" strokeLinecap="round" />
      ))}

      {/* umbrella */}
      <path d="M90 110a60 60 0 0 1 120 0Z" fill={PAPER} />
      <path d="M90 110h120" stroke="#e2e8f0" strokeWidth="3" />
      <rect x="147" y="108" width="6" height="70" rx="3" fill="#059669" />
      <path d="M153 176q0 14 14 12" stroke="#059669" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* protected coin stack */}
      <ellipse cx="150" cy="176" rx="26" ry="9" fill={COIN_DARK} />
      <ellipse cx="150" cy="165" rx="26" ry="9" fill={COIN} />
      <ellipse cx="150" cy="154" rx="26" ry="9" fill={COIN_DARK} />
      <text x="150" y="159" fill="#78350f" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="inherit">$</text>
    </svg>
  );
}

/* Smart Spending Habits — a lightbulb idea with a coin and a pause/checklist */
function LightbulbIllustration() {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" role="img" aria-hidden="true">
      <circle cx="244" cy="176" r="40" fill="#ffffff18" />
      <circle cx="36" cy="36" r="34" fill="#ffffff1c" />

      {/* bulb */}
      <circle cx="150" cy="96" r="44" fill={PAPER} />
      <rect x="134" y="134" width="32" height="14" rx="5" fill="#cbd5e1" />
      <rect x="138" y="150" width="24" height="8" rx="4" fill="#94a3b8" />
      <circle cx="150" cy="96" r="16" fill={COIN} />
      <text x="150" y="101" fill="#78350f" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="inherit">$</text>
      <path d="M150 40v14M108 62l10 10M192 62l-10 10" stroke="#ffffff77" strokeWidth="5" strokeLinecap="round" />

      {/* small checklist card */}
      <rect x="52" y="132" width="70" height="58" rx="10" fill={PAPER} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 16})`}>
          <rect x="62" y="146" width="10" height="10" rx="3" fill="#10b981" />
          <rect x="78" y="148" width="34" height="6" rx="3" fill="#cbd5e1" />
        </g>
      ))}
    </svg>
  );
}

export const ILLUSTRATIONS = {
  wallet: WalletIllustration,
  scale: ScaleIllustration,
  chart: ChartIllustration,
  target: TargetIllustration,
  table: TableIllustration,
  alert: AlertIllustration,
  shield: ShieldIllustration,
  lightbulb: LightbulbIllustration,
};

export default ILLUSTRATIONS;