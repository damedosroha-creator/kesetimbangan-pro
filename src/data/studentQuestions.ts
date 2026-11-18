import type { PublicQuestion } from '../types/assessment';

export const ASSESSMENT_META = {
  appName: 'PHYSICS ASSESSMENT – DYNAMICS OF ROTATION',
  teacherName: 'MR JO',
  subject: 'Fisika',
  topic: 'Dinamika Rotasi – Kesetimbangan Benda Tegar',
  level: 'SMA',
  totalQuestions: 10,
  maxScore: 100,
  gravityNote: 'g = 10\\text{ m/s}^2',
};

export const STUDENT_QUESTIONS: PublicQuestion[] = [
  {
    id: 1,
    type: 'single_choice',
    typeLabel: 'Pilihan Ganda (10 Poin)',
    maxPoints: 10,
    title: 'Kesetimbangan Jungkat-Jungkit Asimetris',
    prompt:
      'Sebuah papan jungkat-jungkit kayu homogen memiliki panjang total $L = 4{,}0\\text{ m}$ dan massa $m_{\\text{papan}} = 12\\text{ kg}$ ($g = 10\\text{ m/s}^2$). Titik tumpu $O$ dipasang pada jarak $2{,}5\\text{ m}$ dari ujung kiri $A$ (atau $1{,}5\\text{ m}$ dari ujung kanan $B$). Di ujung kiri $A$, duduk Andi yang bermassa $m_A = 20\\text{ kg}$. Di sebelah kanan titik tumpu $O$, duduk Budi bermassa $m_B = 44\\text{ kg}$ pada jarak $1{,}0\\text{ m}$ dari $O$. Agar sistem papan setimbang mendatar, sebuah balok tambahan $C$ bermassa $m_C = 10\\text{ kg}$ diletakkan di atas papan. Posisi balok $C$ terhadap titik tumpu $O$ dan besar gaya reaksi normal di titik tumpu $O$ ($N_O$) berturut-turut adalah $\\dots$',
    stimulusCaption:
      'Gambar 1. Skema konstruksi jungkat-jungkit homogen sepanjang 4,0 m dengan letak titik tumpu O asimetris.',
    stimulusImageAlt:
      'Diagram teknik jungkat-jungkit homogen 4,0 meter dengan titik tumpu O di 2,5 meter dari ujung kiri A, Andi di ujung A, dan Budi 1,0 meter di kanan O.',
    options: [
      {
        id: 'A',
        text: '$0{,}6\\text{ m}$ di sebelah kanan titik tumpu $O$ dengan gaya normal tumpuan $N_O = 740\\text{ N}$',
      },
      {
        id: 'B',
        text: '$1{,}2\\text{ m}$ di sebelah kiri titik tumpu $O$ dengan gaya normal tumpuan $N_O = 860\\text{ N}$',
      },
      {
        id: 'C',
        text: '$1{,}2\\text{ m}$ di sebelah kanan titik tumpu $O$ dengan gaya normal tumpuan $N_O = 860\\text{ N}$',
      },
      {
        id: 'D',
        text: '$1{,}2\\text{ m}$ di sebelah kanan titik tumpu $O$ dengan gaya normal tumpuan $N_O = 740\\text{ N}$',
      },
      {
        id: 'E',
        text: '$1{,}5\\text{ m}$ di sebelah kanan titik tumpu $O$ dengan gaya normal tumpuan $N_O = 860\\text{ N}$',
      },
    ],
  },
  {
    id: 2,
    type: 'single_choice',
    typeLabel: 'Pilihan Ganda (10 Poin)',
    maxPoints: 10,
    title: 'Balok Homogen dengan Dua Penyangga dan Dua Beban',
    prompt:
      'Sebuah balok baja homogen $PQ$ sepanjang $L = 6{,}0\\text{ m}$ bermassa $m_{\\text{balok}} = 30\\text{ kg}$ ($g = 10\\text{ m/s}^2$) diletakkan mendatar di atas dua penyangga. Penyangga $A$ berada pada jarak $1{,}0\\text{ m}$ dari ujung kiri $P$, sedangkan penyangga $B$ berada tepat di ujung kanan $Q$. Beban pertama $m_1 = 20\\text{ kg}$ diletakkan tepat di ujung kiri $P$, dan beban kedua $m_2 = 50\\text{ kg}$ diletakkan pada jarak $4{,}5\\text{ m}$ dari ujung kiri $P$. Besar gaya reaksi penyangga $A$ ($R_A$) dan penyangga $B$ ($R_B$) serta perbandingan keduanya dalam keadaan setimbang adalah $\\dots$',
    stimulusCaption:
      'Gambar 2. Balok homogen PQ (6,0 m) dengan penyangga A di x = 1,0 m, penyangga B di ujung Q, serta dua beban terpisah.',
    stimulusImageAlt:
      'Diagram balok homogen PQ sepanjang 6,0 meter ditumpu penyangga A pada 1,0 meter dari P dan penyangga B di ujung Q, dengan beban 20 kg di P dan 50 kg pada 4,5 meter dari P.',
    options: [
      {
        id: 'A',
        text: '$R_A = 500\\text{ N}$ dan $R_B = 500\\text{ N}$, kedua penyangga memikul beban sama besar',
      },
      {
        id: 'B',
        text: '$R_A = 570\\text{ N}$ dan $R_B = 430\\text{ N}$, sehingga $R_A > R_B$ dengan selisih $140\\text{ N}$',
      },
      {
        id: 'C',
        text: '$R_A = 430\\text{ N}$ dan $R_B = 570\\text{ N}$, sehingga $R_B > R_A$ dengan selisih $140\\text{ N}$',
      },
      {
        id: 'D',
        text: '$R_A = 530\\text{ N}$ dan $R_B = 470\\text{ N}$, sehingga $R_A > R_B$ dengan selisih $60\\text{ N}$',
      },
      {
        id: 'E',
        text: '$R_A = 540\\text{ N}$ dan $R_B = 460\\text{ N}$, sehingga $R_A > R_B$ dengan selisih $80\\text{ N}$',
      },
    ],
  },
  {
    id: 3,
    type: 'complex_choice',
    typeLabel: 'Pilihan Ganda Kompleks (10 Poin · Pilih lebih dari satu)',
    maxPoints: 10,
    title: 'Konstruksi Lengan Penyangga Lampu Lalu Lintas',
    prompt:
      'Sebuah lampu lalu lintas bermassa $m_L = 21\\text{ kg}$ digantung di ujung kanan $B$ sebuah lengan baja horizontal homogen $AB$ yang memiliki panjang $L = 4{,}0\\text{ m}$ dan massa $m_b = 12\\text{ kg}$ ($g = 10\\text{ m/s}^2$). Ujung $A$ dipasang pada tiang vertikal menggunakan engsel licin. Lengan ditahan oleh seutas kabel baja ringan yang diikatkan pada titik $C$ berjarak $3{,}0\\text{ m}$ dari engsel $A$ dan ditarik ke tiang vertikal dengan sudut $\\theta = 37^{\\circ}$ terhadap lengan $AB$ ($\\sin 37^{\\circ} = 0{,}6$; $\\cos 37^{\\circ} = 0{,}8$). Pilihlah SEMUA pernyataan yang benar mengenai kondisi kesetimbangan sistem tersebut:',
    stimulusCaption:
      'Gambar 3. Konstruksi lampu lalu lintas 21 kg pada lengan penyangga horizontal AB (4,0 m) dengan kabel penahan pada sudut 37°.',
    stimulusImageAlt:
      'Ilustrasi konstruksi tiang lampu lalu lintas: lengan horizontal AB 4,0 m berengsel di A, lampu 21 kg di B, kabel penahan di titik C 3,0 m dari A bersudut 37 derajat.',
    options: [
      {
        id: 'A',
        text: 'Besar tegangan kabel baja penahan adalah $600\\text{ N}$.',
      },
      {
        id: 'B',
        text: 'Komponen vertikal gaya reaksi engsel di $A$ bernilai $30\\text{ N}$ berarah ke atas.',
      },
      {
        id: 'C',
        text: 'Komponen horizontal gaya reaksi engsel di $A$ bernilai $480\\text{ N}$ berarah ke kanan (menjauhi tiang).',
      },
      {
        id: 'D',
        text: 'Jika titik ikat kabel $C$ digeser lebih dekat ke engsel $A$ dengan sudut $\\theta$ tetap $37^{\\circ}$, tegangan kabel $T$ yang dibutuhkan untuk menjaga kesetimbangan akan semakin besar.',
      },
      {
        id: 'E',
        text: 'Komponen vertikal tegangan kabel tepat sama besar dengan berat total lengan penyangga dan lampu lalu lintas ($330\\text{ N}$).',
      },
    ],
  },
  {
    id: 4,
    type: 'complex_choice',
    typeLabel: 'Pilihan Ganda Kompleks (10 Poin · Pilih lebih dari satu)',
    maxPoints: 10,
    title: 'Kesetimbangan Tangga Homogen Bersandar Tanpa Beban',
    prompt:
      'Sebuah tangga kayu homogen dengan panjang $L = 5{,}0\\text{ m}$ dan massa $m = 24\\text{ kg}$ ($g = 10\\text{ m/s}^2$) bersandar diam pada dinding vertikal yang licin dan bertumpu pada lantai horizontal yang kasar. Tangga membentuk sudut $\\theta = 53^{\\circ}$ terhadap lantai ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$). Pusat massa tangga berada di titik tengahnya. Pilihlah SEMUA pernyataan yang benar berdasarkan analisis kesetimbangan tangga:',
    stimulusCaption:
      'Gambar 4. Tangga homogen sepanjang 5,0 m bersandar pada dinding vertikal licin dengan kemiringan 53° terhadap lantai kasar.',
    stimulusImageAlt:
      'Diagram tangga homogen 5,0 meter bersandar pada dinding vertikal licin membentuk sudut 53 derajat terhadap lantai horizontal kasar.',
    options: [
      {
        id: 'A',
        text: 'Besar gaya normal lantai terhadap ujung bawah tangga adalah $240\\text{ N}$.',
      },
      {
        id: 'B',
        text: 'Besar momen gaya berat tangga terhadap titik kontak dasar tangga adalah $480\\text{ N}\\cdot\\text{m}$.',
      },
      {
        id: 'C',
        text: 'Besar gaya normal dinding licin dan gaya gesek statis pada dasar tangga masing-masing adalah $90\\text{ N}$.',
      },
      {
        id: 'D',
        text: 'Koefisien gesekan statis minimum antara kaki tangga dan lantai agar tangga tidak tergelincir adalah $0{,}375$.',
      },
      {
        id: 'E',
        text: 'Apabila sudut kemiringan $\\theta$ diperkecil (tangga dibuat lebih landai), koefisien gesekan statis minimum yang diperlukan agar tangga tidak tergelincir menjadi lebih kecil.',
      },
    ],
  },
  {
    id: 5,
    type: 'true_false_4',
    typeLabel: 'Benar / Salah — 4 Pernyataan (Maks 10, Min -4)',
    maxPoints: 10,
    title: 'Kesetimbangan Tangga Homogen Dinaiki Seorang Anak',
    prompt:
      'Sebuah tangga homogen dengan panjang $L = 5{,}0\\text{ m}$ dan massa $m_t = 20\\text{ kg}$ bersandar pada dinding vertikal licin dan bertumpu pada lantai horizontal kasar dengan sudut kemiringan $\\theta = 53^{\\circ}$ terhadap lantai ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$; $g = 10\\text{ m/s}^2$). Seorang anak bermassa $m_a = 30\\text{ kg}$ menaiki tangga tersebut dan berhenti diam pada jarak $d = 4{,}0\\text{ m}$ diukur sepanjang tangga dari titik kontak lantai $A$. Tentukan status BENAR atau SALAH untuk keempat pernyataan berikut (Benar: $+2{,}5$; Salah: $-1$; Kosong: $0$):',
    stimulusCaption:
      'Gambar 5. Sistem tangga 5,0 m bersudut 53° yang dinaiki anak bermassa 30 kg pada posisi d = 4,0 m dari dasar A.',
    stimulusImageAlt:
      'Diagram tangga homogen 5,0 meter bersudut 53 derajat dengan seorang anak berada pada jarak 4,0 meter sepanjang tangga dari dasar lantai kasar.',
    statements: [
      {
        id: 'S1',
        text: 'Besar gaya normal dari lantai horizontal terhadap dasar tangga adalah $500\\text{ N}$.',
      },
      {
        id: 'S2',
        text: 'Besar gaya normal dari dinding vertikal licin terhadap ujung atas tangga adalah $180\\text{ N}$.',
      },
      {
        id: 'S3',
        text: 'Besar gaya gesek statis yang bekerja pada dasar tangga adalah $255\\text{ N}$ dan berarah horizontal menuju ke dinding.',
      },
      {
        id: 'S4',
        text: 'Koefisien gesekan statis minimum antara kaki tangga dan lantai agar sistem tetap setimbang tidak tergelincir adalah $0{,}36$.',
      },
    ],
  },
  {
    id: 6,
    type: 'short_numeric',
    typeLabel: 'Isian Singkat Matematis (10 Poin)',
    maxPoints: 10,
    title: 'Kesetimbangan Batang dengan Gaya Miring Multikomponen',
    prompt:
      'Sebuah batang logam homogen $AD$ sepanjang $L = 4{,}0\\text{ m}$ dan bermassa $m = 6\\text{ kg}$ dipasang pada engsel tetap di ujung kiri $A$ sehingga batang setimbang mendatar ($g = 10\\text{ m/s}^2$). Pada jarak $1{,}0\\text{ m}$ dari $A$ (titik $B$), bekerja gaya $F_1 = 50\\text{ N}$ membentuk sudut $53^{\\circ}$ ke kanan-bawah terhadap sumbu batang. Di ujung kanan $D$ ($4{,}0\\text{ m}$ dari $A$), bekerja gaya $F_3 = 20\\text{ N}$ vertikal ke bawah. Pada jarak $2{,}5\\text{ m}$ dari $A$ (titik $C$), ditarik sebuah gaya $F_2$ yang membentuk sudut $37^{\\circ}$ ke kanan-atas terhadap sumbu batang ($\\sin 37^{\\circ} = 0{,}6$; $\\cos 37^{\\circ} = 0{,}8$; $\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$). Tentukan besar gaya $F_2$ yang diperlukan agar batang tepat setimbang horizontal!',
    stimulusCaption:
      'Gambar 6. Batang homogen AD (4,0 m) berengsel di A dengan gaya F1 di B, gaya F2 di C, dan gaya F3 di D.',
    stimulusImageAlt:
      'Diagram batang horizontal AD sepanjang 4,0 meter berengsel di A dengan gaya F1 miring ke bawah 53 derajat di 1,0 m, F2 miring ke atas 37 derajat di 2,5 m, dan F3 vertikal ke bawah di 4,0 m.',
    requiresTutorial: true,
    requiresUnit: true,
  },
  {
    id: 7,
    type: 'short_numeric',
    typeLabel: 'Isian Singkat Matematis (10 Poin)',
    maxPoints: 10,
    title: 'Menentukan Posisi Gaya Penyeimbang pada Batang Homogen',
    prompt:
      'Sebuah batang homogen $PQ$ sepanjang $L = 6{,}0\\text{ m}$ dan bermassa $m = 12\\text{ kg}$ ($g = 10\\text{ m/s}^2$) ditumpu pada sebuah engsel tetap di ujung kiri $P$. Pada jarak $2{,}0\\text{ m}$ dari $P$, bekerja gaya $F_1 = 60\\text{ N}$ vertikal ke bawah. Di ujung kanan $Q$ ($6{,}0\\text{ m}$ dari $P$), bekerja gaya $F_2 = 50\\text{ N}$ miring ke kanan-atas membentuk sudut $53^{\\circ}$ terhadap batang ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$). Agar batang tetap setimbang mendatar, diberikan gaya ketiga $F_3 = 50\\text{ N}$ berarah vertikal ke atas pada titik $R$ di sepanjang batang. Berapakah jarak titik $R$ diukur dari ujung kiri $P$?',
    stimulusCaption:
      'Gambar 7. Batang homogen PQ (6,0 m) berengsel di P dengan gaya F1, F2, dan posisi x untuk gaya F3.',
    stimulusImageAlt:
      'Diagram batang homogen PQ sepanjang 6,0 meter berengsel di P dengan gaya F1 ke bawah di 2,0 m, F2 miring 53 derajat di Q, dan F3 vertikal ke atas pada jarak x dari P.',
    requiresTutorial: true,
    requiresUnit: true,
  },
  {
    id: 8,
    type: 'short_numeric',
    typeLabel: 'Isian Singkat Matematis (10 Poin)',
    maxPoints: 10,
    title: 'Batas Jarak Maksimum Pendakian pada Tangga Bersandar',
    prompt:
      'Sebuah tangga homogen dengan panjang $L = 5{,}0\\text{ m}$ dan massa $m_t = 20\\text{ kg}$ bersandar pada dinding vertikal yang licin dan bertumpu pada lantai horizontal kasar yang memiliki koefisien gesekan statis $\\mu_s = 0{,}5$ ($g = 10\\text{ m/s}^2$). Tangga membentuk sudut $\\theta = 53^{\\circ}$ terhadap lantai ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$). Seorang pekerja bermassa $m_p = 40\\text{ kg}$ mulai menaiki tangga dari titik dasar $A$. Tentukan jarak maksimum $d_{\\max}$ (diukur sepanjang tangga dari titik dasar $A$) yang masih dapat ditempuh pekerja tepat sebelum tangga mulai tergelincir!',
    stimulusCaption:
      'Gambar 8. Tangga homogen 5,0 m (53°) pada lantai kasar (μs = 0,5) dinaiki pekerja 40 kg hingga batas kritis d_max.',
    stimulusImageAlt:
      'Diagram tangga homogen 5,0 meter bersudut 53 derajat pada dinding licin dan lantai kasar koefisien gesek 0,5 dengan pekerja menaiki hingga jarak d_max.',
    requiresTutorial: true,
    requiresUnit: true,
  },
  {
    id: 9,
    type: 'short_numeric',
    typeLabel: 'Isian Singkat Matematis (10 Poin)',
    maxPoints: 10,
    title: 'Kesetimbangan Konstruksi Penyangga dan Katrol Tetap',
    prompt:
      'Sebuah batang baja homogen $AB$ sepanjang $L = 4{,}0\\text{ m}$ dan bermassa $m_b = 8\\text{ kg}$ dipasang mendatar dengan engsel licin pada sisi kanan tiang vertikal di titik $A$ ($g = 10\\text{ m/s}^2$). Di ujung kanan $B$, digantung sebuah beban bermassa $m_L = 11\\text{ kg}$. Pada titik $C$ berjarak $3{,}0\\text{ m}$ dari engsel $A$, diikatkan seutas tali ringan yang ditarik ke kiri-atas membentuk sudut $\\theta = 30^{\\circ}$ terhadap batang $AB$ ($\\sin 30^{\\circ} = 0{,}5$), kemudian melewati sebuah katrol tetap licin tak bermassa di puncak tiang dan menggantung vertikal sebuah beban penyeimbang bermassa $M$ di sisi kiri tiang. Tentukan massa beban penyeimbang $M$ agar batang $AB$ tetap setimbang mendatar!',
    stimulusCaption:
      'Gambar 9. Konstruksi batang penyangga AB (4,0 m) dengan beban 11 kg di B dan tali bersudut 30° melewati katrol licin ke beban M.',
    stimulusImageAlt:
      'Diagram batang mendatar AB sepanjang 4,0 meter berengsel di A, beban 11 kg di B, tali di C pada 3,0 m bersudut 30 derajat melewati katrol tetap licin menahan beban M.',
    requiresTutorial: true,
    requiresUnit: true,
  },
  {
    id: 10,
    type: 'short_numeric',
    typeLabel: 'Isian Singkat Matematis (10 Poin)',
    maxPoints: 10,
    title: 'Analisis Gaya Engsel Resultan pada Lengan Derek Miring',
    prompt:
      'Sebuah lengan derek homogen $AB$ sepanjang $L = 5{,}0\\text{ m}$ dan bermassa $m_b = 16\\text{ kg}$ dipasang pada engsel tetap di dasar dinding vertikal (titik $A$) dengan sudut elevasi $\\theta = 53^{\\circ}$ di atas arah horizontal ($\\sin 53^{\\circ} = 0{,}8$; $\\cos 53^{\\circ} = 0{,}6$; $g = 10\\text{ m/s}^2$). Pada ujung atas $B$, digantung vertikal sebuah peti beban bermassa $m_L = 24\\text{ kg}$. Untuk menahan lengan agar setimbang, seutas kabel baja horizontal dipasang dari dinding vertikal menuju titik $C$ yang berjarak $4{,}0\\text{ m}$ sepanjang lengan diukur dari engsel $A$. Tentukan besar gaya reaksi resultan yang bekerja pada engsel $A$ ($R_A$)!',
    stimulusCaption:
      'Gambar 10. Lengan derek miring AB (5,0 m, sudut 53°) berengsel di A, ditahan kabel horizontal di C (4,0 m), dan menahan beban 24 kg di B.',
    stimulusImageAlt:
      'Diagram lengan derek miring AB 5,0 meter bersudut 53 derajat di engsel A dengan kabel baja horizontal di titik C berjarak 4,0 m dan beban 24 kg di ujung B.',
    requiresTutorial: true,
    requiresUnit: true,
  },
];
