// LYRA Demo Data - Seed content for all roles

export type Role = "patient" | "doctor" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

export interface SuicidalIdeation {
  hasThoughts: boolean | null // null = "je prefere ne pas repondre"
  intensity?: number // 1-5
  hasPlan?: boolean
  hasIntention?: boolean
}

export interface CheckIn {
  id: string
  patientId: string
  date: string
  mood: number
  stress: number
  sleep: number
  energy: number
  anxiety?: number
  diet?: number
  scarification?: boolean
  alcohol?: boolean
  tobacco?: boolean
  vomiting?: boolean
  suicidalThoughts?: boolean
  notes?: string
  suicidalIdeation?: SuicidalIdeation
}

export interface JournalEntry {
  id: string
  patientId: string
  type: "TEXT" | "AUDIO" | "MEDIA"
  text?: string
  transcript?: string
  createdAt: string
  visibility: "DEFAULT" | "PRIVATE"
}

export interface VoiceSession {
  id: string
  patientId: string
  transcript: string
  aiReplyText: string
  createdAt: string
  riskFlag: "NONE" | "LOW" | "HIGH"
}

export interface Goal {
  id: string
  patientId: string
  title: string
  type: string
  target: number
  progress: number
}

export interface WeeklyReport {
  id: string
  patientId: string
  weekStart: string
  summary: string[]
  themes: string[]
  aggravatorsProtectors: { aggravators: string[]; protectors: string[] }
  adherence: number
  alerts: string[]
  suggestedQuestions: string[]
}

export interface Resource {
  id: string
  title: string
  description: string
  tags: string[]
  type: "article" | "video" | "exercise" | "association"
  audience: "PATIENT" | "PARENT" | "ALL"
  duration?: string
  url?: string
}

export interface PositiveMessage {
  id: string
  patientId: string
  from: string
  type: "text" | "audio" | "video"
  content: string
  tags?: string[]
  url?: string
  pinned: boolean
  createdAt: string
}

export interface GPSEntry {
  whatHelps: string[]
  whatMakesWorse: string[]
  earlyWarnings: string[]
  contactPeople: { name: string; phone: string; relationship: string }[]
  whatToSay: string[]
  whatToAvoidSaying: string[]
  strategies: string[]
  medicalInfo: string
}

export interface MedicationEntry {
  id: string
  patientId: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  logs: MedicationLog[]
}

export interface MedicationLog {
  date: string
  taken: boolean
  sideEffects?: string
}

export interface TrustedContact {
  name: string
  phone: string
  relationship: string
}

// Demo users
export const demoUsers: User[] = [
  { id: "p1", name: "Camille D.", email: "camille@demo.lyra", role: "patient" },
  { id: "p2", name: "Lucas M.", email: "lucas@demo.lyra", role: "patient" },
  { id: "d1", name: "Dr. Sophie Martin", email: "dr.martin@demo.lyra", role: "doctor" },
  { id: "pa1", name: "Marie D.", email: "marie@demo.lyra", role: "parent" },
]

export const trustedContact: TrustedContact = {
  name: "Marie D.",
  phone: "06 12 34 56 78",
  relationship: "Maman",
}

// Generate 14 days of check-ins for patient p1
function generateCheckIns(patientId: string): CheckIn[] {
  const moods = [3, 3, 4, 2, 3, 4, 4, 3, 2, 2, 3, 4, 3, 4]
  const stresses = [4, 3, 2, 4, 3, 2, 2, 3, 4, 4, 3, 2, 3, 2]
  const sleeps = [3, 4, 4, 2, 3, 4, 3, 3, 2, 2, 3, 4, 4, 4]
  const energies = [3, 3, 4, 2, 3, 4, 4, 3, 2, 3, 3, 4, 3, 4]
  // Suicidal ideation data: most days null/false, a couple true
  const ideations: (SuicidalIdeation | undefined)[] = [
    { hasThoughts: false }, { hasThoughts: false }, { hasThoughts: false },
    { hasThoughts: true, intensity: 2, hasPlan: false, hasIntention: false },
    { hasThoughts: false }, { hasThoughts: false }, { hasThoughts: false },
    { hasThoughts: null }, // preferred not to respond
    { hasThoughts: true, intensity: 3, hasPlan: false, hasIntention: false },
    { hasThoughts: true, intensity: 2, hasPlan: false, hasIntention: false },
    { hasThoughts: false }, { hasThoughts: false }, { hasThoughts: false }, { hasThoughts: false },
  ]

  return moods.map((mood, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (13 - i))
    return {
      id: `ci-${patientId}-${i}`,
      patientId,
      date: date.toISOString().split("T")[0],
      mood,
      stress: stresses[i],
      sleep: sleeps[i],
      energy: energies[i],
      anxiety: i % 2 === 0 ? 3 : 2, // Dummy data
      diet: 3, // Dummy data
      notes: i === 3 ? "Journee difficile, dispute avec un ami." : i === 8 ? "Insomnie, beaucoup d'anxiete." : undefined,
      suicidalIdeation: ideations[i],
      suicidalThoughts: ideations[i]?.hasThoughts || false,
      scarification: false,
      alcohol: i === 5,
      tobacco: i % 3 === 0,
      vomiting: false,
    }
  })
}

export const checkIns: CheckIn[] = [
  ...generateCheckIns("p1"),
  ...generateCheckIns("p2").map(c => ({ ...c, mood: Math.min(5, c.mood + 1) })),
]

export const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    patientId: "p1",
    type: "TEXT",
    text: "Aujourd'hui j'ai reussi a parler de ce qui me stressait avec ma meilleure amie. Ca m'a fait du bien de me sentir entendu(e). J'ai aussi fait 10 minutes de respiration ce matin.",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    visibility: "DEFAULT",
  },
  {
    id: "j2",
    patientId: "p1",
    type: "AUDIO",
    transcript: "J'ai du mal a dormir en ce moment... je pense trop. Les exercices de relaxation aident un peu mais c'est difficile de couper le flux de pensees.",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    visibility: "DEFAULT",
  },
  {
    id: "j3",
    patientId: "p1",
    type: "TEXT",
    text: "Note privee : je ne suis pas pret(e) a en parler a mon medecin pour l'instant.",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    visibility: "PRIVATE",
  },
  {
    id: "j4",
    patientId: "p1",
    type: "TEXT",
    text: "Super journee ! J'ai fait du sport et je me suis senti(e) vivant(e) pour la premiere fois depuis longtemps.",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    visibility: "DEFAULT",
  },
  {
    id: "j5",
    patientId: "p1",
    type: "TEXT",
    text: "J'ai remarque que quand je mange bien et que je dors assez, mon humeur est vraiment meilleure. Simple mais vrai.",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    visibility: "DEFAULT",
  },
]

export const voiceSessions: VoiceSession[] = [
  {
    id: "vs1",
    patientId: "p1",
    transcript: "Je me sens un peu perdu(e) en ce moment. J'ai l'impression de ne pas avancer.",
    aiReplyText: "Je t'entends, et ce sentiment est tout a fait comprehensible. Parfois, on a l'impression de faire du surplace, mais chaque petit pas compte. Tu as deja fait quelque chose d'important aujourd'hui : tu en parles. Est-ce que tu voudrais qu'on explore ensemble ce qui te donne cette impression ?",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    riskFlag: "NONE",
  },
  {
    id: "vs2",
    patientId: "p1",
    transcript: "L'ecole me stresse enormement. J'ai peur de rater mes examens et ca me paralyse.",
    aiReplyText: "Le stress des examens, c'est vraiment pesant. Ce que tu decris, cette paralysie, beaucoup de personnes la ressentent. On pourrait essayer un petit exercice de respiration ensemble ? 4 secondes d'inspiration, 7 de retention, 8 d'expiration.",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    riskFlag: "NONE",
  },
  {
    id: "vs3",
    patientId: "p1",
    transcript: "Parfois je me demande si ca vaut le coup de continuer comme ca...",
    aiReplyText: "Je te remercie de me confier cela, c'est important. Ce que tu ressens compte enormement. Je veux m'assurer que tu es en securite. Si tu as des pensees de te faire du mal, je t'encourage a contacter le 3114 (numero national de prevention du suicide) ou le 15 en cas d'urgence. Tu n'es pas seul(e).",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    riskFlag: "HIGH",
  },
]

export const goals: Goal[] = [
  { id: "g1", patientId: "p1", title: "Mediter 5 min/jour", type: "habit", target: 14, progress: 9 },
  { id: "g2", patientId: "p1", title: "Dormir avant 23h", type: "habit", target: 14, progress: 7 },
  { id: "g3", patientId: "p1", title: "Faire du sport 3x/semaine", type: "habit", target: 6, progress: 4 },
  { id: "g4", patientId: "p1", title: "Ecrire dans mon journal", type: "habit", target: 14, progress: 10 },
]

export const weeklyReport: WeeklyReport = {
  id: "wr1",
  patientId: "p1",
  weekStart: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
  summary: [
    "Humeur globalement stable avec une amelioration en fin de semaine.",
    "Stress lie aux examens scolaires identifie comme facteur principal.",
    "Qualite du sommeil variable, insomnie signalee 2 nuits.",
    "Bonne adherence aux exercices de respiration (5/7 jours).",
    "Un signal de risque detecte necessitant une attention clinique.",
    "Ideations suicidaires rapportees 3 jours sur 14, intensite faible a moderee, sans plan ni intention.",
  ],
  themes: ["Stress scolaire", "Sommeil", "Relations amicales", "Estime de soi", "Ideations"],
  aggravatorsProtectors: {
    aggravators: ["Examens a venir", "Conflit amical", "Insomnie"],
    protectors: ["Sport", "Exercices de respiration", "Amie de confiance", "Journal"],
  },
  adherence: 72,
  alerts: [
    "Signal HIGH detecte le 20/02 : ideation passive. A explorer en seance.",
    "Ideations rapportees dans le check-in : 3 occurrences sur 14 jours (intensite max 3/5, pas de plan).",
  ],
  suggestedQuestions: [
    "Comment te sens-tu par rapport aux examens cette semaine ?",
    "Tu as mentionne te sentir perdu(e). Peux-tu m'en dire plus ?",
    "Qu'est-ce qui t'aide le plus quand tu te sens anxieux/anxieuse ?",
    "Tu as indique avoir eu des pensees sombres certains jours. Comment ca va aujourd'hui ?",
  ],
}

export const positiveMessages: PositiveMessage[] = [
  {
    id: "pm1", patientId: "p1", from: "Maman (Marie)",
    type: "text",
    content: "Mon coeur, je suis tellement fiere de toi. Tu es plus fort(e) que tu ne le crois. Je t'aime inconditionnellement.",
    tags: ["Qualites", "Amour"],
    pinned: true, createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "pm2", patientId: "p1", from: "Papa (Thomas)",
    type: "video",
    content: "Coucou ma grande, j'ai retrouvé une vidéo qui m'a fait penser à toi. Tu te souviens de tes 13 ans ? On avait fait une soirée pizza-film tous les deux, et t'avais choisi « Le Roi Lion » pour la 100ème fois 🦁 Ce moment m'était cher. Je t'aime ma puce.",
    tags: ["Souvenir", "Amour"],
    url: "/anniversaire.gif",
    pinned: true, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "pm3", patientId: "p1", from: "Léa (meilleure amie)",
    type: "video",
    content: "T'es la personne la plus courageuse que je connais. Tu te souviens de nos vacances à la mer ? On était trop bien 🌊 J'ai hâte qu'on en refasse plein d'autres ensemble !",
    tags: ["Souvenir", "Courage"],
    url: "/girls_beach.png",
    pinned: false, createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "pm4", patientId: "p1", from: "Mamie (Jeanne)",
    type: "audio",
    content: "[Message audio] Je pense a toi tous les jours ma petite Camille. Ton sourire me rechauffe le coeur. Tu as toute la force du monde en toi, je suis fiere de toi.",
    tags: ["Qualites"],
    pinned: false, createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: "pm5", patientId: "p1", from: "Dr. Martin",
    type: "text",
    content: "Camille, je vois tes progres chaque semaine. Tu fais un travail remarquable. Continue comme ca.",
    tags: ["Progres"],
    pinned: false, createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
]

export const gpsEntry: GPSEntry = {
  whatHelps: [
    "Marcher dehors 10 minutes",
    "Appeler maman ou Lea",
    "Ecouter de la musique calme",
    "Faire l'exercice de respiration 4-7-8",
    "Caresser mon chat",
  ],
  whatMakesWorse: [
    "Rester seul(e) dans ma chambre trop longtemps",
    "Scroller les reseaux sociaux",
    "Ne pas manger",
    "Ruminer au lit sans rien faire",
  ],
  earlyWarnings: [
    "Je m'isole de mes amis",
    "Je ne reponds plus aux messages",
    "Je saute des repas",
    "Je ne dors plus ou trop",
    "Je pleure sans raison apparente",
  ],
  contactPeople: [
    { name: "Marie D. (Maman)", phone: "06 12 34 56 78", relationship: "Maman" },
    { name: "Lea B.", phone: "06 98 76 54 32", relationship: "Meilleure amie" },
    { name: "Dr. Sophie Martin", phone: "01 23 45 67 89", relationship: "Psychiatre" },
  ],
  whatToSay: [
    "Tu n'es pas seul(e)",
    "On va traverser ca ensemble",
    "Tu as le droit de ne pas aller bien",
    "Je suis la, prends ton temps",
  ],
  whatToAvoidSaying: [
    "C'est pas si grave",
    "Il y a pire dans la vie",
    "Tu n'as qu'a te bouger",
    "C'est dans ta tete",
  ],
  strategies: [
    "Marcher 10 minutes dehors",
    "Exercice de respiration 4-7-8",
    "Grounding 5-4-3-2-1",
    "Appeler Lea ou maman",
    "Mettre la playlist 'Calme'",
    "Ecrire dans mon journal",
  ],
  medicalInfo: "Suivi psychiatrique bimensuel avec Dr. Martin. Traitement : Sertraline 50mg/jour depuis 3 mois. Allergie : aucune connue.",
}

export const medications: MedicationEntry[] = [
  {
    id: "med1",
    patientId: "p1",
    name: "Sertraline",
    dosage: "50mg",
    frequency: "1x/jour le matin",
    startDate: new Date(Date.now() - 90 * 86400000).toISOString().split("T")[0],
    logs: Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (13 - i))
      return {
        date: date.toISOString().split("T")[0],
        taken: Math.random() > 0.15,
        sideEffects: i === 2 ? "Leger mal de tete" : i === 7 ? "Nausee legere" : undefined,
      }
    }),
  },
]

export const resources: Resource[] = [
  // Patient resources
  { id: "r1", title: "Respiration 4-7-8", description: "Technique de respiration pour calmer l'anxiete en moins de 2 minutes.", tags: ["anxiete", "stress", "respiration"], type: "exercise", audience: "PATIENT", duration: "2 min" },
  { id: "r2", title: "Grounding 5-4-3-2-1", description: "Exercice d'ancrage sensoriel pour revenir au moment present.", tags: ["anxiete", "stress"], type: "exercise", audience: "PATIENT", duration: "3 min" },
  { id: "r3", title: "Comprendre l'anxiete", description: "L'anxiete est une reaction normale du corps. Apprenez a la reconnaitre.", tags: ["anxiete"], type: "article", audience: "PATIENT" },
  { id: "r4", title: "Ameliorer son sommeil", description: "10 habitudes simples pour mieux dormir et se sentir repose(e).", tags: ["sommeil"], type: "article", audience: "PATIENT" },
  { id: "r5", title: "Body scan relaxation", description: "Exercice de scan corporel guide pour relacher les tensions.", tags: ["stress", "relaxation"], type: "exercise", audience: "PATIENT", duration: "10 min" },
  { id: "r6", title: "Journal de gratitude", description: "Comment ecrire un journal de gratitude et pourquoi ca aide.", tags: ["confiance", "relations"], type: "article", audience: "PATIENT" },
  { id: "r7", title: "Gerer le stress des examens", description: "Strategies concretes pour aborder les periodes d'examens sereinement.", tags: ["stress", "anxiete"], type: "article", audience: "PATIENT" },
  { id: "r8", title: "Meditation guidee - Debutant", description: "Une meditation de 5 minutes pour commencer en douceur.", tags: ["stress", "relaxation"], type: "exercise", audience: "PATIENT", duration: "5 min" },
  { id: "r9", title: "Les emotions, c'est quoi ?", description: "Comprendre ses emotions pour mieux les vivre au quotidien.", tags: ["confiance"], type: "article", audience: "ALL" },
  { id: "r10", title: "Etirements anti-stress", description: "5 etirements simples a faire n'importe ou pour liberer la tension.", tags: ["stress", "relaxation"], type: "exercise", audience: "PATIENT", duration: "5 min" },
  { id: "r11", title: "Communication non-violente", description: "Les bases de la CNV pour mieux communiquer avec son entourage.", tags: ["relations"], type: "article", audience: "ALL" },
  { id: "r12", title: "Hygiene du sommeil", description: "Video explicative sur les cycles du sommeil et comment les optimiser.", tags: ["sommeil"], type: "video", audience: "PATIENT", duration: "8 min" },
  { id: "r13", title: "Coherence cardiaque", description: "Exercice de coherence cardiaque pour reguler le stress.", tags: ["stress", "respiration"], type: "exercise", audience: "PATIENT", duration: "5 min" },
  { id: "r14", title: "Accepter ses imperfections", description: "Apprendre a se pardonner et accepter de ne pas etre parfait(e).", tags: ["confiance"], type: "article", audience: "PATIENT" },
  { id: "r15", title: "Visualisation positive", description: "Exercice de visualisation pour cultiver des pensees positives.", tags: ["confiance", "relaxation"], type: "exercise", audience: "PATIENT", duration: "7 min" },
  // Associations & psychoeducation resources
  { id: "r30", title: "ClesPsy - Comprendre la sante mentale", description: "Ressources psychoeducatives validees pour adolescents et familles.", tags: ["psychoeducation", "depression", "anxiete"], type: "association", audience: "ALL", url: "https://www.clepsy.fr" },
  { id: "r31", title: "Connexion Familiale", description: "Programme de psychoeducation pour les familles de personnes souffrant de trouble borderline.", tags: ["borderline", "famille", "psychoeducation"], type: "association", audience: "ALL", url: "https://www.connexionfamiliale.org" },
  { id: "r32", title: "FFAB - Anorexie & Boulimie", description: "Federation francaise anorexie boulimie. Information, soutien et orientation.", tags: ["TCA", "anorexie", "boulimie"], type: "association", audience: "ALL", url: "https://www.ffab.fr" },
  { id: "r33", title: "Fondation FondaMental", description: "Recherche et prise en charge des troubles bipolaires, depression resistante, schizophrenie.", tags: ["bipolarite", "depression", "schizophrenie"], type: "association", audience: "ALL", url: "https://www.fondation-fondamental.org" },
  { id: "r34", title: "UNAFAM", description: "Union nationale de familles et amis de personnes malades psychiques.", tags: ["famille", "soutien", "psychoeducation"], type: "association", audience: "PARENT", url: "https://www.unafam.org" },
  { id: "r35", title: "Phobies-Zero", description: "Association d'aide aux personnes souffrant de troubles anxieux et phobiques.", tags: ["anxiete", "phobies", "TOC"], type: "association", audience: "ALL", url: "https://www.phobies-zero.qc.ca" },
  { id: "r36", title: "EVA Musby - Aider un proche avec un TCA", description: "Ressources et coaching pour parents dont un enfant souffre de troubles alimentaires.", tags: ["TCA", "famille", "psychoeducation"], type: "association", audience: "PARENT", url: "https://anorexiafamily.com/fr" },
  { id: "r37", title: "Autisme Info Service", description: "Ligne d'ecoute et d'information sur les troubles du spectre autistique.", tags: ["TSA", "autisme"], type: "association", audience: "ALL", url: "https://www.autismeinfoservice.fr" },
  { id: "r38", title: "SOS Addictions", description: "Prevention et aide pour les conduites addictives chez les jeunes.", tags: ["addictions", "prevention"], type: "association", audience: "ALL", url: "https://sosaddictions.org" },
  { id: "r39", title: "France Depression", description: "Association d'aide aux personnes concernees par la depression.", tags: ["depression", "soutien"], type: "association", audience: "ALL", url: "https://www.france-depression.org" },
  { id: "r40", title: "Reguler ses emotions (psychoeducation)", description: "Fiche psychoeducative sur la regulation emotionnelle et la tolerance a la detresse.", tags: ["borderline", "emotions", "psychoeducation"], type: "article", audience: "ALL" },
  // Parent resources
  { id: "r16", title: "Ecouter sans juger", description: "Comment pratiquer l'ecoute active avec votre adolescent(e).", tags: ["ecoute"], type: "article", audience: "PARENT" },
  { id: "r17", title: "Validation emotionnelle", description: "Pourquoi valider les emotions de votre enfant est essentiel.", tags: ["ecoute", "emotions"], type: "article", audience: "PARENT" },
  { id: "r18", title: "Poser des limites bienveillantes", description: "Equilibrer soutien et cadre pour accompagner votre ado.", tags: ["limites"], type: "article", audience: "PARENT" },
  { id: "r19", title: "Que faire en cas de crise", description: "Guide pratique pour reagir face a une crise emotionnelle.", tags: ["crise", "urgence"], type: "article", audience: "PARENT" },
  { id: "r20", title: "Reperer les signaux d'alerte", description: "Les signes qui doivent alerter un parent sur la sante mentale.", tags: ["alerte", "crise"], type: "article", audience: "PARENT" },
  { id: "r21", title: "Parler sans braquer", description: "Techniques pour aborder les sujets sensibles avec votre ado.", tags: ["communication"], type: "article", audience: "PARENT" },
  { id: "r22", title: "Accompagner sans etouffer", description: "Trouver la juste distance dans l'accompagnement parental.", tags: ["ecoute"], type: "article", audience: "PARENT" },
  { id: "r23", title: "Harcelement scolaire", description: "Comprendre et agir face au harcelement scolaire.", tags: ["harcelement", "crise"], type: "article", audience: "PARENT" },
  { id: "r24", title: "Prendre soin de soi aussi", description: "En tant que parent, votre bien-etre compte aussi.", tags: ["bien-etre"], type: "article", audience: "PARENT" },
  { id: "r25", title: "Ressources d'urgence", description: "Numeros et contacts utiles en cas de besoin.", tags: ["urgence", "crise"], type: "article", audience: "ALL" },
]

export const hotlines = [
  { name: "3114 - Numero national de prevention du suicide", number: "3114", description: "24h/24, 7j/7, gratuit et confidentiel" },
  { name: "Fil Sante Jeunes", number: "0 800 235 236", description: "Anonyme et gratuit, 9h-23h" },
  { name: "SOS Amitie", number: "09 72 39 40 50", description: "24h/24, 7j/7" },
  { name: "SAMU", number: "15", description: "Urgences medicales" },
  { name: "Numero d'urgence europeen", number: "112", description: "Toutes urgences" },
]

export const copingTools = [
  { id: "ct1", name: "Respiration 4-7-8", description: "Inspire 4s, retiens 7s, expire 8s", type: "breathing" },
  { id: "ct2", name: "Grounding 5-4-3-2-1", description: "5 choses que tu vois, 4 que tu touches, 3 que tu entends, 2 que tu sens, 1 que tu goutes", type: "grounding" },
  { id: "ct3", name: "Tension-relaxation", description: "Contracte et relache chaque groupe musculaire", type: "body" },
]
