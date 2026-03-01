<div align="center">

# 🌸 Lyra
### *Compagnon de santé mentale pour adolescents, propulsé par Mistral AI*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Mistral AI](https://img.shields.io/badge/Mistral_AI-Powered-FF7000?logo=data:image/svg+xml;base64,PHN2Zy8+)](https://mistral.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> **Hackathon Mistral AI — Mars 2026**

*Lyra est une application web de soutien psychologique destinée aux adolescents en suivi psychiatrique. Elle offre un accompagnement quotidien entre les séances, grâce à une IA empathique, des outils de bien-être, et un espace de partage sécurisé avec les proches et le médecin.*

</div>

---

## 🎯 Le Problème

Les adolescents en suivi psychiatrique passent en moyenne **23 heures sur 24 sans soutien professionnel** entre deux séances. Durant ces périodes, ils sont seuls face à leurs émotions, sans outil adapté à leur réalité et à leur langage. Les parents, eux, manquent souvent de clés pour comprendre et accompagner leur enfant sans être intrusifs.

**Lyra comble ce vide.**

---

## ✨ Solution

Lyra est un **compagnon de santé mentale** organisé en trois espaces distincts :

| Espace | Pour qui | Rôle |
|--------|----------|------|
| 🧒 **Patient** | L'adolescent | Espace de bien-être, chat avec Lyra, journal intime, outils |
| 👨‍👩‍👧 **Parent** | La famille | Suivi non intrusif, ressources, mots de soutien |
| 🩺 **Médecin** | Le psychiatre | Rapports hebdomadaires, dossier patient, alertes |

---

## 🤖 Modèles Mistral utilisés

| Fonctionnalité | Modèle Mistral | Description |
|---|---|---|
| **Lyra (chat principal)** | `mistral-large-latest` | IA empathique, gestion de crise, navigation contextuelle |
| **Mini-Agents IA** | `mistral-small-latest` | Agents spécialisés (jardinier, poète, robot...) |
| **Dictée vocale** | `voxtral-mini-latest` | Transcription audio → texte (speech-to-text) |
| **Analyse de dessin** | `pixtral-12b-2409` | Vision : analyse émotionnelle d'images/dessins |

---

## 🌟 Fonctionnalités clés

### Pour l'adolescent (espace patient)

#### 💬 Chat avec Lyra
- Conversation empathique et bienveillante disponible 24h/24
- **Détection de crise automatique** : si l'adolescent exprime des idées suicidaires, Lyra détecte un tag `[CRISIS]` et ouvre automatiquement un modal d'urgence avec les numéros 3114 et 15
- **Boutons de navigation contextuels** : Lyra suggère des sections de l'app selon la conversation
- Rendu **Markdown complet** : texte formaté, listes, liens cliquables

#### 🎙️ Dictée vocale (Voxtral)
- Microphone intégré dans **tous les champs de saisie** : chat Lyra, agents IA, journal
- Compression audio avant envoi → optimisation des coûts API
- Feedback visuel en temps réel (idle / recording / processing)

#### 📖 Journal intime
- Écriture libre avec mise en page "journal papier" (lignes, typographies)
- Navigation entre les dates passées
- **Image IA générée** pour accompagner chaque entrée (Pixtral)
- Zone droite personnalisable : stickers, image IA, citation du jour

#### 🎨 Analyse de dessin (Pixtral Vision)
- Upload d'une image (dessin, photo, aquarelle, collage...)
- **Compression automatique** côté client (canvas 800px, JPEG 0.7) avant envoi
- Lyra analyse l'image et retourne une réponse empathique : description, émotions ressenties, question ouverte

#### 🧭 GPS Émotionnel
- Plan de bien-être personnalisé : ce qui aide, signaux d'alerte précoces, stratégies
- Contacts de confiance avec numéros de téléphone
- Phrases utiles / à éviter pour les proches
- Données partagées (avec consentement) au parent

#### 🛡️ Kit de Secours
- Numéros d'urgence nationaux (3114, 15, 17)
- Bouton SOS avec modal de crise immédiate
- Techniques de régulation émotionnelle

#### 💛 Mots de mes proches
- Messages vidéo, texte et audio de la famille et amis
- GIFs et images personnalisées
- Accès rapide aux contenus "épinglés"

#### 🌬️ Boîte à outils bien-être
- Respiration guidée 4-7-8
- Sons apaisants / bruits blancs
- Mini-jeu de déstress (pop de bulles)
- **Analyse de dessin par Lyra** (IA vision)

#### 🤖 Mini-Agents IA spécialisés
- **Léon le Jardinier** : coach nature et pensées positives
- **Plume** : guide créatif pour exprimer ses émotions en poèmes
- Agents personnalisés créables par l'utilisateur
- Rendu Markdown + liens cliquables

#### 📅 Calendrier & Résolutions
- Suivi des habitudes (méditation, sport, journal...)
- Visualisation des progrès sur 14 jours

---

### Pour le parent (espace parent)

#### 📊 Tableau de bord
- Humeur globale de l'adolescent (30 derniers jours, anonymisée)
- Alertes urgentes (uniquement si crise détectée)
- Accès au GPS émotionnel partagé par l'adolescent

#### 🔒 Infos Privées
- GPS émotionnel complet (avec consentement de l'adolescent) :
  - Signaux d'alerte précoces
  - Ce qui aide / aggrave
  - Phrases à dire / à éviter
  - Contacts de confiance cliquables
- Journal : respect de la vie privée (jamais partagé sans accord)

#### 💌 Soutenir (mots des proches)
- Envoi de messages texte, images, vidéos ou GIFs à l'adolescent
- Interface simple et intuitive

#### 📚 Ressources
- Articles et vidéos vérifiés (Psycom, Ameli, UNICEF, France Inter...)
- Organisations d'aide (UNAFAM, Maisons des Ados, Doctolib...)
- Numéros d'urgence accessibles en 1 clic (3114, Fil Santé Jeunes...)

---

### Pour le médecin (espace médecin)

- Liste des patients avec indicateurs de risque
- **Rapport hebdomadaire IA** : résumé des check-ins, thèmes, aggravateurs/protecteurs
- Alertes cliniques (idéations suicidaires, crises)
- Questions suggérées pour la prochaine séance

---

## 🏗️ Architecture technique

```
Lyra/
├── app/
│   ├── api/
│   │   ├── chat/          → Route chat Lyra (Mistral Large)
│   │   ├── agents/chat/   → Route agents IA (Mistral Small)
│   │   ├── transcribe/    → Voxtral speech-to-text
│   │   ├── analyze-image/ → Pixtral vision
│   │   └── generate-image/→ Génération d'image journal
│   ├── patient/           → Espace adolescent
│   ├── parent/            → Espace parent
│   └── medecin/           → Espace médecin
├── components/
│   ├── app/               → Composants métier
│   ├── voice-button.tsx   → Bouton dictée vocale réutilisable
│   └── ui/                → Design system (shadcn/ui)
└── lib/
    ├── app-context.tsx    → Contexte global (rôles, données)
    ├── demo-data.ts       → Données de démonstration
    └── use-voice-dictation.ts → Hook dictée vocale
```

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js ≥ 18
- Une clé API Mistral (obtenir sur [console.mistral.ai](https://console.mistral.ai/))

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/Eveyens/Mistral_lyra.git
cd Mistral_lyra/Lyra

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# → Ajouter votre MISTRAL_API_KEY dans .env
```

### Variables d'environnement

```env
# .env
MISTRAL_API_KEY=your_mistral_api_key_here
```

### Lancement en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🎭 Comptes de démonstration

L'application utilise des données de démonstration pré-remplies. Aucune authentification n'est requise — choisissez simplement votre rôle sur la page d'accueil.

| Rôle | URL | Personnage |
|------|-----|-----------|
| 🧒 Patient | `/patient` | Camille D., 16 ans |
| 👩 Parent | `/parent` | Marie D., maman de Camille |
| 🩺 Médecin | `/medecin` | Dr. Sophie Martin |

---

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 15** | Framework React (App Router) |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **shadcn/ui** | Composants UI accessibles |
| **AI SDK (Vercel)** | Streaming IA + hooks React |
| **@ai-sdk/mistral** | Provider Mistral pour l'AI SDK |
| **react-markdown** | Rendu Markdown des réponses IA |
| **sonner** | Notifications toast |
| **date-fns** | Manipulation des dates |
| **lucide-react** | Icônes |

---

## 💡 Points forts techniques

### Détection de crise automatique
```typescript
// system prompt → Lyra préfixe ses réponses de crise avec [CRISIS]
// Le frontend détecte ce tag et ouvre automatiquement le modal d'urgence
if (content.startsWith("[CRISIS]")) {
  setShowCrisisModal(true)
}
```

### Dictée vocale (Voxtral)
```typescript
// Hook réutilisable sur tous les champs de saisie
const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceDictation({
  onTranscript: (text) => setInput(prev => prev + " " + text)
})
```

### Compression d'image avant envoi (Pixtral)
```typescript
// Canvas resize → max 800px, JPEG 0.7 quality
// Image de 4MB → ~80KB avant envoi à l'API
const canvas = document.createElement("canvas")
canvas.width = img.width * ratio
ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
const compressed = canvas.toDataURL("image/jpeg", 0.7)
```

### Navigation contextuelle dans Lyra
```typescript
// Détection de mots-clés dans les réponses de Lyra
// → Affichage automatique de boutons de navigation vers les sections
const NAV_SECTIONS = [
  { keywords: ["journal", "écrire"], label: "📖 Mon journal", href: "/patient/journal" },
  { keywords: ["respiration", "détente"], label: "🌬️ Détente", href: "/patient/resources" },
  // ...
]
```

---

## 🔮 Fonctionnalités futures envisagées

- [ ] Authentification réelle (Supabase Auth)
- [ ] Notifications push pour les alertes de crise
- [ ] Intégration agenda / rappels de séance
- [ ] Rapport médecin exportable en PDF
- [ ] Mode hors-ligne (PWA)
- [ ] Application mobile native (React Native)

---

## 🏆 Hackathon Mistral AI — Mars 2026

Ce projet a été développé dans le cadre du **Hackathon Mistral AI**. L'objectif était de créer une application innovante utilisant les modèles Mistral de manière pertinente et utile.

**Modèles Mistral intégrés :**
- `mistral-large-latest` → Intelligence conversationnelle de Lyra
- `mistral-small-latest` → Mini-agents thématiques
- `voxtral-mini-latest` → Dictée vocale (speech-to-text)
- `pixtral-12b-2409` → Vision (analyse de dessins & génération d'images)

---

## 📄 Licence

MIT — Voir [LICENSE](LICENSE)

---

<div align="center">

Fait avec 💛 pour les adolescents et leurs familles

*"Devenez l'acteur de votre bien-être."*

</div>
