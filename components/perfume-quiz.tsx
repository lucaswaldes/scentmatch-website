"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Sun, Users, Coffee, Leaf, Scale, Zap, Citrus, Cherry, TreePine, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type Language = "en" | "fr" | "pt"

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  const saved = localStorage.getItem("lang") as Language | null
  if (saved) return saved

  const browser = navigator.language.toLowerCase()
  if (browser.startsWith("pt")) return "pt"
  if (browser.startsWith("fr")) return "fr"

  return "en"
}

const translations = {
  pt: {
    brandName: "SCENT MATCH",
    of: "de",
    continue: "Continuar",
    yourIdealPerfume: "Seu perfume ideal",
    redoQuiz: "Refazer o quiz",
    questions: [
      {
        question: "Como está seu dia hoje?",
        subtitle: "Descubra a fragrância ideal para o seu momento",
        options: ["Estudos", "Social", "Rotina tranquila"],
      },
      {
        question: "Qual vibe combina mais com você?",
        subtitle: "Sua essência em uma palavra",
        options: ["Leve", "Equilibrado", "Marcante"],
      },
      {
        question: "Que tipo de fragrância você prefere?",
        subtitle: "Sua nota olfativa favorita",
        options: ["Cítrica", "Doce", "Amadeirada"],
      },
      {
        question: "Como você se identifica?",
        subtitle: "Para personalizar sua recomendação",
        options: ["Homem", "Mulher", "Gênero fluido"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clareza mental em cada nota",
        description:
          "Uma fragrância leve e refrescante que desperta sua concentração. Perfeita para longas sessões de estudo.",
        emotionalMessage:
          "Você está no caminho certo. Continue focado — cada momento de dedicação te aproxima dos seus sonhos.",
      },
      confidenceBoost: {
        name: "Confidence Boost",
        tagline: "Presença que deixa marca",
        description:
          "Uma fragrância envolvente que transmite segurança e carisma. Ideal para momentos de conexão.",
        emotionalMessage:
          "Sua energia contagia quem está ao seu redor. Hoje é o dia de brilhar e criar conexões incríveis.",
      },
      balanceCalm: {
        name: "Balance & Calm",
        tagline: "Harmonia para o seu dia a dia",
        description:
          "Uma fragrância acolhedora que traz paz e equilíbrio. Perfeita para momentos de autocuidado.",
        emotionalMessage:
          "Você merece esse momento de tranquilidade. Respire fundo e aproveite a jornada — não apenas o destino.",
      },
    },
  },

  en: {
    brandName: "SCENT MATCH",
    of: "of",
    continue: "Continue",
    yourIdealPerfume: "Your ideal perfume",
    redoQuiz: "Retake the quiz",
    questions: [
      {
        question: "How is your day going today?",
        subtitle: "Discover the perfect fragrance for your moment",
        options: ["Studying", "Social", "Quiet routine"],
      },
      {
        question: "What vibe suits you best?",
        subtitle: "Your essence in one word",
        options: ["Light", "Balanced", "Bold"],
      },
      {
        question: "What type of fragrance do you prefer?",
        subtitle: "Your favorite scent profile",
        options: ["Citrus", "Sweet", "Woody"],
      },
      {
        question: "How do you identify?",
        subtitle: "To personalize your recommendation",
        options: ["Man", "Woman", "Gender-fluid"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Mental clarity in every note",
        description:
          "A light and refreshing fragrance that enhances your concentration. Perfect for long study sessions.",
        emotionalMessage:
          "You're on the right path. Stay focused — every moment of dedication brings you closer to your goals.",
      },
      confidenceBoost: {
        name: "Confidence Boost",
        tagline: "A presence that leaves a mark",
        description:
          "An enveloping fragrance that conveys confidence and charisma. Ideal for social moments.",
        emotionalMessage:
          "Your energy inspires those around you. Today is your moment to shine and build meaningful connections.",
      },
      balanceCalm: {
        name: "Balance & Calm",
        tagline: "Harmony for your daily life",
        description:
          "A comforting fragrance that brings peace and balance. Perfect for self-care moments.",
        emotionalMessage:
          "You deserve this moment of calm. Take a deep breath and enjoy the journey — not just the destination.",
      },
    },
  },

  fr: {
    brandName: "SCENT MATCH",
    of: "de",
    continue: "Continuer",
    yourIdealPerfume: "Votre parfum idéal",
    redoQuiz: "Refaire le quiz",
    questions: [
      {
        question: "Comment se passe votre journée ?",
        subtitle: "Découvrez le parfum idéal pour chaque instant",
        options: ["Études", "Social", "Routine tranquille"],
      },
      {
        question: "Quelle ambiance vous correspond le mieux ?",
        subtitle: "Votre essence en un mot",
        options: ["Léger", "Équilibré", "Marquant"],
      },
      {
        question: "Quel type de fragrance préférez-vous ?",
        subtitle: "Votre note olfactive préférée",
        options: ["Agrumes", "Sucré", "Boisé"],
      },
      {
        question: "Comment vous identifiez-vous ?",
        subtitle: "Pour personnaliser votre recommandation",
        options: ["Homme", "Femme", "Genre fluide"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clarté mentale à chaque note",
        description:
          "Une fragrance légère et rafraîchissante qui stimule votre concentration. Parfaite pour les longues sessions d'étude.",
        emotionalMessage:
          "Vous êtes sur la bonne voie. Restez concentré — chaque effort vous rapproche de vos objectifs.",
      },
      confidenceBoost: {
        name: "Confidence Boost",
        tagline: "Une présence qui marque",
        description:
          "Une fragrance enveloppante qui exprime confiance et charisme. Idéale pour les moments sociaux.",
        emotionalMessage:
          "Votre énergie inspire les autres. Aujourd'hui est le moment de briller et de créer des connexions.",
      },
      balanceCalm: {
        name: "Balance & Calm",
        tagline: "Harmonie au quotidien",
        description:
          "Une fragrance réconfortante qui apporte paix et équilibre. Parfaite pour les moments de bien-être.",
        emotionalMessage:
          "Vous méritez ce moment de calme. Respirez profondément et profitez du voyage — pas seulement de la destination.",
      },
    },
  },
}

const languageLabels: Record<Language, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
}

interface Question {
  id: number
  values: string[]
  icons: React.ReactNode[]
}

const questionData: Question[] = [
  {
    id: 1,
    values: ["estudos", "social", "rotina"],
    icons: [<Sparkles key="sparkles" className="w-6 h-6" />, <Users key="users" className="w-6 h-6" />, <Coffee key="coffee" className="w-6 h-6" />],
  },
  {
    id: 2,
    values: ["leve", "equilibrado", "marcante"],
    icons: [<Leaf key="leaf" className="w-6 h-6" />, <Scale key="scale" className="w-6 h-6" />, <Zap key="zap" className="w-6 h-6" />],
  },
  {
    id: 3,
    values: ["citrica", "doce", "amadeirada"],
    icons: [<Citrus key="citrus" className="w-6 h-6" />, <Cherry key="cherry" className="w-6 h-6" />, <TreePine key="tree" className="w-6 h-6" />],
  },
  {
    id: 4,
    values: ["homem", "mulher", "fluido"],
    icons: [<Sun key="sun1" className="w-6 h-6" />, <Sun key="sun2" className="w-6 h-6" />, <Sun key="sun3" className="w-6 h-6" />],
  },
]

interface PerfumeResult {
  name: string
  tagline: string
  description: string
  emotionalMessage: string
  notes: string[]
}

const getResult = (answers: Record<number, string>, lang: Language): PerfumeResult => {
  const day = answers[1]
  const vibe = answers[2]
  const fragrance = answers[3]
  const t = translations[lang].results

  const getNotes = (type: string) => {
    if (type === "citrica") {
      return lang === "pt" ? ["Bergamota", "Cha Verde", "Cedro Branco"] : 
             lang === "en" ? ["Bergamot", "Green Tea", "White Cedar"] :
             ["Bergamote", "The Vert", "Cedre Blanc"]
    }
    if (type === "doce") {
      return lang === "pt" ? ["Baunilha Suave", "Ambar", "Musgo"] :
             lang === "en" ? ["Soft Vanilla", "Amber", "Moss"] :
             ["Vanille Douce", "Ambre", "Mousse"]
    }
    return lang === "pt" ? ["Sandalo", "Vetiver", "Patchouli"] :
           lang === "en" ? ["Sandalwood", "Vetiver", "Patchouli"] :
           ["Bois de Santal", "Vetiver", "Patchouli"]
  }

  const getNotesConfidence = (type: string) => {
    if (type === "citrica") {
      return lang === "pt" ? ["Toranja", "Pimenta Rosa", "Couro"] :
             lang === "en" ? ["Grapefruit", "Pink Pepper", "Leather"] :
             ["Pamplemousse", "Poivre Rose", "Cuir"]
    }
    if (type === "doce") {
      return lang === "pt" ? ["Caramelo", "Jasmim", "Almiscar"] :
             lang === "en" ? ["Caramel", "Jasmine", "Musk"] :
             ["Caramel", "Jasmin", "Musc"]
    }
    return lang === "pt" ? ["Oud", "Tabaco", "Baunilha"] :
           lang === "en" ? ["Oud", "Tobacco", "Vanilla"] :
           ["Oud", "Tabac", "Vanille"]
  }

  const getNotesBalance = (type: string) => {
    if (type === "citrica") {
      return lang === "pt" ? ["Neroli", "Lavanda", "Alecrim"] :
             lang === "en" ? ["Neroli", "Lavender", "Rosemary"] :
             ["Neroli", "Lavande", "Romarin"]
    }
    if (type === "doce") {
      return lang === "pt" ? ["Mel", "Flor de Laranjeira", "Sandalo"] :
             lang === "en" ? ["Honey", "Orange Blossom", "Sandalwood"] :
             ["Miel", "Fleur d'Oranger", "Bois de Santal"]
    }
    return lang === "pt" ? ["Cedro", "Iris", "Musgo de Carvalho"] :
           lang === "en" ? ["Cedar", "Iris", "Oak Moss"] :
           ["Cedre", "Iris", "Mousse de Chene"]
  }

  if (day === "estudos" && vibe === "leve") {
    return {
      ...t.focusMode,
      notes: getNotes(fragrance),
    }
  }

  if (day === "social" || vibe === "marcante") {
    return {
      ...t.confidenceBoost,
      notes: getNotesConfidence(fragrance),
    }
  }

  return {
    ...t.balanceCalm,
    notes: getNotesBalance(fragrance),
  }
}

export function PerfumeQuiz() {
    const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language
    if (savedLang) setLanguage(savedLang)
    setMounted(true)
  }, [])

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const t = translations[language]
  const progress = ((currentStep) / questionData.length) * 100
  const currentQuestion = questionData[currentStep]
  const currentQuestionText = t.questions[currentStep]


  if (!mounted) return null

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleContinue = () => {
    if (!selectedOption) return

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentStep < questionData.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setSelectedOption(null)
    setShowResult(false)
  }

  const result = showResult ? getResult(answers, language) : null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: showResult ? "100%" : `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground tracking-wide">{t.brandName}</span>
          <div className="flex items-center gap-4">
            {!showResult && (
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} {t.of} {questionData.length}
              </span>
            )}
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium text-muted-foreground"
              >
                <Globe className="w-4 h-4" />
                {languageLabels[language]}
              </button>
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-lg border border-border overflow-hidden min-w-24"
                  >
                    {(Object.keys(languageLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang)
                          localStorage.setItem("lang", lang)
                          setShowLanguageMenu(false)
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm font-medium transition-colors",
                          language === lang
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {lang === "pt" ? "Portugues" : lang === "en" ? "English" : "Francais"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-12">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`${currentStep}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              {/* Question */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance">
                  {currentQuestionText.question}
                </h1>
                <p className="mt-3 text-muted-foreground text-lg">
                  {currentQuestionText.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {currentQuestion.values.map((value, index) => (
                  <motion.button
                    key={value}
                    onClick={() => handleOptionSelect(value)}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4",
                      "hover:border-primary/50 hover:bg-card",
                      selectedOption === value
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      selectedOption === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {currentQuestion.icons[index]}
                    </div>
                    <span className={cn(
                      "text-lg font-medium transition-colors",
                      selectedOption === value ? "text-foreground" : "text-foreground/80"
                    )}>
                      {currentQuestionText.options[index]}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Continue Button */}
              <motion.button
                onClick={handleContinue}
                disabled={!selectedOption}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full mt-8 py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all duration-200",
                  selectedOption
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {t.continue}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={`result-${language}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              {/* Result Card */}
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
                <div className="text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    {t.yourIdealPerfume}
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-2">
                    {result?.name}
                  </h1>
                  
                  <p className="text-accent text-lg font-medium mb-6">
                    {result?.tagline}
                  </p>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {result?.description}
                  </p>

                  {/* Notes */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {result?.notes.map((note) => (
                      <span
                        key={note}
                        className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Emotional Message */}
                  <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
                    <p className="text-foreground/90 italic text-lg leading-relaxed">
                      &ldquo;{result?.emotionalMessage}&rdquo;
                    </p>
                  </div>

                  {/* Restart Button */}
                  <button
                    onClick={handleRestart}
                    className="text-primary font-medium hover:underline underline-offset-4 transition-all"
                  >
                    {t.redoQuiz}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
