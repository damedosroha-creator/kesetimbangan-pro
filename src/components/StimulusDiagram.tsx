import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface StimulusDiagramProps {
  questionId: number;
  caption: string;
  alt: string;
}

const SvgDefs: React.FC = () => (
  <defs>
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#d9a066" />
      <stop offset="50%" stopColor="#b97b42" />
      <stop offset="100%" stopColor="#8d5524" />
    </linearGradient>
    <linearGradient id="steelBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#cbd5e1" />
      <stop offset="45%" stopColor="#94a3b8" />
      <stop offset="100%" stopColor="#475569" />
    </linearGradient>
    <linearGradient id="darkMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#475569" />
      <stop offset="100%" stopColor="#1e293b" />
    </linearGradient>
    <linearGradient id="crateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0d9488" />
      <stop offset="100%" stopColor="#115e59" />
    </linearGradient>
    <linearGradient id="crateSecondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#64748b" />
      <stop offset="100%" stopColor="#334155" />
    </linearGradient>
    <pattern id="roughFloorHatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.45" />
    </pattern>
    <pattern id="wallBrick" width="24" height="16" patternUnits="userSpaceOnUse">
      <rect width="24" height="16" fill="#e2e8f0" />
      <path d="M 0 8 H 24 M 12 0 V 8 M 0 8 V 16 M 24 8 V 16" stroke="#cbd5e1" strokeWidth="1" fill="none" />
    </pattern>
    <marker id="dimArrowStart" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
      <path d="M6,0 L0,3 L6,6" fill="none" stroke="#334155" strokeWidth="1.2" />
    </marker>
    <marker id="dimArrowEnd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6" fill="none" stroke="#334155" strokeWidth="1.2" />
    </marker>
    <marker id="forceArrowDark" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill="#0f766e" />
    </marker>
  </defs>
);

function renderQuestionSvg(questionId: number): React.ReactNode {
  switch (questionId) {
    case 1: {
      // Plank L = 4.0 m -> x = 60..540 (120 px/m). O at 2.5 m -> x = 360. CoM at 2.0 m -> x = 300.
      // Andi at A (60). Budi at 1.0 m right of O -> x = 480. B at 540.
      return (
        <svg viewBox="0 0 600 290" className="w-full h-auto select-none" role="img" aria-label="Diagram Jungkat-Jungkit Soal 1">
          <SvgDefs />
          <rect width="600" height="290" fill="#f8fafc" rx="8" />
          {/* Ground */}
          <rect x="30" y="232" width="540" height="22" fill="#e2e8f0" />
          <line x1="30" y1="232" x2="570" y2="232" stroke="#64748b" strokeWidth="2" />

          {/* Triangular steel fulcrum at O (x = 360) */}
          <polygon points="360,174 334,232 386,232" fill="url(#darkMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="360" cy="174" r="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
          <text x="360" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">O</text>

          {/* Wooden plank AB */}
          <rect x="60" y="156" width="480" height="16" rx="2" fill="url(#woodGrad)" stroke="#7c471b" strokeWidth="1.5" />
          <text x="52" y="168" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">A</text>
          <text x="548" y="168" textAnchor="start" fontSize="13" fontWeight="700" fill="#0f172a">B</text>

          {/* Center of mass marker at 2.0 m (x=300) */}
          <circle cx="300" cy="164" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="300" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Pusat Massa (2,0 m)</text>

          {/* Andi at A (x=60, 20 kg) */}
          <g transform="translate(60,104)">
            <rect x="-14" y="20" width="28" height="32" rx="5" fill="#0f766e" stroke="#134e4a" strokeWidth="1.5" />
            <circle cx="0" cy="10" r="9" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.2" />
            <text x="0" y="-8" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Andi (20 kg)</text>
          </g>

          {/* Budi at x=480 (1.0 m right of O, 44 kg) */}
          <g transform="translate(480,96)">
            <rect x="-18" y="22" width="36" height="38" rx="6" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="0" cy="11" r="10" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.2" />
            <text x="0" y="-8" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Budi (44 kg)</text>
          </g>

          {/* Unknown position C callout */}
          <g transform="translate(432,40)">
            <rect x="-54" y="-14" width="108" height="34" rx="5" fill="#ffffff" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="0" y="2" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">Balok C (10 kg)</text>
            <text x="0" y="15" textAnchor="middle" fontSize="10" fill="#334155">Posisi x = ?</text>
          </g>

          {/* Dimension lines */}
          <line x1="60" y1="196" x2="360" y2="196" stroke="#334155" strokeWidth="1.3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="210" y="211" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">2,5 m</text>

          <line x1="360" y1="196" x2="480" y2="196" stroke="#334155" strokeWidth="1.3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="420" y="211" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">1,0 m</text>

          <line x1="360" y1="220" x2="540" y2="220" stroke="#475569" strokeWidth="1.2" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="450" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">1,5 m (ke ujung B)</text>

          <line x1="60" y1="270" x2="540" y2="270" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="300" y="284" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 4,0 m (m_papan = 12 kg)</text>
        </svg>
      );
    }

    case 2: {
      // L = 6.0 m -> x=50..590 (90 px/m). Support A at 1.0 m (x=140). CoM at 3.0 m (x=320).
      // Load 1 at P (x=50). Load 2 at 4.5 m (x=455). Support B at Q (x=590).
      return (
        <svg viewBox="0 0 640 280" className="w-full h-auto select-none" role="img" aria-label="Diagram Balok Dua Tumpuan Soal 2">
          <SvgDefs />
          <rect width="640" height="280" fill="#f8fafc" rx="8" />
          {/* Ground */}
          <rect x="20" y="220" width="600" height="16" fill="#e2e8f0" />
          <line x1="20" y1="220" x2="620" y2="220" stroke="#64748b" strokeWidth="2" />

          {/* Supports A and B (identical visual size so answer is not leaked) */}
          <polygon points="140,174 120,220 160,220" fill="url(#darkMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <text x="140" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Tumpuan A</text>

          <polygon points="590,174 570,220 610,220" fill="url(#darkMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <text x="590" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Tumpuan B</text>

          {/* Homogeneous Steel Beam PQ */}
          <rect x="50" y="156" width="540" height="18" rx="2" fill="url(#steelBeamGrad)" stroke="#334155" strokeWidth="1.5" />
          <text x="38" y="169" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">P</text>
          <text x="602" y="169" textAnchor="start" fontSize="13" fontWeight="700" fill="#0f172a">Q</text>

          {/* Center of mass */}
          <circle cx="320" cy="165" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="320" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Pusat Massa (3,0 m)</text>

          {/* Load 1 at P (20 kg) */}
          <rect x="34" y="120" width="32" height="36" rx="3" fill="url(#crateSecondaryGrad)" stroke="#0f172a" strokeWidth="1.4" />
          <text x="50" y="142" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">20 kg</text>
          <text x="50" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">m₁</text>

          {/* Load 2 at 4.5 m (50 kg) */}
          <rect x="433" y="108" width="44" height="48" rx="4" fill="url(#crateGrad)" stroke="#134e4a" strokeWidth="1.5" />
          <text x="455" y="136" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">50 kg</text>
          <text x="455" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">m₂</text>

          {/* Dimension guides from P */}
          <line x1="50" y1="192" x2="140" y2="192" stroke="#334155" strokeWidth="1.3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="95" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">1,0 m</text>

          <line x1="50" y1="74" x2="455" y2="74" stroke="#334155" strokeWidth="1.3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="252" y="67" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">4,5 m dari P</text>
          <line x1="455" y1="74" x2="455" y2="108" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1" />

          <line x1="50" y1="262" x2="590" y2="262" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="320" y="275" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 6,0 m (m_balok = 30 kg)</text>
        </svg>
      );
    }

    case 3: {
      // Traffic light: Horizontal arm AB 4.0 m (x=110..430, 80 px/m).
      // Hinge A at (110, 210). Cable at C=3.0 m (x=350, y=210) at 37 deg -> height 240*0.75 = 180 -> pole anchor (110, 30).
      return (
        <svg viewBox="0 0 560 320" className="w-full h-auto select-none" role="img" aria-label="Diagram Lampu Lalu Lintas Soal 3">
          <SvgDefs />
          <rect width="560" height="320" fill="#f8fafc" rx="8" />
          {/* Vertical steel pole */}
          <rect x="86" y="18" width="24" height="284" fill="url(#darkMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <rect x="70" y="294" width="56" height="12" rx="2" fill="#334155" />

          {/* Anchor ring & cable */}
          <circle cx="110" cy="30" r="4" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="110" y1="30" x2="350" y2="210" stroke="#0f766e" strokeWidth="3" />
          <text x="242" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">Kabel Baja (T)</text>

          {/* Horizontal steel arm AB */}
          <rect x="110" y="204" width="320" height="14" rx="2" fill="url(#steelBeamGrad)" stroke="#334155" strokeWidth="1.5" />
          {/* Hinge pin at A */}
          <circle cx="110" cy="211" r="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.2" />
          <text x="122" y="232" fontSize="12" fontWeight="700" fill="#0f172a">A (Engsel)</text>
          <circle cx="350" cy="211" r="4" fill="#0f766e" />
          <text x="350" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">C</text>
          <text x="438" y="214" fontSize="12" fontWeight="700" fill="#0f172a">B</text>

          {/* Center of mass of arm (2.0 m -> x=270) */}
          <circle cx="270" cy="211" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />

          {/* Angle 37 deg arc at C */}
          <path d="M 304 211 A 46 46 0 0 1 313 183" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <text x="292" y="198" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">37°</text>

          {/* Traffic light hanging at B (x=430) */}
          <line x1="430" y1="218" x2="430" y2="236" stroke="#334155" strokeWidth="2.5" />
          <rect x="412" y="236" width="36" height="72" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="430" cy="252" r="7" fill="#ef4444" />
          <circle cx="430" cy="272" r="7" fill="#f59e0b" />
          <circle cx="430" cy="292" r="7" fill="#10b981" />
          <text x="456" y="274" fontSize="12" fontWeight="700" fill="#0f172a">m_L = 21 kg</text>

          {/* Dimensions */}
          <line x1="110" y1="252" x2="350" y2="252" stroke="#334155" strokeWidth="1.3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="230" y="267" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a">3,0 m</text>

          <line x1="110" y1="282" x2="430" y2="282" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="270" y="298" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 4,0 m (m_b = 12 kg)</text>
        </svg>
      );
    }

    case 4: {
      // Ladder L=5.0m, 53 deg -> base = 3.0m (165px), height = 4.0m (220px).
      // Wall at x=400, floor at y=260. Base A=(235, 260), Top B=(400, 40).
      return (
        <svg viewBox="0 0 540 310" className="w-full h-auto select-none" role="img" aria-label="Diagram Tangga Bersandar Tanpa Orang Soal 4">
          <SvgDefs />
          <rect width="540" height="310" fill="#f8fafc" rx="8" />
          {/* Smooth vertical wall */}
          <rect x="400" y="20" width="44" height="240" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="452" y="135" fontSize="12" fontWeight="700" fill="#334155">Dinding</text>
          <text x="452" y="151" fontSize="11" fill="#475569">Vertikal (Licin)</text>

          {/* Rough floor */}
          <rect x="60" y="260" width="384" height="22" fill="url(#roughFloorHatch)" />
          <line x1="60" y1="260" x2="444" y2="260" stroke="#334155" strokeWidth="2.5" />
          <text x="145" y="296" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Lantai Horizontal Kasar</text>

          {/* Wooden Ladder from A(235,260) to B(400,40) */}
          <line x1="230" y1="257" x2="395" y2="37" stroke="#8d5524" strokeWidth="7" strokeLinecap="round" />
          <line x1="241" y1="262" x2="404" y2="44" stroke="#b97b42" strokeWidth="7" strokeLinecap="round" />
          {/* Rungs */}
          {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, i) => {
            const x = 235 + t * 165;
            const y = 260 - t * 220;
            return <line key={i} x1={x - 7} y1={y - 3} x2={x + 6} y2={y + 4} stroke="#7c471b" strokeWidth="4" />;
          })}

          {/* Center of mass at L/2 */}
          <circle cx="317.5" cy="150" r="5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
          <text x="295" y="138" textAnchor="end" fontSize="11" fontWeight="700" fill="#0f172a">Pusat Massa (L/2)</text>

          {/* Angle 53 deg at A */}
          <path d="M 278 260 A 43 43 0 0 0 261 226" fill="none" stroke="#0f766e" strokeWidth="1.8" />
          <text x="285" y="248" fontSize="13" fontWeight="700" fill="#0f766e">53°</text>

          <text x="220" y="254" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">A</text>
          <text x="394" y="32" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">B</text>

          {/* Label L and mass */}
          <text x="190" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">L = 5,0 m</text>
          <text x="190" y="118" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">m = 24 kg</text>
        </svg>
      );
    }

    case 5: {
      // Ladder 5.0m, 53 deg, child 30kg at d=4.0m (80% along ladder -> (367, 84))
      return (
        <svg viewBox="0 0 540 315" className="w-full h-auto select-none" role="img" aria-label="Diagram Tangga Dinaiki Anak Soal 5">
          <SvgDefs />
          <rect width="540" height="315" fill="#f8fafc" rx="8" />
          {/* Wall & Floor */}
          <rect x="400" y="20" width="44" height="245" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="452" y="135" fontSize="12" fontWeight="700" fill="#334155">Dinding Licin</text>
          <rect x="60" y="265" width="384" height="22" fill="url(#roughFloorHatch)" />
          <line x1="60" y1="265" x2="444" y2="265" stroke="#334155" strokeWidth="2.5" />
          <text x="150" y="302" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Lantai Horizontal Kasar</text>

          {/* Ladder A(235, 265) to B(400, 45) */}
          <line x1="230" y1="262" x2="395" y2="42" stroke="#8d5524" strokeWidth="7" strokeLinecap="round" />
          <line x1="241" y1="267" x2="404" y2="49" stroke="#b97b42" strokeWidth="7" strokeLinecap="round" />
          {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, i) => {
            const x = 235 + t * 165;
            const y = 265 - t * 220;
            return <line key={i} x1={x - 7} y1={y - 3} x2={x + 6} y2={y + 4} stroke="#7c471b" strokeWidth="4" />;
          })}

          {/* Child figure standing at t=0.8 -> (367, 89) */}
          <g transform="translate(362, 54)">
            <rect x="-10" y="14" width="20" height="24" rx="4" fill="#0d9488" stroke="#134e4a" strokeWidth="1.4" />
            <circle cx="0" cy="6" r="7" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.2" />
            <text x="-18" y="4" textAnchor="end" fontSize="11" fontWeight="700" fill="#0f766e">Anak (30 kg)</text>
          </g>

          {/* CoM marker */}
          <circle cx="317.5" cy="155" r="4.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="304" y="160" textAnchor="end" fontSize="10.5" fontWeight="600" fill="#334155">Pusat Massa (2,5 m)</text>

          {/* Distance d = 4.0 m parallel bracket along left of ladder */}
          <line x1="210" y1="246" x2="342" y2="70" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="260" y="146" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">d = 4,0 m</text>

          {/* Angle 53° */}
          <path d="M 278 265 A 43 43 0 0 0 261 231" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <text x="284" y="253" fontSize="12" fontWeight="700" fill="#0f172a">53°</text>

          <text x="220" y="260" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">A</text>
          <text x="394" y="34" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">B</text>
          <text x="120" y="65" fontSize="12" fontWeight="700" fill="#0f172a">L = 5,0 m · m_t = 20 kg</text>
        </svg>
      );
    }

    case 6: {
      // Rod AD 4.0m (x=90..490, 100 px/m) hinged at A(90, 145).
      // B at 1.0m (190): F1=50N angled 53 deg down-right.
      // C at 2.5m (340): F2=? angled 37 deg up-right.
      // D at 4.0m (490): F3=20N vertically down.
      return (
        <svg viewBox="0 0 580 280" className="w-full h-auto select-none" role="img" aria-label="Diagram Batang Berengsel Soal 6">
          <SvgDefs />
          <rect width="580" height="280" fill="#f8fafc" rx="8" />
          {/* Left support wall & hinge A */}
          <rect x="64" y="95" width="26" height="100" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <rect x="90" y="138" width="400" height="14" rx="2" fill="url(#steelBeamGrad)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="90" cy="145" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />

          {/* Labels A, B, C, D and CoM */}
          <text x="82" y="130" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          <circle cx="190" cy="145" r="3.5" fill="#0f172a" />
          <text x="184" y="132" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
          <circle cx="290" cy="145" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="290" y="168" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#475569">Pusat Massa (2,0 m)</text>
          <circle cx="340" cy="145" r="3.5" fill="#0f172a" />
          <text x="334" y="166" fontSize="12" fontWeight="700" fill="#0f172a">C</text>
          <text x="498" y="149" fontSize="12" fontWeight="700" fill="#0f172a">D</text>

          {/* F1 at B (190,152) down-right at 53 deg -> dx=48, dy=64 */}
          <line x1="190" y1="152" x2="238" y2="216" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#forceArrowDark)" />
          <path d="M 225 145 A 35 35 0 0 1 211 173" fill="none" stroke="#334155" strokeWidth="1.3" />
          <text x="226" y="170" fontSize="11" fontWeight="700" fill="#0f172a">53°</text>
          <text x="242" y="226" fontSize="12" fontWeight="700" fill="#0f766e">F₁ = 50 N</text>

          {/* F2 at C (340,138) up-right at 37 deg -> dx=72, dy=-54 */}
          <line x1="340" y1="138" x2="412" y2="84" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#forceArrowDark)" />
          <path d="M 380 145 A 40 40 0 0 0 372 121" fill="none" stroke="#334155" strokeWidth="1.3" />
          <text x="386" y="132" fontSize="11" fontWeight="700" fill="#0f172a">37°</text>
          <text x="418" y="82" fontSize="12" fontWeight="700" fill="#0f766e">F₂ = ?</text>

          {/* F3 at D (490,152) vertically down */}
          <line x1="490" y1="152" x2="490" y2="212" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#forceArrowDark)" />
          <text x="498" y="205" fontSize="12" fontWeight="700" fill="#0f766e">F₃ = 20 N</text>

          {/* Dimensions */}
          <line x1="90" y1="78" x2="190" y2="78" stroke="#334155" strokeWidth="1.2" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="140" y="70" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">1,0 m</text>

          <line x1="90" y1="50" x2="340" y2="50" stroke="#334155" strokeWidth="1.2" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="215" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">2,5 m</text>

          <line x1="90" y1="252" x2="490" y2="252" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="290" y="268" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 4,0 m (m_batang = 6 kg)</text>
        </svg>
      );
    }

    case 7: {
      // Rod PQ 6.0 m (x=70..550, 80 px/m). P at 70, 2.0m at 230, CoM 3.0m at 310, Q at 550.
      // Generic R marker placed neutrally (not at exact 4.8 m) with x = ?
      return (
        <svg viewBox="0 0 620 275" className="w-full h-auto select-none" role="img" aria-label="Diagram Batang Homogen Soal 7">
          <SvgDefs />
          <rect width="620" height="275" fill="#f8fafc" rx="8" />
          <rect x="44" y="95" width="26" height="100" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <rect x="70" y="138" width="480" height="14" rx="2" fill="url(#woodGrad)" stroke="#7c471b" strokeWidth="1.5" />
          <circle cx="70" cy="145" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />

          <text x="62" y="130" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">P</text>
          <text x="558" y="149" fontSize="12" fontWeight="700" fill="#0f172a">Q</text>

          {/* CoM at 3.0 m (310) */}
          <circle cx="310" cy="145" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="310" y="170" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#475569">Pusat Massa (3,0 m)</text>

          {/* F1 at 2.0 m (x=230) downward */}
          <line x1="230" y1="152" x2="230" y2="212" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#forceArrowDark)" />
          <text x="230" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">F₁ = 60 N</text>

          {/* Symbolic F3 = 50 N upward at unknown R */}
          <line x1="400" y1="138" x2="400" y2="82" stroke="#0f766e" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#forceArrowDark)" />
          <text x="400" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">F₃ = 50 N (di titik R)</text>

          {/* F2 at Q (550, 138) up-right 53 deg -> dx=42, dy=-56 */}
          <line x1="550" y1="138" x2="588" y2="86" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#forceArrowDark)" />
          <path d="M 550 112 A 26 26 0 0 1 566 118" fill="none" stroke="#334155" strokeWidth="1.2" />
          <text x="572" y="144" fontSize="11" fontWeight="700" fill="#0f172a">53°</text>
          <text x="546" y="78" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">F₂ = 50 N</text>

          {/* Dimensions */}
          <line x1="70" y1="192" x2="230" y2="192" stroke="#334155" strokeWidth="1.2" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="150" y="207" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">2,0 m</text>

          <line x1="70" y1="45" x2="400" y2="45" stroke="#0f766e" strokeWidth="1.3" strokeDasharray="4 3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="235" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">Jarak x = ?</text>

          <line x1="70" y1="248" x2="550" y2="248" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="310" y="264" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 6,0 m (m = 12 kg)</text>
        </svg>
      );
    }

    case 8: {
      // Ladder 5.0m, 53 deg, mu_s = 0.5, worker 40 kg climbing to d_max = ?
      return (
        <svg viewBox="0 0 540 315" className="w-full h-auto select-none" role="img" aria-label="Diagram Tangga Dinaiki Pekerja Soal 8">
          <SvgDefs />
          <rect width="540" height="315" fill="#f8fafc" rx="8" />
          <rect x="400" y="20" width="44" height="245" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="452" y="135" fontSize="12" fontWeight="700" fill="#334155">Dinding Licin</text>

          <rect x="60" y="265" width="384" height="22" fill="url(#roughFloorHatch)" />
          <line x1="60" y1="265" x2="444" y2="265" stroke="#334155" strokeWidth="2.5" />
          <text x="155" y="302" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Lantai Kasar (μ_s = 0,5)</text>

          {/* Ladder A(235, 265) to B(400, 45) */}
          <line x1="230" y1="262" x2="395" y2="42" stroke="#8d5524" strokeWidth="7" strokeLinecap="round" />
          <line x1="241" y1="267" x2="404" y2="49" stroke="#b97b42" strokeWidth="7" strokeLinecap="round" />
          {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, i) => {
            const x = 235 + t * 165;
            const y = 265 - t * 220;
            return <line key={i} x1={x - 7} y1={y - 3} x2={x + 6} y2={y + 4} stroke="#7c471b" strokeWidth="4" />;
          })}

          {/* Worker at generic climbing point */}
          <g transform="translate(335, 92)">
            <rect x="-12" y="16" width="24" height="28" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="1.4" />
            <circle cx="0" cy="7" r="8" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.2" />
            <text x="-18" y="8" textAnchor="end" fontSize="11" fontWeight="700" fill="#0f766e">Pekerja (40 kg)</text>
          </g>

          <line x1="205" y1="244" x2="310" y2="104" stroke="#0f766e" strokeWidth="1.4" strokeDasharray="4 3" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="242" y="165" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">d_max = ?</text>

          <path d="M 278 265 A 43 43 0 0 0 261 231" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <text x="284" y="253" fontSize="12" fontWeight="700" fill="#0f172a">53°</text>

          <text x="220" y="260" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">A</text>
          <text x="394" y="34" textAnchor="end" fontSize="13" fontWeight="700" fill="#0f172a">B</text>
          <text x="120" y="60" fontSize="12" fontWeight="700" fill="#0f172a">L = 5,0 m · m_t = 20 kg</text>
        </svg>
      );
    }

    case 9: {
      // Pulley & beam AB (4.0m -> x=160..480, 80 px/m). Post at x=136..160.
      // C at 3.0m -> x=400, y=210. Rope at 30 deg -> dy = 240*tan(30) = 138.6 -> pulley center at (148, 71).
      // Hanging M on left of post (x=126) so no collision.
      return (
        <svg viewBox="0 0 560 320" className="w-full h-auto select-none" role="img" aria-label="Diagram Penyangga dan Katrol Tetap Soal 9">
          <SvgDefs />
          <rect width="560" height="320" fill="#f8fafc" rx="8" />
          {/* Vertical support post */}
          <rect x="136" y="55" width="24" height="245" fill="url(#darkMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <rect x="115" y="294" width="66" height="12" rx="2" fill="#334155" />

          {/* Pulley wheel mounted on top of post */}
          <circle cx="148" cy="60" r="18" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
          <circle cx="148" cy="60" r="5" fill="#334155" />
          <text x="182" y="45" fontSize="11" fontWeight="700" fill="#334155">Katrol Tetap Licin</text>

          {/* Rope from left rim (130, 60) down to counterweight M */}
          <line x1="130" y1="60" x2="130" y2="180" stroke="#0f766e" strokeWidth="2.5" />
          <rect x="108" y="180" width="44" height="50" rx="4" fill="url(#crateGrad)" stroke="#134e4a" strokeWidth="1.5" />
          <text x="130" y="209" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">M = ?</text>

          {/* Rope from pulley rim (156, 76) down-right at 30 deg to C (400, 210) */}
          <line x1="157" y1="75" x2="400" y2="210" stroke="#0f766e" strokeWidth="2.5" />

          {/* Horizontal beam AB */}
          <rect x="160" y="204" width="320" height="14" rx="2" fill="url(#steelBeamGrad)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="160" cy="211" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
          <text x="168" y="234" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          <circle cx="320" cy="211" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="400" cy="211" r="4" fill="#0f766e" />
          <text x="400" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">C</text>
          <text x="488" y="215" fontSize="12" fontWeight="700" fill="#0f172a">B</text>

          {/* Angle 30 deg at C */}
          <path d="M 352 211 A 48 48 0 0 1 359 187" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <text x="345" y="198" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">30°</text>

          {/* Hanging load 11 kg at B */}
          <line x1="480" y1="218" x2="480" y2="245" stroke="#334155" strokeWidth="2" />
          <rect x="458" y="245" width="44" height="42" rx="4" fill="url(#crateSecondaryGrad)" stroke="#0f172a" strokeWidth="1.5" />
          <text x="480" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">11 kg</text>

          {/* Dimensions */}
          <line x1="160" y1="252" x2="400" y2="252" stroke="#334155" strokeWidth="1.2" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="280" y="266" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0f172a">3,0 m</text>

          <line x1="160" y1="285" x2="480" y2="285" stroke="#0f766e" strokeWidth="1.4" markerStart="url(#dimArrowStart)" markerEnd="url(#dimArrowEnd)" />
          <text x="320" y="302" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">L = 4,0 m (m_b = 8 kg)</text>
        </svg>
      );
    }

    case 10:
    default: {
      // Inclined boom AB: L=5.0m, 53 deg above horizontal. Hinge A at (130, 240).
      // Scale = 44 px/m -> dx = 3.0*44 = 132, dy = 4.0*44 = 176 -> Tip B at (262, 64).
      // Point C at 4.0m (80%): (130 + 0.8*132, 240 - 0.8*176) = (235.6, 99.2).
      // Horizontal cable from wall (130, 99.2) to C (235.6, 99.2).
      return (
        <svg viewBox="0 0 540 300" className="w-full h-auto select-none" role="img" aria-label="Diagram Lengan Derek Miring Soal 10">
          <SvgDefs />
          <rect width="540" height="300" fill="#f8fafc" rx="8" />
          {/* Vertical wall */}
          <rect x="84" y="20" width="46" height="250" fill="url(#wallBrick)" stroke="#64748b" strokeWidth="1.5" />
          <line x1="130" y1="20" x2="130" y2="270" stroke="#334155" strokeWidth="2" />
          {/* Ground */}
          <line x1="70" y1="270" x2="460" y2="270" stroke="#64748b" strokeWidth="2" />

          {/* Horizontal reference dashed line at A */}
          <line x1="130" y1="240" x2="310" y2="240" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.3" />

          {/* Horizontal steel cable from wall (130,99) to C (236,99) */}
          <line x1="130" y1="99" x2="236" y2="99" stroke="#0f766e" strokeWidth="3" />
          <circle cx="130" cy="99" r="4" fill="#0f766e" />
          <text x="183" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">Kabel Horizontal</text>

          {/* Inclined crane boom AB */}
          <line x1="130" y1="240" x2="262" y2="64" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
          <line x1="130" y1="240" x2="262" y2="64" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />

          {/* Hinge A, CoM, C, B */}
          <circle cx="130" cy="240" r="6.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
          <text x="142" y="256" fontSize="12" fontWeight="700" fill="#0f172a">A (Engsel)</text>

          <circle cx="196" cy="152" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
          <text x="180" y="150" textAnchor="end" fontSize="10.5" fontWeight="600" fill="#334155">Pusat Massa</text>

          <circle cx="235.6" cy="99.2" r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.2" />
          <text x="246" y="106" fontSize="12" fontWeight="700" fill="#0f172a">C (4,0 m)</text>

          <circle cx="262" cy="64" r="4" fill="#0f172a" />
          <text x="268" y="56" fontSize="12" fontWeight="700" fill="#0f172a">B (5,0 m)</text>

          {/* Angle 53° */}
          <path d="M 176 240 A 46 46 0 0 0 158 203" fill="none" stroke="#0f766e" strokeWidth="1.8" />
          <text x="182" y="226" fontSize="12" fontWeight="700" fill="#0f766e">53°</text>

          {/* Hanging load 24 kg from B (262, 64) */}
          <line x1="262" y1="64" x2="262" y2="148" stroke="#334155" strokeWidth="2.2" />
          <rect x="238" y="148" width="48" height="44" rx="4" fill="url(#crateGrad)" stroke="#134e4a" strokeWidth="1.5" />
          <text x="262" y="174" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">24 kg</text>

          {/* Info box */}
          <rect x="330" y="52" width="180" height="74" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="342" y="74" fontSize="11.5" fontWeight="700" fill="#0f172a">Data Konstruksi:</text>
          <text x="342" y="94" fontSize="11" fill="#334155">Panjang AB = 5,0 m</text>
          <text x="342" y="112" fontSize="11" fill="#334155">Massa lengan = 16 kg</text>
        </svg>
      );
    }
  }
}

export const StimulusDiagram: React.FC<StimulusDiagramProps> = ({
  questionId,
  caption,
  alt,
}) => {
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <>
      <figure className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-semibold text-teal-800">
            Stimulus Visual Fisika · Soal {questionId}
          </span>
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label={`Perbesar gambar stimulus soal ${questionId}`}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-800 cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Perbesar</span>
          </button>
        </div>

        <div
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white"
          aria-label={alt}
        >
          {renderQuestionSvg(questionId)}
        </div>

        <figcaption className="mt-2.5 text-xs leading-relaxed text-slate-600">
          {caption}
        </figcaption>
      </figure>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-3 sm:p-6 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan diperbesar gambar soal ${questionId}`}
        >
          <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 shadow-xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <p className="text-sm font-bold text-slate-900">{caption}</p>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Tutup tampilan gambar diperbesar"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-2">
              {renderQuestionSvg(questionId)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
