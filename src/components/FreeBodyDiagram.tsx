import React from 'react';

interface FreeBodyDiagramProps {
  questionId: number;
}

const FbdDefs: React.FC = () => (
  <defs>
    <marker id="fbdForceRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill="#dc2626" />
    </marker>
    <marker id="fbdForceTeal" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill="#0f766e" />
    </marker>
    <marker id="fbdForceBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill="#2563eb" />
    </marker>
  </defs>
);

function renderFbdSvg(questionId: number): React.ReactNode {
  switch (questionId) {
    case 1:
      // Seesaw isolated plank AB with all 5 external forces
      return (
        <svg viewBox="0 0 600 250" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 1">
          <FbdDefs />
          <rect width="600" height="250" fill="#ffffff" rx="6" />
          {/* Isolated Rigid Body: Plank AB */}
          <rect x="60" y="116" width="480" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <circle cx="360" cy="123" r="4" fill="#0f766e" />
          <circle cx="300" cy="123" r="4" fill="#0f172a" />
          <text x="52" y="127" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          <text x="548" y="127" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
          <text x="360" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">O (Poros)</text>

          {/* W_A at 60 down */}
          <line x1="60" y1="130" x2="60" y2="190" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="68" y="185" fontSize="11.5" fontWeight="700" fill="#dc2626">W_A = 200 N</text>

          {/* W_papan at 300 down */}
          <line x1="300" y1="130" x2="300" y2="178" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="292" y="175" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#dc2626">W_p = 120 N</text>

          {/* N_O at 360 up */}
          <line x1="360" y1="116" x2="360" y2="34" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="368" y="50" fontSize="12" fontWeight="700" fill="#0f766e">N_O = 860 N</text>

          {/* W_B at 480 down */}
          <line x1="480" y1="130" x2="480" y2="205" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="472" y="200" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#dc2626">W_B = 440 N</text>

          {/* W_C at 1.2m right of O (360 + 144 = 504) down */}
          <line x1="504" y1="130" x2="504" y2="175" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#fbdForceBlue)" />
          <text x="512" y="172" fontSize="11.5" fontWeight="700" fill="#2563eb">W_C = 100 N (1,2 m)</text>

          {/* Distances */}
          <text x="210" y="232" textAnchor="middle" fontSize="11" fill="#334155">r_A = 2,5 m | r_pm = 0,5 m (kiri O) | r_B = 1,0 m | r_C = 1,2 m (kanan O)</text>
        </svg>
      );

    case 2:
      return (
        <svg viewBox="0 0 640 250" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 2">
          <FbdDefs />
          <rect width="640" height="250" fill="#ffffff" rx="6" />
          <rect x="50" y="118" width="540" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <text x="38" y="129" fontSize="12" fontWeight="700" fill="#0f172a">P</text>
          <text x="598" y="129" fontSize="12" fontWeight="700" fill="#0f172a">Q</text>

          {/* W1 at x=50 */}
          <line x1="50" y1="132" x2="50" y2="188" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="58" y="185" fontSize="11" fontWeight="700" fill="#dc2626">W₁ = 200 N</text>

          {/* R_A at x=140 up */}
          <line x1="140" y1="118" x2="140" y2="38" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="148" y="52" fontSize="12" fontWeight="700" fill="#0f766e">R_A = 570 N</text>

          {/* W_balok at x=320 down */}
          <circle cx="320" cy="125" r="4" fill="#0f172a" />
          <line x1="320" y1="132" x2="320" y2="194" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="320" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">W_balok = 300 N (x=3,0 m)</text>

          {/* W2 at x=455 down */}
          <line x1="455" y1="132" x2="455" y2="208" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="455" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">W₂ = 500 N (x=4,5 m)</text>

          {/* R_B at x=590 up */}
          <line x1="590" y1="118" x2="590" y2="48" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="582" y="60" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">R_B = 430 N</text>
        </svg>
      );

    case 3:
      // Isolated horizontal arm AB with R_Ax (right), R_Ay (downward!), W_b (down), T at 37 deg (components shown dashed), W_L (down)
      return (
        <svg viewBox="0 0 560 270" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 3">
          <FbdDefs />
          <rect width="560" height="270" fill="#ffffff" rx="6" />
          <rect x="110" y="140" width="320" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <circle cx="110" cy="147" r="5" fill="#0f172a" />
          <text x="98" y="136" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          <text x="350" y="168" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">C (3,0 m)</text>
          <text x="438" y="151" fontSize="12" fontWeight="700" fill="#0f172a">B (4,0 m)</text>

          {/* R_Ax right */}
          <line x1="110" y1="147" x2="205" y2="147" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#fbdForceBlue)" />
          <text x="158" y="136" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">R_Ax = 480 N</text>

          {/* R_Ay DOWNWARD (30 N) */}
          <line x1="110" y1="154" x2="110" y2="198" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#fbdForceBlue)" />
          <text x="104" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">R_Ay = 30 N (ke bawah)</text>

          {/* W_b at 270 down */}
          <circle cx="270" cy="147" r="4" fill="#0f172a" />
          <line x1="270" y1="154" x2="270" y2="212" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="270" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">W_b = 120 N</text>

          {/* T at C (350, 140) up-left 37 deg */}
          <line x1="350" y1="140" x2="222" y2="44" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="220" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">T = 600 N</text>
          {/* Dashed components T_y and T_x */}
          <line x1="350" y1="140" x2="350" y2="44" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#fbdForceTeal)" />
          <text x="358" y="65" fontSize="11" fontWeight="600" fill="#0f766e">T_y = 360 N</text>
          <line x1="350" y1="140" x2="222" y2="140" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="285" y="128" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0f766e">T_x = 480 N (37°)</text>

          {/* W_L at B (430) down */}
          <line x1="430" y1="154" x2="430" y2="226" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="430" y="242" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">W_L = 210 N</text>
        </svg>
      );

    case 4:
      return (
        <svg viewBox="0 0 520 290" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 4">
          <FbdDefs />
          <rect width="520" height="290" fill="#ffffff" rx="6" />
          {/* Isolated Ladder AB: A=(170,245), B=(335,25) */}
          <line x1="170" y1="245" x2="335" y2="25" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
          <line x1="170" y1="245" x2="335" y2="25" stroke="#0f172a" strokeWidth="2" />
          <line x1="130" y1="245" x2="360" y2="245" stroke="#cbd5e1" strokeDasharray="4 3" strokeWidth="1" />

          {/* N_L up at A */}
          <line x1="170" y1="245" x2="170" y2="155" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="162" y="168" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">N_L = 240 N</text>

          {/* f_s right at A */}
          <line x1="170" y1="245" x2="255" y2="245" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="262" y="249" fontSize="12" fontWeight="700" fill="#2563eb">f_s = 90 N</text>

          {/* W down at CoM (252.5, 135) */}
          <circle cx="252.5" cy="135" r="4.5" fill="#0f172a" />
          <line x1="252.5" y1="135" x2="252.5" y2="215" stroke="#dc2626" strokeWidth="2.8" markerEnd="url(#fbdForceRed)" />
          <text x="260" y="210" fontSize="12" fontWeight="700" fill="#dc2626">W = 240 N</text>

          {/* N_D left at B (335, 25) */}
          <line x1="335" y1="25" x2="250" y2="25" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="244" y="30" textAnchor="end" fontSize="12" fontWeight="700" fill="#2563eb">N_D = 90 N</text>

          <text x="215" y="236" fontSize="11.5" fontWeight="700" fill="#0f172a">53°</text>
          <text x="158" y="255" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          <text x="345" y="28" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
        </svg>
      );

    case 5:
      return (
        <svg viewBox="0 0 520 295" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 5">
          <FbdDefs />
          <rect width="520" height="295" fill="#ffffff" rx="6" />
          <line x1="170" y1="245" x2="335" y2="25" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
          <line x1="130" y1="245" x2="360" y2="245" stroke="#cbd5e1" strokeDasharray="4 3" strokeWidth="1" />

          {/* N_L = 500 N up at A */}
          <line x1="170" y1="245" x2="170" y2="140" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="162" y="152" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">N_L = 500 N</text>

          {/* f_s = 255 N right at A */}
          <line x1="170" y1="245" x2="265" y2="245" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="272" y="249" fontSize="12" fontWeight="700" fill="#2563eb">f_s = 255 N</text>

          {/* W_t = 200 N at CoM (252.5, 135) */}
          <circle cx="252.5" cy="135" r="4" fill="#0f172a" />
          <line x1="252.5" y1="135" x2="252.5" y2="200" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="245" y="195" textAnchor="end" fontSize="11" fontWeight="700" fill="#dc2626">W_t = 200 N</text>

          {/* W_a = 300 N at d=4.0m (302, 69) */}
          <circle cx="302" cy="69" r="4" fill="#dc2626" />
          <line x1="302" y1="69" x2="302" y2="155" stroke="#dc2626" strokeWidth="2.6" markerEnd="url(#fbdForceRed)" />
          <text x="310" y="150" fontSize="11" fontWeight="700" fill="#dc2626">W_a = 300 N (d=4,0 m)</text>

          {/* N_D = 255 N left at B */}
          <line x1="335" y1="25" x2="240" y2="25" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="234" y="30" textAnchor="end" fontSize="12" fontWeight="700" fill="#2563eb">N_D = 255 N</text>

          <text x="210" y="236" fontSize="11" fontWeight="700" fill="#0f172a">53°</text>
        </svg>
      );

    case 6:
      return (
        <svg viewBox="0 0 580 260" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 6">
          <FbdDefs />
          <rect width="580" height="260" fill="#ffffff" rx="6" />
          <rect x="90" y="124" width="400" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <circle cx="90" cy="131" r="4.5" fill="#0f172a" />

          {/* Hinge reactions */}
          <line x1="90" y1="131" x2="28" y2="131" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="58" y="122" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Ax = 158 N</text>
          <line x1="90" y1="124" x2="90" y2="70" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="98" y="76" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Ay = 24 N</text>

          {/* F1 = 50 N at 1.0 m (190) */}
          <line x1="190" y1="138" x2="238" y2="202" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="242" y="214" fontSize="11.5" fontWeight="700" fill="#dc2626">F₁ = 50 N (53°)</text>

          {/* W = 60 N at 2.0 m (290) */}
          <circle cx="290" cy="131" r="4" fill="#0f172a" />
          <line x1="290" y1="138" x2="290" y2="198" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="290" y="214" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#dc2626">W = 60 N</text>

          {/* F2 = 160 N at 2.5 m (340) */}
          <line x1="340" y1="124" x2="420" y2="64" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="424" y="60" fontSize="12" fontWeight="700" fill="#0f766e">F₂ = 160 N (37°)</text>

          {/* F3 = 20 N at 4.0 m (490) */}
          <line x1="490" y1="138" x2="490" y2="195" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="498" y="190" fontSize="11.5" fontWeight="700" fill="#dc2626">F₃ = 20 N</text>
        </svg>
      );

    case 7:
      // Rod PQ 6.0m (70..550, 80 px/m). F3 at 4.8m -> 70 + 4.8*80 = 454
      return (
        <svg viewBox="0 0 620 260" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 7">
          <FbdDefs />
          <rect width="620" height="260" fill="#ffffff" rx="6" />
          <rect x="70" y="124" width="480" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <circle cx="70" cy="131" r="4.5" fill="#0f172a" />

          {/* Hinge reactions R_Px=30N left, R_Py=90N up */}
          <line x1="70" y1="131" x2="26" y2="131" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="44" y="122" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Px=30 N</text>
          <line x1="70" y1="124" x2="70" y2="58" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="78" y="64" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Py=90 N</text>

          {/* F1=60 N at 2.0m (230) */}
          <line x1="230" y1="138" x2="230" y2="198" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="230" y="214" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#dc2626">F₁ = 60 N (2,0 m)</text>

          {/* W=120 N at 3.0m (310) */}
          <circle cx="310" cy="131" r="4" fill="#0f172a" />
          <line x1="310" y1="138" x2="310" y2="215" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="310" y="232" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#dc2626">W = 120 N (3,0 m)</text>

          {/* F3=50 N at x=4.8m (454) */}
          <line x1="454" y1="124" x2="454" y2="56" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="454" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">F₃ = 50 N (x = 4,8 m)</text>

          {/* F2=50 N at Q (550) */}
          <line x1="550" y1="124" x2="586" y2="76" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#fbdForceTeal)" />
          <text x="550" y="66" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0f766e">F₂ = 50 N (53°)</text>
        </svg>
      );

    case 8:
      // Ladder limiting equilibrium d_max = 3.75m (75% along ladder: A(170,245) to B(335,25) -> worker at (293.75, 80))
      return (
        <svg viewBox="0 0 520 295" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 8">
          <FbdDefs />
          <rect width="520" height="295" fill="#ffffff" rx="6" />
          <line x1="170" y1="245" x2="335" y2="25" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
          <line x1="130" y1="245" x2="360" y2="245" stroke="#cbd5e1" strokeDasharray="4 3" strokeWidth="1" />

          {/* N_L = 600 N up */}
          <line x1="170" y1="245" x2="170" y2="132" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="162" y="146" textAnchor="end" fontSize="12" fontWeight="700" fill="#0f766e">N_L = 600 N</text>

          {/* f_s,max = 300 N right */}
          <line x1="170" y1="245" x2="275" y2="245" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="282" y="249" fontSize="12" fontWeight="700" fill="#2563eb">f_s,max = 300 N</text>

          {/* W_t = 200 N at 2.5 m */}
          <circle cx="252.5" cy="135" r="4" fill="#0f172a" />
          <line x1="252.5" y1="135" x2="252.5" y2="195" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="245" y="190" textAnchor="end" fontSize="11" fontWeight="700" fill="#dc2626">W_t = 200 N</text>

          {/* W_p = 400 N at d_max = 3.75 m */}
          <circle cx="294" cy="80" r="4" fill="#dc2626" />
          <line x1="294" y1="80" x2="294" y2="175" stroke="#dc2626" strokeWidth="2.6" markerEnd="url(#fbdForceRed)" />
          <text x="302" y="165" fontSize="11" fontWeight="700" fill="#dc2626">W_p = 400 N (d_max = 3,75 m)</text>

          {/* N_D = 300 N left at B */}
          <line x1="335" y1="25" x2="230" y2="25" stroke="#2563eb" strokeWidth="2.8" markerEnd="url(#fbdForceBlue)" />
          <text x="224" y="30" textAnchor="end" fontSize="12" fontWeight="700" fill="#2563eb">N_D = 300 N</text>
        </svg>
      );

    case 9:
      // Two separate FBDs: (a) Hanging mass M, (b) Horizontal beam AB
      return (
        <svg viewBox="0 0 600 265" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 9">
          <FbdDefs />
          <rect width="600" height="265" fill="#ffffff" rx="6" />
          {/* Left panel: FBD Beban M */}
          <rect x="16" y="16" width="150" height="232" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="91" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">FBD 1: Beban M</text>
          <rect x="70" y="106" width="42" height="46" rx="4" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <text x="91" y="133" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">M=40kg</text>
          <line x1="91" y1="106" x2="91" y2="56" stroke="#0f766e" strokeWidth="2.6" markerEnd="url(#fbdForceTeal)" />
          <text x="98" y="72" fontSize="11" fontWeight="700" fill="#0f766e">T = 400 N</text>
          <line x1="91" y1="152" x2="91" y2="210" stroke="#dc2626" strokeWidth="2.6" markerEnd="url(#fbdForceRed)" />
          <text x="91" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">Mg = 400 N</text>

          {/* Right panel: FBD Batang AB */}
          <rect x="182" y="16" width="402" height="232" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="383" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">FBD 2: Batang Homogen AB</text>
          <rect x="230" y="140" width="310" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
          <circle cx="230" cy="147" r="4.5" fill="#0f172a" />

          {/* Hinge reactions */}
          <line x1="230" y1="147" x2="305" y2="147" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="275" y="136" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Ax</text>
          <line x1="230" y1="154" x2="230" y2="195" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#fbdForceBlue)" />
          <text x="228" y="210" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2563eb">R_Ay=10N</text>

          {/* W_b at 2.0 m (385) */}
          <circle cx="385" cy="147" r="4" fill="#0f172a" />
          <line x1="385" y1="154" x2="385" y2="206" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="385" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">W_b = 80 N</text>

          {/* T at C (3.0 m -> 462) at 30 deg */}
          <line x1="462" y1="140" x2="345" y2="72" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="355" y="66" fontSize="11.5" fontWeight="700" fill="#0f766e">T = 400 N (30°)</text>

          {/* W_L at B (540) */}
          <line x1="540" y1="154" x2="540" y2="215" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="534" y="230" textAnchor="end" fontSize="11" fontWeight="700" fill="#dc2626">W_L = 110 N</text>
        </svg>
      );

    case 10:
    default:
      // Inclined crane boom AB: A=(170,245) to B=(302,69)
      return (
        <svg viewBox="0 0 540 295" className="w-full h-auto" role="img" aria-label="Free Body Diagram Soal 10">
          <FbdDefs />
          <rect width="540" height="295" fill="#ffffff" rx="6" />
          <line x1="170" y1="245" x2="302" y2="69" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
          <line x1="120" y1="245" x2="290" y2="245" stroke="#cbd5e1" strokeDasharray="4 3" strokeWidth="1" />

          {/* Hinge reactions R_Ax=300N right, R_Ay=400N up */}
          <line x1="170" y1="245" x2="262" y2="245" stroke="#2563eb" strokeWidth="2.6" markerEnd="url(#fbdForceBlue)" />
          <text x="270" y="249" fontSize="11.5" fontWeight="700" fill="#2563eb">R_Ax = 300 N</text>
          <line x1="170" y1="245" x2="170" y2="132" stroke="#2563eb" strokeWidth="2.6" markerEnd="url(#fbdForceBlue)" />
          <text x="162" y="144" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#2563eb">R_Ay = 400 N</text>

          {/* W_b = 160 N at midpoint (236, 157) */}
          <circle cx="236" cy="157" r="4" fill="#0f172a" />
          <line x1="236" y1="157" x2="236" y2="212" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fbdForceRed)" />
          <text x="242" y="205" fontSize="11" fontWeight="700" fill="#dc2626">W_b = 160 N</text>

          {/* T = 300 N horizontal left at C (275.6, 104.2) */}
          <circle cx="275.6" cy="104.2" r="4" fill="#0f766e" />
          <line x1="275.6" y1="104.2" x2="178" y2="104.2" stroke="#0f766e" strokeWidth="2.8" markerEnd="url(#fbdForceTeal)" />
          <text x="172" y="108" textAnchor="end" fontSize="11.5" fontWeight="700" fill="#0f766e">T = 300 N</text>

          {/* W_L = 240 N down at B (302, 69) */}
          <line x1="302" y1="69" x2="302" y2="165" stroke="#dc2626" strokeWidth="2.6" markerEnd="url(#fbdForceRed)" />
          <text x="310" y="155" fontSize="11.5" fontWeight="700" fill="#dc2626">W_L = 240 N</text>

          <text x="206" y="236" fontSize="11" fontWeight="700" fill="#0f172a">53°</text>
          <text x="340" y="268" fontSize="11.5" fontWeight="700" fill="#0f766e">Resultan R_A = √(300² + 400²) = 500 N</text>
        </svg>
      );
  }
}

export const FreeBodyDiagram: React.FC<FreeBodyDiagramProps> = ({ questionId }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-wide text-teal-800">
          FREE BODY DIAGRAM (FBD) · SOAL {questionId}
        </span>
        <span className="text-xs text-slate-500">Hanya Gaya Eksternal</span>
      </div>
      <div className="w-full overflow-hidden rounded-lg border border-slate-100 bg-white">
        {renderFbdSvg(questionId)}
      </div>
    </div>
  );
};
