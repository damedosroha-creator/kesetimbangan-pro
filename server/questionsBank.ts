import type { QuestionGradingRule } from '../src/utils/scoring';
import type { TeacherQuestionFull } from '../src/types/assessment';
import { STUDENT_QUESTIONS } from '../src/data/studentQuestions';

export const GRADING_RULES: QuestionGradingRule[] = [
  {
    questionId: 1,
    type: 'single_choice',
    maxPoints: 10,
    correctOption: 'C',
    correctAnswerDisplay: 'C (1,2 m di kanan O; N_O = 860 N)',
  },
  {
    questionId: 2,
    type: 'single_choice',
    maxPoints: 10,
    correctOption: 'B',
    correctAnswerDisplay: 'B (R_A = 570 N, R_B = 430 N, selisih 140 N)',
  },
  {
    questionId: 3,
    type: 'complex_choice',
    maxPoints: 10,
    correctOptions: ['A', 'C', 'D'],
    correctAnswerDisplay: 'A, C, D',
  },
  {
    questionId: 4,
    type: 'complex_choice',
    maxPoints: 10,
    correctOptions: ['A', 'C', 'D'],
    correctAnswerDisplay: 'A, C, D',
  },
  {
    questionId: 5,
    type: 'true_false_4',
    maxPoints: 10,
    correctStatements: {
      S1: 'BENAR',
      S2: 'SALAH',
      S3: 'BENAR',
      S4: 'SALAH',
    },
    correctAnswerDisplay: 'P1: BENAR | P2: SALAH | P3: BENAR | P4: SALAH',
  },
  {
    questionId: 6,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 160,
    tolerance: 0.5,
    expectedUnit: 'N',
    acceptedUnits: ['n', 'newton'],
    correctAnswerDisplay: '160 N',
  },
  {
    questionId: 7,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 4.8,
    tolerance: 0.05,
    expectedUnit: 'm',
    acceptedUnits: ['m', 'meter'],
    correctAnswerDisplay: '4.8 m',
  },
  {
    questionId: 8,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 3.75,
    tolerance: 0.02,
    expectedUnit: 'm',
    acceptedUnits: ['m', 'meter'],
    correctAnswerDisplay: '3.75 m',
  },
  {
    questionId: 9,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 40,
    tolerance: 0.2,
    expectedUnit: 'kg',
    acceptedUnits: ['kg', 'kilogram'],
    correctAnswerDisplay: '40 kg',
  },
  {
    questionId: 10,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 500,
    tolerance: 1,
    expectedUnit: 'N',
    acceptedUnits: ['n', 'newton'],
    correctAnswerDisplay: '500 N',
  },
];

const EXPLANATIONS: Record<number, TeacherQuestionFull['explanation']> = {
  1: {
    identifikasiMasalah:
      'Sistem berupa papan jungkat-jungkit homogen yang bertumpu pada poros asimetris di titik O (bukan di tengah papan). Karena titik tumpu tidak berada di pusat massa papan, gaya berat papan sendiri menimbulkan momen gaya terhadap titik O. Kita diminta menentukan posisi balok tambahan C agar kesetimbangan rotasi tercapai serta gaya normal tumpuan O dari kesetimbangan translasi.',
    diketahui: [
      'Panjang total papan: $L = 4{,}0\\text{ m}$',
      'Massa papan homogen: $m_{\\text{papan}} = 12\\text{ kg} \\implies W_{\\text{papan}} = 120\\text{ N}$ di titik tengah ($2{,}0\\text{ m}$ dari $A$)',
      'Posisi titik tumpu $O$: $2{,}5\\text{ m}$ dari $A$ ($1{,}5\\text{ m}$ dari $B$), sehingga pusat massa papan berada $0{,}5\\text{ m}$ di sebelah kiri $O$',
      'Massa Andi di ujung kiri $A$: $m_A = 20\\text{ kg} \\implies W_A = 200\\text{ N}$, jarak $r_A = 2{,}5\\text{ m}$ di kiri $O$',
      'Massa Budi: $m_B = 44\\text{ kg} \\implies W_B = 440\\text{ N}$, jarak $r_B = 1{,}0\\text{ m}$ di kanan $O$',
      'Massa balok $C$: $m_C = 10\\text{ kg} \\implies W_C = 100\\text{ N}$',
      'Percepatan gravitasi: $g = 10\\text{ m/s}^2$',
    ],
    ditanyakan:
      'Posisi balok $C$ terhadap titik tumpu $O$ dan besar gaya reaksi normal tumpuan $N_O$.',
    landasanTeori: [
      'Syarat kesetimbangan statis benda tegar pada bidang vertikal: $\\Sigma F_y = 0$ (kesetimbangan translasi vertikal) dan $\\Sigma \\tau_O = 0$ (kesetimbangan rotasi terhadap poros $O$).',
      'Momen gaya didefinisikan sebagai $\\tau = F \\cdot d_{\\perp}$, dengan $d_{\\perp}$ adalah lengan momen tegak lurus dari poros ke garis kerja gaya.',
      'Konvensi arah rotasi terhadap poros $O$: gaya ke bawah di sebelah kiri $O$ menghasilkan torsi berlawanan jarum jam (CCW, bertanda $+$), sedangkan gaya ke bawah di sebelah kanan $O$ menghasilkan torsi searah jarum jam (CW, bertanda $-$).',
      'Karena papan homogen, pusat massanya berada tepat di titik tengah geometrisnya ($L/2 = 2{,}0\\text{ m}$ dari ujung $A$).',
    ],
    fbdSummary:
      'Diagram benda bebas papan jungkat-jungkit AB terisolasi dari tanah dan penyangga, menampilkan lima gaya eksternal vertikal: $W_A$ di ujung kiri, $W_{\\text{papan}}$ di pusat massa ($0{,}5\\text{ m}$ kiri $O$), gaya normal tumpuan $N_O$ ke atas tepat di $O$, $W_B$ di $1{,}0\\text{ m}$ kanan $O$, dan $W_C$ pada jarak $x$ di kanan $O$.',
    fbdComponents: [
      '$W_A = 200\\text{ N}$ (ke bawah di $x = -2{,}5\\text{ m}$ dari $O$)',
      '$W_{\\text{papan}} = 120\\text{ N}$ (ke bawah di pusat massa, $x = -0{,}5\\text{ m}$ dari $O$)',
      '$N_O$ (ke atas tepat di poros $O$, $x = 0$)',
      '$W_B = 440\\text{ N}$ (ke bawah di $x = +1{,}0\\text{ m}$ dari $O$)',
      '$W_C = 100\\text{ N}$ (ke bawah di $x = +1{,}2\\text{ m}$ dari $O$)',
    ],
    penyelesaianMatematis: [
      '1. Hitung torsi mula-mula (tanpa balok $C$) terhadap poros $O$:',
      '$$\\tau_{\\text{CCW}} = W_A \\cdot r_A + W_{\\text{papan}} \\cdot r_{\\text{pm}} = (200)(2{,}5) + (120)(0{,}5) = 500 + 60 = 560\\text{ N}\\cdot\\text{m}$$',
      '$$\\tau_{\\text{CW}} = W_B \\cdot r_B = (440)(1{,}0) = 440\\text{ N}\\cdot\\text{m}$$',
      '2. Karena $\\tau_{\\text{CCW}} > \\tau_{\\text{CW}}$ sebesar $560 - 440 = 120\\text{ N}\\cdot\\text{m}$, balok $C$ harus diletakkan di sebelah **kanan** titik tumpu $O$ pada jarak $x$ untuk menghasilkan torsi searah jarum jam:',
      '$$\\Sigma \\tau_O = 0 \\implies 560 - 440 - W_C \\cdot x = 0$$',
      '$$120 - 100 x = 0 \\implies x = \\frac{120}{100} = 1{,}2\\text{ m di sebelah kanan } O$$',
      '3. Cek kelayakan geometris: sisi kanan papan panjangnya $1{,}5\\text{ m}$ dari $O$, dan $1{,}2\\text{ m} < 1{,}5\\text{ m}$ sehingga balok berada $0{,}3\\text{ m}$ di sebelah kiri ujung $B$ (masih di atas papan).',
      '4. Hitung gaya reaksi normal tumpuan $O$ menggunakan kesetimbangan translasi vertikal:',
      '$$\\Sigma F_y = 0 \\implies N_O - W_A - W_{\\text{papan}} - W_B - W_C = 0$$',
      '$$N_O = 200 + 120 + 440 + 100 = 860\\text{ N}$$',
    ],
    verifikasi: [
      'Satuan: jarak dalam $\\text{m}$ dan gaya normal dalam $\\text{N}$, konsisten dengan SI.',
      'Cek torsi ulang terhadap ujung kiri $A$: $\\Sigma \\tau_A = N_O(2{,}5) - W_{\\text{papan}}(2{,}0) - W_B(3{,}5) - W_C(3{,}7) = 860(2{,}5) - 120(2{,}0) - 440(3{,}5) - 100(3{,}7) = 2150 - 240 - 1540 - 370 = 0$. Terbukti nol.',
    ],
    kesimpulan:
      'Balok $C$ harus diletakkan $1{,}2\\text{ m}$ di sebelah kanan titik tumpu $O$ dengan gaya reaksi normal tumpuan $N_O = 860\\text{ N}$. Pilihan yang tepat adalah **C**.',
  },
  2: {
    identifikasiMasalah:
      'Balok homogen mendatar ditopang oleh dua tumpuan pada posisi asimetris ($A$ di $1{,}0\\text{ m}$ dari kiri, $B$ di ujung kanan $6{,}0\\text{ m}$) serta memikul dua beban tambahan yang juga tidak simetris. Karena distribusi gaya tidak simetris terhadap tengah bentang, gaya reaksi $R_A$ dan $R_B$ tidak sama besar.',
    diketahui: [
      'Panjang balok homogen $PQ$: $L = 6{,}0\\text{ m}$',
      'Massa balok: $m_{\\text{balok}} = 30\\text{ kg} \\implies W_{\\text{balok}} = 300\\text{ N}$ bekerja di $x_{\\text{pm}} = 3{,}0\\text{ m}$ dari $P$',
      'Posisi tumpuan $A$: $x_A = 1{,}0\\text{ m}$ dari $P$',
      'Posisi tumpuan $B$: $x_B = 6{,}0\\text{ m}$ dari $P$ (jarak $AB = 5{,}0\\text{ m}$)',
      'Beban 1 di ujung $P$: $m_1 = 20\\text{ kg} \\implies W_1 = 200\\text{ N}$ pada $x_1 = 0\\text{ m}$ ($1{,}0\\text{ m}$ di kiri $A$)',
      'Beban 2: $m_2 = 50\\text{ kg} \\implies W_2 = 500\\text{ N}$ pada $x_2 = 4{,}5\\text{ m}$ dari $P$ ($3{,}5\\text{ m}$ di kanan $A$)',
    ],
    ditanyakan:
      'Besar gaya reaksi tumpuan $R_A$, $R_B$, dan perbandingan/selisih keduanya.',
    landasanTeori: [
      'Untuk sistem benda tegar dengan seluruh gaya sejajar sumbu vertikal, berlaku dua persamaan kesetimbangan independen: $\\Sigma F_y = 0$ dan $\\Sigma \\tau = 0$.',
      'Memilih poros momen tepat di salah satu titik kerja gaya yang tidak diketahui (misalnya di tumpuan $A$) mengeliminasi $R_A$ dari persamaan torsi karena lengan momennya nol.',
      'Reaksi kedua tumpuan hanya sama besar jika seluruh beban dan titik tumpu tersusun simetris terhadap pusat massa balok.',
    ],
    fbdSummary:
      'Diagram benda bebas balok PQ menampilkan lima gaya vertikal eksternal: $W_1$ di ujung $P$, $R_A$ ke atas di $x=1{,}0\\text{ m}$, $W_{\\text{balok}}$ di pusat massa ($x=3{,}0\\text{ m}$), $W_2$ di $x=4{,}5\\text{ m}$, dan $R_B$ ke atas di ujung $Q$ ($x=6{,}0\\text{ m}$).',
    fbdComponents: [
      '$W_1 = 200\\text{ N}$ ke bawah di $x = 0\\text{ m}$',
      '$R_A$ ke atas di $x = 1{,}0\\text{ m}$',
      '$W_{\\text{balok}} = 300\\text{ N}$ ke bawah di $x = 3{,}0\\text{ m}$',
      '$W_2 = 500\\text{ N}$ ke bawah di $x = 4{,}5\\text{ m}$',
      '$R_B$ ke atas di $x = 6{,}0\\text{ m}$',
    ],
    penyelesaianMatematis: [
      '1. Ambil poros rotasi di titik tumpuan $A$ ($x_A = 1{,}0\\text{ m}$), dengan torsi CCW bertanda $+$ dan CW bertanda $-$:',
      '$$\\Sigma \\tau_A = 0 \\implies +W_1(1{,}0) - W_{\\text{balok}}(2{,}0) - W_2(3{,}5) + R_B(5{,}0) = 0$$',
      '2. Substitusikan nilai numerik:',
      '$$200(1{,}0) - 300(2{,}0) - 500(3{,}5) + 5{,}0 R_B = 0$$',
      '$$200 - 600 - 1750 + 5{,}0 R_B = 0$$',
      '$$5{,}0 R_B = 2150 \\implies R_B = \\frac{2150}{5{,}0} = 430\\text{ N}$$',
      '3. Gunakan kesetimbangan translasi vertikal ($\\Sigma F_y = 0$) untuk memperoleh $R_A$:',
      '$$R_A + R_B - W_1 - W_{\\text{balok}} - W_2 = 0$$',
      '$$R_A + 430 - 200 - 300 - 500 = 0 \\implies R_A = 1000 - 430 = 570\\text{ N}$$',
      '4. Hitung selisih kedua reaksi tumpuan: $R_A - R_B = 570 - 430 = 140\\text{ N}$ ($R_A > R_B$).',
    ],
    verifikasi: [
      'Cek torsi terhadap ujung kiri $P$: $\\Sigma \\tau_P = R_A(1{,}0) + R_B(6{,}0) - W_{\\text{balok}}(3{,}0) - W_2(4{,}5) = 570 + 2580 - 900 - 2250 = 3150 - 3150 = 0$.',
      'Kedua nilai $R_A = 570\\text{ N} > 0$ dan $R_B = 430\\text{ N} > 0$, menunjukkan balok benar-benar menekan kedua tumpuan (tidak terangkat).',
    ],
    kesimpulan:
      'Gaya reaksi tumpuan $A$ sebesar $R_A = 570\\text{ N}$ dan tumpuan $B$ sebesar $R_B = 430\\text{ N}$, sehingga $R_A > R_B$ dengan selisih $140\\text{ N}$. Pilihan yang tepat adalah **B**.',
  },
  3: {
    identifikasiMasalah:
      'Lengan penyangga horizontal $AB$ berengsel di tiang $A$, menahan beban lampu di ujung $B$, serta ditopang oleh kabel miring di titik $C$. Kita harus menentukan tegangan kabel $T$, kedua komponen reaksi engsel ($R_{Ax}$ dan $R_{Ay}$), serta mengevaluasi pengaruh pergeseran titik ikat kabel.',
    diketahui: [
      'Panjang lengan homogen: $L = 4{,}0\\text{ m}$, massa $m_b = 12\\text{ kg} \\implies W_b = 120\\text{ N}$ di $x = 2{,}0\\text{ m}$',
      'Massa lampu lalu lintas di $B$: $m_L = 21\\text{ kg} \\implies W_L = 210\\text{ N}$ di $x = 4{,}0\\text{ m}$',
      'Titik ikat kabel $C$: $x_C = 3{,}0\\text{ m}$ dari engsel $A$',
      'Sudut kabel terhadap lengan: $\\theta = 37^{\\circ}$ ($\\sin 37^{\\circ} = 0{,}6$; $\\cos 37^{\\circ} = 0{,}8$)',
    ],
    ditanyakan:
      'Evaluasi kebenaran masing-masing pernyataan A sampai E terkait tegangan kabel, reaksi engsel, dan hubungan variabel.',
    landasanTeori: [
      'Kesetimbangan benda tegar memerlukan $\\Sigma F_x = 0$, $\\Sigma F_y = 0$, dan $\\Sigma \\tau_A = 0$.',
      'Tegangan tali $T$ yang miring diuraikan menjadi komponen horizontal $T_x = T\\cos\\theta$ (ke kiri menuju tiang) dan komponen vertikal $T_y = T\\sin\\theta$ (ke atas).',
      'Hanya komponen gaya yang tegak lurus terhadap lengan ($T_y = T\\sin\\theta$) yang menghasilkan momen gaya terhadap engsel $A$, sedangkan $T_x$ garis kerjanya melewati engsel $A$ sehingga torsinya nol.',
    ],
    fbdSummary:
      'Diagram benda bebas lengan horizontal AB terisolasi dari tiang dan tali: di engsel A digambarkan komponen reaksi $R_{Ax}$ (ke kanan) dan $R_{Ay}$ (ke bawah karena $T_y > W_b + W_L$), di tengah bekerja $W_b$, di titik C bekerja $T$ bersudut $37^{\\circ}$ (atau komponen $T_x$ dan $T_y$), dan di ujung B bekerja $W_L$.',
    fbdComponents: [
      '$R_{Ax} = 480\\text{ N}$ ke kanan dan $R_{Ay} = 30\\text{ N}$ ke bawah di engsel $A$',
      '$W_b = 120\\text{ N}$ ke bawah di pusat massa ($2{,}0\\text{ m}$ dari $A$)',
      '$T = 600\\text{ N}$ miring $37^{\\circ}$ ke kiri-atas di $C$ ($3{,}0\\text{ m}$ dari $A$)',
      '$W_L = 210\\text{ N}$ ke bawah di ujung $B$ ($4{,}0\\text{ m}$ dari $A$)',
    ],
    penyelesaianMatematis: [
      '1. Tinjau kesetimbangan rotasi terhadap engsel $A$ ($\\Sigma \\tau_A = 0$):',
      '$$(T \\sin 37^{\\circ}) \\cdot x_C = W_b (2{,}0) + W_L (4{,}0)$$',
      '$$T (0{,}6)(3{,}0) = 120(2{,}0) + 210(4{,}0) = 240 + 840 = 1080\\text{ N}\\cdot\\text{m}$$',
      '$$1{,}8 T = 1080 \\implies T = \\frac{1080}{1{,}8} = 600\\text{ N}$$',
      '2. Uraikan komponen tegangan tali:',
      '$$T_y = T \\sin 37^{\\circ} = 600(0{,}6) = 360\\text{ N (ke atas)}$$',
      '$$T_x = T \\cos 37^{\\circ} = 600(0{,}8) = 480\\text{ N (ke kiri)}$$',
      '3. Tinjau kesetimbangan translasi horizontal ($\\Sigma F_x = 0$):',
      '$$R_{Ax} - T_x = 0 \\implies R_{Ax} = 480\\text{ N (ke kanan, menjauhi tiang)}$$',
      '4. Tinjau kesetimbangan translasi vertikal ($\\Sigma F_y = 0$). Misalkan $R_{Ay}$ berarah ke atas:',
      '$$R_{Ay} + T_y - W_b - W_L = 0 \\implies R_{Ay} + 360 - 120 - 210 = 0 \\implies R_{Ay} = -30\\text{ N}$$',
      'Tanda negatif menunjukkan $R_{Ay}$ berarah **ke bawah** sebesar $30\\text{ N}$ (engsel menahan lengan agar ujung kiri tidak terangkat akibat $T_y > W_b + W_L$).',
      '5. Analisis hubungan $T = \\frac{1080}{x_C \\sin 37^{\\circ}}$: jika $x_C$ diperkecil (mendekati engsel $A$), penyebut mengecil sehingga tegangan kabel $T$ membesar.',
    ],
    verifikasi: [
      'Cek torsi terhadap ujung kanan $B$: $R_{Ay}(4{,}0)\\text{ [CCW]} + W_b(2{,}0)\\text{ [CCW]} - T_y(1{,}0)\\text{ [CW]} = 30(4) + 120(2) - 360(1) = 120 + 240 - 360 = 0$.',
      'Cek $\\Sigma F_x = 480 - 480 = 0$ dan $\\Sigma F_y = 360 - 30 - 120 - 210 = 0$. Semuanya terpenuhi.',
    ],
    kesimpulan:
      'Pernyataan **A**, **C**, dan **D** benar. Pernyataan **B** salah karena $R_{Ay}$ berarah ke **bawah** (bukan ke atas), dan pernyataan **E** salah karena $T_y = 360\\text{ N} \\neq 330\\text{ N}$. Kunci jawaban: **A, C, D**.',
  },
  4: {
    identifikasiMasalah:
      'Sebuah tangga homogen tanpa beban tambahan bersandar pada dinding vertikal licin dan lantai horizontal kasar. Karena dinding licin, dinding hanya memberi gaya normal horizontal $N_D$, sedangkan lantai kasar memberi gaya normal vertikal $N_L$ dan gaya gesek statis $f_s$ yang mencegah kaki tangga tergelincir menjauhi dinding.',
    diketahui: [
      'Panjang tangga homogen: $L = 5{,}0\\text{ m}$ (pusat massa di $L/2 = 2{,}5\\text{ m}$)',
      'Massa tangga: $m = 24\\text{ kg} \\implies W = 240\\text{ N}$',
      'Sudut terhadap lantai: $\\theta = 53^{\\circ}$ ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$)',
      'Dinding vertikal licin ($f_{s,\\text{dinding}} = 0$), lantai horizontal kasar',
    ],
    ditanyakan:
      'Evaluasi pernyataan A–E mengenai $N_L$, $\\tau_W$, $N_D$, $f_s$, $\\mu_{s,\\min}$, serta ketergantungannya terhadap sudut $\\theta$.',
    landasanTeori: [
      'Kesetimbangan translasi: $\\Sigma F_y = 0 \\implies N_L = W$ dan $\\Sigma F_x = 0 \\implies f_s = N_D$.',
      'Kesetimbangan rotasi terhadap titik kontak lantai $A$: lengan momen gaya berat $W$ adalah $(L/2)\\cos\\theta$, sedangkan lengan momen gaya normal dinding $N_D$ adalah $L\\sin\\theta$.',
      'Syarat tidak tergelincir: $f_s \\le f_{s,\\max} = \\mu_s N_L$, sehingga koefisien gesek statis minimum adalah $\\mu_{s,\\min} = \\frac{f_s}{N_L} = \\frac{1}{2\\tan\\theta}$.',
    ],
    fbdSummary:
      'Diagram benda bebas batang tangga terisolasi menampilkan empat gaya eksternal: $N_L$ ke atas di kaki tangga $A$, $f_s$ horizontal menuju dinding di kaki $A$, $W$ vertikal ke bawah di pusat massa ($L/2$), dan $N_D$ horizontal menjauhi dinding di ujung atas $B$.',
    fbdComponents: [
      '$N_L = 240\\text{ N}$ vertikal ke atas di titik $A$',
      '$f_s = 90\\text{ N}$ horizontal menuju dinding di titik $A$',
      '$W = 240\\text{ N}$ vertikal ke bawah di titik tengah tangga ($2{,}5\\text{ m}$ dari $A$)',
      '$N_D = 90\\text{ N}$ horizontal menjauhi dinding di titik $B$ ($5{,}0\\text{ m}$ dari $A$)',
    ],
    penyelesaianMatematis: [
      '1. Kesetimbangan translasi vertikal:',
      '$$\\Sigma F_y = 0 \\implies N_L - W = 0 \\implies N_L = 240\\text{ N}$$',
      '2. Hitung momen gaya berat terhadap titik kontak lantai $A$:',
      '$$\\tau_W = W \\cdot \\left(\\frac{L}{2}\\cos 53^{\\circ}\\right) = 240 \\cdot (2{,}5 \\times 0{,}6) = 240 \\times 1{,}5 = 360\\text{ N}\\cdot\\text{m}$$',
      '3. Kesetimbangan rotasi terhadap titik $A$ ($\\Sigma \\tau_A = 0$):',
      '$$N_D \\cdot (L \\sin 53^{\\circ}) = \\tau_W \\implies N_D (5{,}0 \\times 0{,}8) = 360$$',
      '$$4{,}0 N_D = 360 \\implies N_D = 90\\text{ N}$$',
      '4. Kesetimbangan translasi horizontal ($\\Sigma F_x = 0$):',
      '$$f_s - N_D = 0 \\implies f_s = 90\\text{ N}$$',
      '5. Koefisien gesekan statis minimum:',
      '$$\\mu_{s,\\min} = \\frac{f_s}{N_L} = \\frac{90}{240} = \\frac{3}{8} = 0{,}375$$',
      '6. Analisis konseptual perubahan sudut: $\\mu_{s,\\min} = \\frac{1}{2\\tan\\theta}$. Jika $\\theta$ diperkecil, $\\tan\\theta$ mengecil sehingga $\\mu_{s,\\min}$ justru semakin **besar** (tangga lebih mudah tergelincir saat lebih landai).',
    ],
    verifikasi: [
      'Verifikasi rumus umum: $\\mu_{s,\\min} = \\frac{1}{2\\tan 53^{\\circ}} = \\frac{1}{2(4/3)} = \\frac{3}{8} = 0{,}375$. Cocok.',
      'Semua gaya memenuhi $\\Sigma F_x = 0$, $\\Sigma F_y = 0$, dan $\\Sigma \\tau_A = 0$.',
    ],
    kesimpulan:
      'Pernyataan **A**, **C**, dan **D** benar. Pernyataan **B** salah karena momen berat adalah $360\\text{ N}\\cdot\\text{m}$ (bukan $480\\text{ N}\\cdot\\text{m}$), dan pernyataan **E** salah karena memperkecil $\\theta$ menaikkan $\\mu_{s,\\min}$. Kunci jawaban: **A, C, D**.',
  },
  5: {
    identifikasiMasalah:
      'Sistem tangga homogen bersandar pada dinding vertikal licin dan lantai horizontal kasar sambil dinaiki seorang anak yang berhenti diam pada posisi tertentu sepanjang tangga. Kita menguji empat besaran utama: gaya normal lantai, gaya normal dinding, gaya gesek statis, dan koefisien gesekan statis minimum.',
    diketahui: [
      'Panjang tangga: $L = 5{,}0\\text{ m}$, massa tangga $m_t = 20\\text{ kg} \\implies W_t = 200\\text{ N}$ di $2{,}5\\text{ m}$ dari $A$',
      'Massa anak: $m_a = 30\\text{ kg} \\implies W_a = 300\\text{ N}$ di posisi $d = 4{,}0\\text{ m}$ dari $A$',
      'Sudut kemiringan tangga: $\\theta = 53^{\\circ}$ ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$)',
      'Dinding vertikal licin, lantai horizontal kasar',
    ],
    ditanyakan:
      'Status kebenaran 4 pernyataan terkait $N_L$, $N_D$, $f_s$, dan $\\mu_{s,\\min}$.',
    landasanTeori: [
      'Pada kesetimbangan statis tangga + anak, beban anak menyumbang gaya ke bawah tambahan pada $\\Sigma F_y = 0$ dan momen gaya tambahan pada $\\Sigma \\tau_A = 0$.',
      'Karena anak tidak tergelincir pada tangga, sistem tangga dan anak dapat dianalisis sebagai satu benda tegar komposit yang menerima lima gaya eksternal.',
      'Arah gaya gesek statis $f_s$ selalu melawan kecenderungan kaki tangga untuk bergeser menjauhi dinding, sehingga $f_s$ berarah horizontal menuju dinding.',
    ],
    fbdSummary:
      'Diagram benda bebas sistem komposit (tangga + anak) menampilkan lima gaya eksternal: $N_L$ ke atas dan $f_s$ menuju dinding di kaki $A$, $W_t$ ke bawah di pusat massa ($2{,}5\\text{ m}$), $W_a$ ke bawah di posisi anak ($4{,}0\\text{ m}$), serta $N_D$ horizontal menjauhi dinding di ujung atas $B$.',
    fbdComponents: [
      '$N_L = 500\\text{ N}$ ke atas di titik $A$',
      '$f_s = 255\\text{ N}$ ke kanan (menuju dinding) di titik $A$',
      '$W_t = 200\\text{ N}$ ke bawah di $2{,}5\\text{ m}$ dari $A$',
      '$W_a = 300\\text{ N}$ ke bawah di $4{,}0\\text{ m}$ dari $A$',
      '$N_D = 255\\text{ N}$ ke kiri (menjauhi dinding) di ujung atas $B$',
    ],
    penyelesaianMatematis: [
      '1. Gaya normal lantai ($\\Sigma F_y = 0$):',
      '$$N_L = W_t + W_a = 200 + 300 = 500\\text{ N}$$',
      '2. Gaya normal dinding ($\\Sigma \\tau_A = 0$):',
      '$$N_D (L \\sin 53^{\\circ}) = W_t (2{,}5 \\cos 53^{\\circ}) + W_a (4{,}0 \\cos 53^{\\circ})$$',
      '$$N_D (5{,}0 \\times 0{,}8) = 200(2{,}5 \\times 0{,}6) + 300(4{,}0 \\times 0{,}6)$$',
      '$$4{,}0 N_D = 200(1{,}5) + 300(2{,}4) = 300 + 720 = 1020$$',
      '$$N_D = \\frac{1020}{4{,}0} = 255\\text{ N}$$',
      '3. Gaya gesek statis pada dasar tangga ($\\Sigma F_x = 0$):',
      '$$f_s = N_D = 255\\text{ N (berarah horizontal menuju dinding)}$$',
      '4. Koefisien gesekan statis minimum:',
      '$$\\mu_{s,\\min} = \\frac{f_s}{N_L} = \\frac{255}{500} = 0{,}51$$',
    ],
    verifikasi: [
      'Cek momen terhadap titik puncak $B$: $\\Sigma \\tau_B = N_L(3{,}0) - f_s(4{,}0) - W_t(1{,}5) - W_a(0{,}6) = 500(3{,}0) - 255(4{,}0) - 200(1{,}5) - 300(0{,}6) = 1500 - 1020 - 300 - 180 = 0$. Terbukti nol.',
    ],
    kesimpulan:
      'Pernyataan 1 **BENAR** ($N_L = 500\\text{ N}$). Pernyataan 2 **SALAH** ($N_D = 255\\text{ N}$, bukan $180\\text{ N}$). Pernyataan 3 **BENAR** ($f_s = 255\\text{ N}$ menuju dinding). Pernyataan 4 **SALAH** ($\\mu_{s,\\min} = 0{,}51$, bukan $0{,}36$).',
  },
  6: {
    identifikasiMasalah:
      'Batang logam homogen $AD$ berengsel di ujung kiri $A$ berada dalam kesetimbangan rotasi mendatar akibat gaya beratnya sendiri serta tiga gaya luar, dua di antaranya membentuk sudut miring terhadap sumbu batang.',
    diketahui: [
      'Panjang batang homogen $AD$: $L = 4{,}0\\text{ m}$, massa $m = 6\\text{ kg} \\implies W = 60\\text{ N}$ di $x_{\\text{pm}} = 2{,}0\\text{ m}$',
      'Di titik $B$ ($x_1 = 1{,}0\\text{ m}$): $F_1 = 50\\text{ N}$, sudut $53^{\\circ}$ ke kanan-bawah',
      'Di titik $C$ ($x_2 = 2{,}5\\text{ m}$): $F_2$ (dicari), sudut $37^{\\circ}$ ke kanan-atas',
      'Di titik $D$ ($x_3 = 4{,}0\\text{ m}$): $F_3 = 20\\text{ N}$ vertikal ke bawah',
    ],
    ditanyakan: 'Besar gaya $F_2$ dalam satuan Newton ($\\text{N}$).',
    landasanTeori: [
      'Karena batang bertumpu pada engsel tetap $A$, syarat kesetimbangan rotasi $\\Sigma \\tau_A = 0$ langsung menentukan besar gaya $F_2$ tanpa dipengaruhi gaya reaksi engsel $R_{Ax}$ dan $R_{Ay}$ (lengan momen keduanya nol).',
      'Untuk gaya miring, hanya komponen tegak lurus batang ($F_{\\perp} = F\\sin\\theta$) yang menimbulkan torsi; komponen sejajar batang ($F\\cos\\theta$) garis kerjanya melewati engsel $A$.',
    ],
    fbdSummary:
      'Diagram benda bebas batang AD menampilkan gaya reaksi engsel $R_{Ax}$ dan $R_{Ay}$ di $A$, gaya miring $F_1$ (dan komponen tegak lurusnya $F_{1y}$) di $B$, berat $W$ di titik tengah, gaya miring $F_2$ (dengan komponen $F_{2y}$) di $C$, serta $F_3$ ke bawah di ujung $D$.',
    fbdComponents: [
      'Reaksi engsel $R_{Ax} = 158\\text{ N}$ ke kiri dan $R_{Ay} = 24\\text{ N}$ ke atas di $A$',
      '$F_{1y} = 50\\sin 53^{\\circ} = 40\\text{ N}$ ke bawah di $1{,}0\\text{ m}$ dari $A$',
      '$W = 60\\text{ N}$ ke bawah di $2{,}0\\text{ m}$ dari $A$',
      '$F_{2y} = F_2\\sin 37^{\\circ} = 0{,}6 F_2$ ke atas di $2{,}5\\text{ m}$ dari $A$',
      '$F_3 = 20\\text{ N}$ ke bawah di $4{,}0\\text{ m}$ dari $A$',
    ],
    penyelesaianMatematis: [
      '1. Tentukan komponen tegak lurus batang dari gaya miring $F_1$ dan $F_2$:',
      '$$F_{1\\perp} = F_1 \\sin 53^{\\circ} = 50 \\times 0{,}8 = 40\\text{ N (ke bawah)}$$',
      '$$F_{2\\perp} = F_2 \\sin 37^{\\circ} = 0{,}6 F_2\\text{ (ke atas)}$$',
      '2. Hitung total torsi searah jarum jam (CW) oleh gaya-gaya ke bawah terhadap engsel $A$:',
      '$$\\tau_{\\text{CW}} = F_{1\\perp}(1{,}0) + W(2{,}0) + F_3(4{,}0)$$',
      '$$\\tau_{\\text{CW}} = 40(1{,}0) + 60(2{,}0) + 20(4{,}0) = 40 + 120 + 80 = 240\\text{ N}\\cdot\\text{m}$$',
      '3. Terapkan kesetimbangan rotasi $\\Sigma \\tau_A = 0$ (torsi CCW dari $F_2$ menyeimbangkan $\\tau_{\\text{CW}}$):',
      '$$(F_{2\\perp})(2{,}5) = 240 \\implies (0{,}6 F_2)(2{,}5) = 240$$',
      '$$1{,}5 F_2 = 240 \\implies F_2 = \\frac{240}{1{,}5} = 160\\text{ N}$$',
    ],
    verifikasi: [
      'Substitusi balik: $F_{2\\perp} = 160 \\times 0{,}6 = 96\\text{ N}$, torsi CCW $= 96 \\times 2{,}5 = 240\\text{ N}\\cdot\\text{m} = \\tau_{\\text{CW}}$.',
      'Satuan torsi $\\text{N}\\cdot\\text{m}$ dibagi jarak $\\text{m}$ menghasilkan $\\text{N}$.',
    ],
    kesimpulan: 'Besar gaya $F_2$ yang diperlukan agar batang setimbang horizontal adalah **160 N**.',
  },
  7: {
    identifikasiMasalah:
      'Batang homogen $PQ$ berengsel di $P$ mendapat beban berat batang sendiri, gaya vertikal $F_1$, gaya miring $F_2$ di ujung $Q$, dan gaya vertikal $F_3$ yang titik tangkapnya ($x$) harus ditentukan agar kesetimbangan rotasi terpenuhi.',
    diketahui: [
      'Panjang batang homogen $PQ$: $L = 6{,}0\\text{ m}$, massa $m = 12\\text{ kg} \\implies W = 120\\text{ N}$ di $x_{\\text{pm}} = 3{,}0\\text{ m}$',
      'Gaya $F_1 = 60\\text{ N}$ ke bawah pada $x_1 = 2{,}0\\text{ m}$ dari $P$',
      'Gaya $F_2 = 50\\text{ N}$ miring $53^{\\circ}$ ke kanan-atas di ujung $Q$ ($x_2 = 6{,}0\\text{ m}$)',
      'Gaya $F_3 = 50\\text{ N}$ vertikal ke atas pada jarak $x$ dari $P$',
    ],
    ditanyakan: 'Jarak titik kerja gaya $F_3$ diukur dari ujung kiri $P$ ($x$ dalam satuan $\\text{m}$).',
    landasanTeori: [
      'Kesetimbangan rotasi terhadap engsel $P$ mensyaratkan jumlah momen searah jarum jam sama dengan jumlah momen berlawanan jarum jam ($\\Sigma \\tau_P = 0$).',
      'Komponen vertikal gaya miring $F_2$ adalah $F_{2y} = F_2 \\sin 53^{\\circ}$, sedangkan komponen horizontalnya $F_{2x} = F_2 \\cos 53^{\\circ}$ berpotongan dengan poros $P$ sehingga torsinya nol.',
    ],
    fbdSummary:
      'Diagram benda bebas batang PQ menampilkan reaksi engsel $R_{Px}$ dan $R_{Py}$ di $P$, gaya $F_1$ ke bawah di $2{,}0\\text{ m}$, gaya berat $W$ ke bawah di $3{,}0\\text{ m}$, gaya $F_3$ ke atas di posisi $x$, dan gaya miring $F_2$ di ujung $Q$ ($6{,}0\\text{ m}$).',
    fbdComponents: [
      'Reaksi engsel $R_{Px} = 30\\text{ N}$ ke kiri dan $R_{Py} = 90\\text{ N}$ ke atas di $P$',
      '$F_1 = 60\\text{ N}$ ke bawah di $2{,}0\\text{ m}$ dari $P$',
      '$W = 120\\text{ N}$ ke bawah di $3{,}0\\text{ m}$ dari $P$',
      '$F_3 = 50\\text{ N}$ ke atas di jarak $x = 4{,}8\\text{ m}$ dari $P$',
      '$F_{2y} = 50\\sin 53^{\\circ} = 40\\text{ N}$ ke atas di $6{,}0\\text{ m}$ dari $P$',
    ],
    penyelesaianMatematis: [
      '1. Uraikan komponen vertikal gaya $F_2$:',
      '$$F_{2y} = F_2 \\sin 53^{\\circ} = 50 \\times 0{,}8 = 40\\text{ N (ke atas)}$$',
      '2. Hitung total torsi searah jarum jam (CW) terhadap poros $P$:',
      '$$\\tau_{\\text{CW}} = F_1(2{,}0) + W(3{,}0) = 60(2{,}0) + 120(3{,}0) = 120 + 360 = 480\\text{ N}\\cdot\\text{m}$$',
      '3. Hitung total torsi berlawanan jarum jam (CCW) dari $F_{2y}$ dan $F_3$ terhadap poros $P$:',
      '$$\\tau_{\\text{CCW}} = F_{2y}(6{,}0) + F_3(x) = 40(6{,}0) + 50 x = 240 + 50 x$$',
      '4. Terapkan $\\Sigma \\tau_P = 0 \\implies \\tau_{\\text{CCW}} = \\tau_{\\text{CW}}$:',
      '$$240 + 50 x = 480 \\implies 50 x = 240 \\implies x = \\frac{240}{50} = 4{,}8\\text{ m}$$',
    ],
    verifikasi: [
      'Cek posisi: $0 < 4{,}8\\text{ m} < 6{,}0\\text{ m}$, berarti titik $R$ berada tepat di atas batang (di antara $W$ dan $Q$).',
      'Cek momen total terhadap $P$: $40(6) + 50(4{,}8) - 60(2) - 120(3) = 240 + 240 - 120 - 360 = 0$.',
    ],
    kesimpulan: 'Gaya $F_3$ harus bekerja pada jarak **4.8 m** dari ujung kiri $P$.',
  },
  8: {
    identifikasiMasalah:
      'Seorang pekerja menaiki tangga bersandar pada dinding licin dan lantai kasar dengan koefisien gesekan statis tertentu. Semakin tinggi pekerja naik, momen gaya berat terhadap dasar tangga meningkat sehingga gaya normal dinding $N_D$ dan gaya gesek statis $f_s$ ikut meningkat hingga mencapai batas maksimum $f_{s,\\max} = \\mu_s N_L$.',
    diketahui: [
      'Panjang tangga: $L = 5{,}0\\text{ m}$, massa tangga $m_t = 20\\text{ kg} \\implies W_t = 200\\text{ N}$ di $2{,}5\\text{ m}$',
      'Massa pekerja: $m_p = 40\\text{ kg} \\implies W_p = 400\\text{ N}$ di posisi $d_{\\max}$ dari dasar $A$',
      'Sudut tangga terhadap lantai: $\\theta = 53^{\\circ}$ ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$)',
      'Koefisien gesekan statis lantai: $\\mu_s = 0{,}5$',
    ],
    ditanyakan:
      'Jarak maksimum $d_{\\max}$ sepanjang tangga dari dasar $A$ sebelum tangga tepat tergelincir.',
    landasanTeori: [
      'Kondisi tepat akan tergelincir terjadi saat gaya gesek statis mencapai nilai maksimumnya: $f_s = f_{s,\\max} = \\mu_s N_L$.',
      'Dari kesetimbangan translasi vertikal $\\Sigma F_y = 0$, $N_L = W_t + W_p$ tidak bergantung pada posisi pekerja sepanjang tangga.',
      'Dari kesetimbangan translasi horizontal $\\Sigma F_x = 0$, $N_D = f_{s,\\max}$, kemudian $\\Sigma \\tau_A = 0$ mengaitkan $N_D$ dengan posisi kritis $d_{\\max}$.',
    ],
    fbdSummary:
      'Diagram benda bebas sistem tangga dan pekerja pada kondisi ambang tergelincir menampilkan $N_L$ dan $f_{s,\\max}$ di dasar $A$, $W_t$ di titik tengah ($2{,}5\\text{ m}$), $W_p$ di posisi $d_{\\max}$, serta $N_D$ di puncak tangga $B$.',
    fbdComponents: [
      '$N_L = 600\\text{ N}$ vertikal ke atas di $A$',
      '$f_{s,\\max} = 300\\text{ N}$ horizontal menuju dinding di $A$',
      '$W_t = 200\\text{ N}$ ke bawah di $2{,}5\\text{ m}$ dari $A$',
      '$W_p = 400\\text{ N}$ ke bawah di $d_{\\max} = 3{,}75\\text{ m}$ dari $A$',
      '$N_D = 300\\text{ N}$ horizontal menjauhi dinding di $B$',
    ],
    penyelesaianMatematis: [
      '1. Hitung gaya normal lantai dari $\\Sigma F_y = 0$:',
      '$$N_L = W_t + W_p = 200 + 400 = 600\\text{ N}$$',
      '2. Hitung gaya gesek statis maksimum dan gaya normal dinding saat tepat akan tergelincir ($\\Sigma F_x = 0$):',
      '$$f_{s,\\max} = \\mu_s N_L = 0{,}5 \\times 600 = 300\\text{ N}$$',
      '$$N_D = f_{s,\\max} = 300\\text{ N}$$',
      '3. Terapkan kesetimbangan rotasi terhadap titik dasar $A$ ($\\Sigma \\tau_A = 0$):',
      '$$N_D (L \\sin 53^{\\circ}) = W_t (2{,}5 \\cos 53^{\\circ}) + W_p (d_{\\max} \\cos 53^{\\circ})$$',
      '$$300 (5{,}0 \\times 0{,}8) = 200(2{,}5 \\times 0{,}6) + 400(d_{\\max} \\times 0{,}6)$$',
      '$$300(4{,}0) = 200(1{,}5) + 240 d_{\\max}$$',
      '$$1200 = 300 + 240 d_{\\max} \\implies 240 d_{\\max} = 900 \\implies d_{\\max} = \\frac{900}{240} = 3{,}75\\text{ m}$$',
    ],
    verifikasi: [
      'Cek batas fisik: $0 < 3{,}75\\text{ m} < 5{,}0\\text{ m}$, posisi masih berada di atas tangga sebelum puncak.',
      'Jika $d > 3{,}75\\text{ m}$, dibutuhkan $N_D > 300\\text{ N} = f_{s,\\max}$ sehingga tangga pasti tergelincir.',
    ],
    kesimpulan:
      'Jarak maksimum yang dapat ditempuh pekerja sepanjang tangga dari dasar $A$ adalah **3.75 m**.',
  },
  9: {
    identifikasiMasalah:
      'Sistem gabungan antara benda tegar (batang horizontal berengsel $AB$) dan katrol tetap licin tak bermassa yang menghubungkan tali penahan batang dengan beban gantung penyeimbang $M$.',
    diketahui: [
      'Panjang batang homogen $AB$: $L = 4{,}0\\text{ m}$, massa $m_b = 8\\text{ kg} \\implies W_b = 80\\text{ N}$ di $2{,}0\\text{ m}$',
      'Beban di ujung kanan $B$: $m_L = 11\\text{ kg} \\implies W_L = 110\\text{ N}$ di $4{,}0\\text{ m}$',
      'Titik ikat tali $C$: $x_C = 3{,}0\\text{ m}$ dari engsel $A$, sudut tali $\\theta = 30^{\\circ}$ ($\\sin 30^{\\circ} = 0{,}5$)',
      'Katrol tetap licin dan massa tali diabaikan',
    ],
    ditanyakan: 'Massa beban penyeimbang $M$ dalam satuan kilogram ($\\text{kg}$).',
    landasanTeori: [
      'Analisis dilakukan pada dua subsistem terpisah: (1) beban penyeimbang $M$ dan (2) batang homogen $AB$.',
      'Pada beban $M$ yang diam, kesetimbangan translasi vertikal memberikan $T = M g$. Karena katrol licin dan bermassa diabaikan, besar tegangan tali pada segmen miring yang menarik titik $C$ sama besar dengan $T$.',
      'Pada batang $AB$, kesetimbangan rotasi terhadap engsel $A$ ($\\Sigma \\tau_A = 0$) menghubungkan komponen vertikal tegangan tali $T\\sin 30^{\\circ}$ dengan berat batang dan berat beban $m_L$.',
    ],
    fbdSummary:
      'Dibuat dua FBD terpisah: (a) FBD beban $M$ dengan gaya berat $Mg$ ke bawah dan tegangan tali $T$ ke atas; (b) FBD batang $AB$ dengan reaksi engsel $R_{Ax}, R_{Ay}$ di $A$, berat $W_b$ di tengah, tegangan $T$ bersudut $30^{\\circ}$ di $C$, dan berat $W_L$ di ujung $B$.',
    fbdComponents: [
      'FBD Beban $M$: $T = 400\\text{ N}$ ke atas, $W_M = Mg$ ke bawah',
      'FBD Batang $AB$: $R_{Ax} = 200\\sqrt{3}\\text{ N}$ ke kanan, $R_{Ay} = 10\\text{ N}$ ke bawah di $A$',
      '$W_b = 80\\text{ N}$ ke bawah di $2{,}0\\text{ m}$, $T = 400\\text{ N}$ miring $30^{\\circ}$ di $3{,}0\\text{ m}$, $W_L = 110\\text{ N}$ ke bawah di $4{,}0\\text{ m}$',
    ],
    penyelesaianMatematis: [
      '1. Tinjau kesetimbangan rotasi batang $AB$ terhadap engsel $A$ ($\\Sigma \\tau_A = 0$):',
      '$$(T \\sin 30^{\\circ}) \\cdot (3{,}0) = W_b (2{,}0) + W_L (4{,}0)$$',
      '$$T (0{,}5)(3{,}0) = 80(2{,}0) + 110(4{,}0)$$',
      '$$1{,}5 T = 160 + 440 = 600\\text{ N}\\cdot\\text{m}$$',
      '$$T = \\frac{600}{1{,}5} = 400\\text{ N}$$',
      '2. Tinjau kesetimbangan translasi beban gantung $M$ (katrol licin meneruskan tegangan $T$ yang sama):',
      '$$\\Sigma F_y = 0 \\implies T - M g = 0 \\implies M = \\frac{T}{g} = \\frac{400}{10} = 40\\text{ kg}$$',
    ],
    verifikasi: [
      'Cek torsi ulang: $T_y = 400 \\times 0{,}5 = 200\\text{ N}$, torsi di $C$: $200 \\times 3{,}0 = 600\\text{ N}\\cdot\\text{m}$, tepat menyeimbangkan $160 + 440 = 600\\text{ N}\\cdot\\text{m}$.',
      'Satuan: $\\text{N} / (\\text{m/s}^2) = \\text{kg}$.',
    ],
    kesimpulan: 'Massa beban penyeimbang $M$ yang diperlukan agar sistem setimbang adalah **40 kg**.',
  },
  10: {
    identifikasiMasalah:
      'Lengan derek miring homogen $AB$ berengsel di dasar dinding $A$ ditahan oleh kabel baja horizontal di titik $C$ sambil menahan beban gantung di ujung $B$. Diperlukan tiga tahap terpadu: menentukan tegangan kabel dari $\\Sigma \\tau_A = 0$, menentukan komponen reaksi engsel $R_{Ax}$ dan $R_{Ay}$ dari $\\Sigma F_x = 0$ dan $\\Sigma F_y = 0$, lalu menghitung besar gaya reaksi resultan $R_A$.',
    diketahui: [
      'Panjang lengan derek homogen $AB$: $L = 5{,}0\\text{ m}$, massa $m_b = 16\\text{ kg} \\implies W_b = 160\\text{ N}$ di $2{,}5\\text{ m}$',
      'Sudut elevasi lengan terhadap horizontal: $\\theta = 53^{\\circ}$ ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$)',
      'Massa beban di ujung $B$: $m_L = 24\\text{ kg} \\implies W_L = 240\\text{ N}$ di $5{,}0\\text{ m}$',
      'Kabel horizontal terpasang di titik $C$ berjarak $x_C = 4{,}0\\text{ m}$ dari engsel $A$',
    ],
    ditanyakan: 'Besar gaya reaksi resultan pada engsel $A$ ($R_A$ dalam satuan $\\text{N}$).',
    landasanTeori: [
      'Pada lengan miring bersudut $\\theta$ terhadap horizontal: lengan momen gaya berat vertikal adalah $r\\cos\\theta$, sedangkan lengan momen gaya kabel horizontal adalah $r\\sin\\theta$.',
      'Engsel tetap dapat memberi gaya reaksi ke segala arah yang diwakili komponen $R_{Ax}$ dan $R_{Ay}$, dengan besar resultan $R_A = \\sqrt{R_{Ax}^2 + R_{Ay}^2}$.',
    ],
    fbdSummary:
      'Diagram benda bebas lengan miring AB terisolasi dari dinding dan kabel menampilkan komponen reaksi engsel $R_{Ax}$ (ke kanan) dan $R_{Ay}$ (ke atas) di $A$, berat lengan $W_b$ vertikal ke bawah di $2{,}5\\text{ m}$, gaya tegangan kabel horizontal $T$ ke kiri di $C$ ($4{,}0\\text{ m}$), serta gaya berat beban $W_L$ vertikal ke bawah di $B$ ($5{,}0\\text{ m}$).',
    fbdComponents: [
      '$R_{Ax} = 300\\text{ N}$ horizontal ke kanan dan $R_{Ay} = 400\\text{ N}$ vertikal ke atas di engsel $A$',
      '$W_b = 160\\text{ N}$ vertikal ke bawah di titik tengah ($2{,}5\\text{ m}$ dari $A$)',
      '$T = 300\\text{ N}$ horizontal ke kiri di titik $C$ ($4{,}0\\text{ m}$ dari $A$)',
      '$W_L = 240\\text{ N}$ vertikal ke bawah di ujung $B$ ($5{,}0\\text{ m}$ dari $A$)',
    ],
    penyelesaianMatematis: [
      '1. Tahap 1 — Tentukan tegangan kabel horizontal $T$ dari $\\Sigma \\tau_A = 0$:',
      '$$T (4{,}0 \\sin 53^{\\circ}) = W_b (2{,}5 \\cos 53^{\\circ}) + W_L (5{,}0 \\cos 53^{\\circ})$$',
      '$$T (4{,}0 \\times 0{,}8) = 160(2{,}5 \\times 0{,}6) + 240(5{,}0 \\times 0{,}6)$$',
      '$$3{,}2 T = 160(1{,}5) + 240(3{,}0) = 240 + 720 = 960$$',
      '$$T = \\frac{960}{3{,}2} = 300\\text{ N}$$',
      '2. Tahap 2 — Tentukan komponen gaya reaksi engsel $R_{Ax}$ dan $R_{Ay}$ dari kesetimbangan translasi:',
      '$$\\Sigma F_x = 0 \\implies R_{Ax} - T = 0 \\implies R_{Ax} = 300\\text{ N (ke kanan)}$$',
      '$$\\Sigma F_y = 0 \\implies R_{Ay} - W_b - W_L = 0 \\implies R_{Ay} = 160 + 240 = 400\\text{ N (ke atas)}$$',
      '3. Tahap 3 — Hitung besar gaya reaksi resultan engsel $A$:',
      '$$R_A = \\sqrt{R_{Ax}^2 + R_{Ay}^2} = \\sqrt{300^2 + 400^2} = \\sqrt{90000 + 160000} = \\sqrt{250000} = 500\\text{ N}$$',
    ],
    verifikasi: [
      'Tripel Pythagoras 3-4-5 ($300, 400, 500$) tepat terpenuhi.',
      'Cek momen terhadap titik puncak $B$: $\\Sigma \\tau_B = R_{Ay}(3{,}0) - R_{Ax}(4{,}0) + T(0{,}8) - W_b(1{,}5) = 400(3) - 300(4) + 300(0{,}8) - 160(1{,}5) = 1200 - 1200 + 240 - 240 = 0$. Terbukti nol.',
    ],
    kesimpulan: 'Besar gaya reaksi resultan pada engsel $A$ adalah **500 N**.',
  },
};

export const TEACHER_QUESTIONS_FULL: TeacherQuestionFull[] = STUDENT_QUESTIONS.map(
  (q) => {
    const rule = GRADING_RULES.find((r) => r.questionId === q.id)!;
    return {
      ...q,
      correctAnswerDisplay: rule.correctAnswerDisplay,
      explanation: EXPLANATIONS[q.id],
    };
  }
);
