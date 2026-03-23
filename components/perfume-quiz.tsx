"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, GraduationCap, BookOpen, Award, FlaskConical, Scroll, FileText, MoreHorizontal, Droplets, Wind, TreePine, Flower2, Flame, HelpCircle, User, Globe, Brain, Zap, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Language = "pt" | "en" | "fr"

const translations = {
  pt: {
    brandName: "SCENT MATCH",
    of: "de",
    continue: "Continuar",
    start: "Começar",
    yourIdealEssence: "Sua essência ideal",
    redoQuiz: "Refazer o quiz",
    chosenBottle: "Frasco escolhido",
    essenceNotes: "Notas da essência",
    languageSelection: {
      title: "Escolha seu idioma",
      subtitle: "Selecione o idioma de sua preferência",
    },
    welcome: {
      greeting: "Olá, seja bem-vindo, estudante",
      subtitle: "Nos conte um pouco sobre você",
    },
    styleTitle: "Agora vamos entender seu estilo",
    questions: [
      {
        question: "Em qual nível de ensino você está?",
        subtitle: "Selecione sua fase acadêmica",
        options: ["Médio", "Superior", "Pós-graduação", "Mestrado", "Doutorado", "Concurso", "Outros"],
      },
      {
        question: "Qual tipo de perfume você mais gosta?",
        subtitle: "Escolha sua preferência olfativa",
        options: ["Doce", "Fresco", "Amadeirado", "Floral", "Marcante", "Não sei ainda"],
      },
      {
        question: "Como você se identifica?",
        subtitle: "Para personalizar sua recomendação",
        options: ["Homem", "Mulher", "Outros"],
      },
      {
        question: "Qual objetivo você busca?",
        subtitle: "O que você precisa no seu dia a dia",
        options: ["Memória e foco", "Energia mental - combate à fadiga de longas jornadas", "Melhora do humor e da clareza mental"],
      },
      {
        question: "Qual frasco da nossa linha você gostaria de usar?",
        subtitle: "Escolha o design que mais combina com você",
        options: ["Perfume 1", "Perfume 2", "Perfume 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clareza mental em cada nota",
        description: "Uma essência leve e refrescante que desperta sua concentração. Perfeita para longas sessões de estudo.",
        emotionalMessage: "Você está no caminho certo. Continue focado — cada momento de dedicação aproxima você dos seus sonhos.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "Energia que impulsiona você",
        description: "Uma essência vibrante que combate a fadiga e renova suas energias. Ideal para longas jornadas de estudo.",
        emotionalMessage: "Sua determinação é admirável. Cada passo conta, e você tem a força necessária para chegar onde deseja.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmonia para sua mente",
        description: "Uma essência acolhedora que melhora o humor e traz clareza mental. Perfeita para equilibrar seu dia a dia.",
        emotionalMessage: "Você merece esse momento de paz. Respire fundo e lembre-se: o equilíbrio é a chave para o sucesso.",
      },
    },
  },
  en: {
    brandName: "SCENT MATCH",
    of: "of",
    continue: "Continue",
    start: "Start",
    yourIdealEssence: "Your ideal essence",
    redoQuiz: "Retake the quiz",
    chosenBottle: "Chosen bottle",
    essenceNotes: "Essence notes",
    languageSelection: {
      title: "Choose your language",
      subtitle: "Select your preferred language",
    },
    welcome: {
      greeting: "Hello, welcome!",
      subtitle: "Tell us a little about yourself",
    },
    styleTitle: "Now let's understand your style",
    questions: [
      {
        question: "What is your current education level?",
        subtitle: "Select your academic stage",
        options: ["High School", "Undergraduate", "Postgraduate", "Master's", "Doctorate", "Civil Service Exam", "Other"],
      },
      {
        question: "What type of perfume do you prefer?",
        subtitle: "Choose your olfactory preference",
        options: ["Sweet", "Fresh", "Woody", "Floral", "Bold", "I'm not sure yet"],
      },
      {
        question: "How do you identify?",
        subtitle: "To personalize your recommendation",
        options: ["Man", "Woman", "Other"],
      },
      {
        question: "What is your main goal?",
        subtitle: "What do you need in your daily life",
        options: [
          "Memory and focus",
          "Mental energy – helps combat fatigue from long days",
          "Improves your mood and mental clarity"
        ],
      },
      {
        question: "Which bottle from our collection would you like to use?",
        subtitle: "Choose the design that suits you best",
        options: ["Perfume 1", "Perfume 2", "Perfume 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Mental clarity in every note",
        description: "A light and refreshing essence that enhances your concentration. Perfect for long study sessions.",
        emotionalMessage: "You're on the right path. Stay focused—every moment of dedication brings you closer to your goals.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "Energy that drives you forward",
        description: "A vibrant essence that fights fatigue and renews your energy. Ideal for long study days.",
        emotionalMessage: "Your determination is admirable. Every step counts, and you have the strength to reach your goals.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmony for your mind",
        description: "A comforting essence that improves your mood and brings mental clarity. Perfect for balancing your day.",
        emotionalMessage: "You deserve this moment of peace. Take a deep breath and remember: balance is the key to success.",
      },
    },
  },
  fr: {
    brandName: "SCENT MATCH",
    of: "de",
    continue: "Continuer",
    start: "Commencer",
    yourIdealEssence: "Votre essence idéale",
    redoQuiz: "Refaire le quiz",
    chosenBottle: "Flacon choisi",
    essenceNotes: "Notes de l'essence",
    languageSelection: {
      title: "Choisissez votre langue",
      subtitle: "Sélectionnez votre langue préférée",
    },
    welcome: {
      greeting: "Bonjour, bienvenue !",
      subtitle: "Parlez-nous un peu de vous",
    },
    styleTitle: "Découvrons maintenant votre style",
    questions: [
      {
        question: "Quel est votre niveau d'études ?",
        subtitle: "Sélectionnez votre niveau académique",
        options: ["Lycée", "Licence", "Postgraduate", "Master", "Doctorat", "Concours", "Autre"],
      },
      {
        question: "Quel type de parfum préférez-vous ?",
        subtitle: "Choisissez votre préférence olfactive",
        options: ["Sucré", "Frais", "Boisé", "Floral", "Intense", "Je ne sais pas encore"],
      },
      {
        question: "Comment vous identifiez-vous ?",
        subtitle: "Pour personnaliser votre recommandation",
        options: ["Homme", "Femme", "Autre"],
      },
      {
        question: "Quel est votre objectif ?",
        subtitle: "Ce dont vous avez besoin au quotidien",
        options: [
          "Mémoire et concentration",
          "Énergie mentale – aide à combattre la fatigue des longues journées",
          "Améliore l'humeur et la clarté mentale"
        ],
      },
      {
        question: "Quel flacon de notre collection souhaitez-vous utiliser ?",
        subtitle: "Choisissez le design qui vous correspond le mieux",
        options: ["Parfum 1", "Parfum 2", "Parfum 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clarté mentale à chaque note",
        description: "Une essence légère et rafraîchissante qui améliore votre concentration. Parfaite pour les longues sessions d'étude.",
        emotionalMessage: "Vous êtes sur la bonne voie. Restez concentré : chaque effort vous rapproche de vos objectifs.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "Une énergie qui vous propulse",
        description: "Une essence vibrante qui combat la fatigue et renouvelle votre énergie. Idéale pour les longues journées d'étude.",
        emotionalMessage: "Votre détermination est admirable. Chaque pas compte, et vous avez la force d'atteindre vos objectifs.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmonie pour votre esprit",
        description: "Une essence apaisante qui améliore l'humeur et apporte de la clarté mentale. Parfaite pour équilibrer votre quotidien.",
        emotionalMessage: "Vous méritez ce moment de paix. Respirez profondément et rappelez-vous : l'équilibre est la clé du succès.",
      },
    },
  }
}

const languageLabels: Record<Language, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
}

const languageFullNames: Record<Language, string> = {
  pt: "Portugues",
  en: "English",
  fr: "Francais",
}

const languageFlags: Record<Language, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  fr: "🇫🇷",
}

interface Question {
  id: number
  values: string[]
  icons: React.ReactNode[]
  isBottleQuestion?: boolean
}

const questionData: Question[] = [
  {
    id: 1,
    values: ["medio", "superior", "pos", "mestrado", "doutorado", "concurso", "outros"],
    icons: [
      <BookOpen key="book" className="w-5 h-5" />,
      <GraduationCap key="grad" className="w-5 h-5" />,
      <Award key="award" className="w-5 h-5" />,
      <FlaskConical key="flask" className="w-5 h-5" />,
      <Scroll key="scroll" className="w-5 h-5" />,
      <FileText key="file" className="w-5 h-5" />,
      <MoreHorizontal key="more" className="w-5 h-5" />,
    ],
  },
  {
    id: 2,
    values: ["doce", "fresco", "amadeirado", "floral", "marcante", "naosei"],
    icons: [
      <Droplets key="drop" className="w-5 h-5" />,
      <Wind key="wind" className="w-5 h-5" />,
      <TreePine key="tree" className="w-5 h-5" />,
      <Flower2 key="flower" className="w-5 h-5" />,
      <Flame key="flame" className="w-5 h-5" />,
      <HelpCircle key="help" className="w-5 h-5" />,
    ],
  },
  {
    id: 3,
    values: ["homem", "mulher", "outros"],
    icons: [
      <User key="man" className="w-5 h-5" />,
      <User key="woman" className="w-5 h-5" />,
      <User key="other" className="w-5 h-5" />,
    ],
  },
  {
    id: 4,
    values: ["foco", "energia", "humor"],
    icons: [
      <Brain key="brain" className="w-5 h-5" />,
      <Zap key="zap" className="w-5 h-5" />,
      <Sparkles key="sparkles" className="w-5 h-5" />,
    ],
  },
  {
    id: 5,
    values: ["perfume1", "perfume2", "perfume3"],
    icons: [],
    isBottleQuestion: true,
  },
]

const bottleImages = [
  {
    id: "perfume1",
    name: "Perfume 1",
    src: "/images/perfume1.png",
  },
  {
    id: "perfume2",
    name: "Perfume 2",
    src: "/images/perfume2.png",
  },
  {
    id: "perfume3",
    name: "Perfume 3",
    src: "/images/perfume3.png",
  },
]

interface EssenceResult {
  name: string
  tagline: string
  description: string
  emotionalMessage: string
  notes: string[]
  bottle: string
  bottleImage: string
}

const getResult = (answers: Record<number, string>, lang: Language): EssenceResult => {
  const objective = answers[4]
  const bottle = answers[5]
  const t = translations[lang].results

  const getNotes = (objective: string) => {
    if (objective === "foco") {
      if (lang === "pt") return ["Alecrim", "Menta", "Eucalipto"]
      if (lang === "en") return ["Rosemary", "Mint", "Eucalyptus"]
      return ["Romarin", "Menthe", "Eucalyptus"]
    }
    if (objective === "energia") {
      if (lang === "pt") return ["Laranja", "Gengibre", "Cardamomo"]
      if (lang === "en") return ["Orange", "Ginger", "Cardamom"]
      return ["Orange", "Gingembre", "Cardamome"]
    }
    if (lang === "pt") return ["Lavanda", "Camomila", "Bergamota"]
    if (lang === "en") return ["Lavender", "Chamomile", "Bergamot"]
    return ["Lavande", "Camomille", "Bergamote"]
  }

  const getBottleName = (bottle: string) => {
    if (bottle === "perfume1") return "Perfume 1"
    if (bottle === "perfume2") return "Perfume 2"
    return "Perfume 3"
  }

  const getBottleImage = (bottle: string) => {
    if (bottle === "perfume1") return "/images/perfume1.png"
    if (bottle === "perfume2") return "/images/perfume2.png"
    return "/images/perfume3.png"
  }

  if (objective === "foco") {
    return {
      ...t.focusMode,
      notes: getNotes(objective),
      bottle: getBottleName(bottle),
      bottleImage: getBottleImage(bottle),
    }
  }

  if (objective === "energia") {
    return {
      ...t.energyBoost,
      notes: getNotes(objective),
      bottle: getBottleName(bottle),
      bottleImage: getBottleImage(bottle),
    }
  }

  return {
    ...t.moodBalance,
    notes: getNotes(objective),
    bottle: getBottleName(bottle),
    bottleImage: getBottleImage(bottle),
  }
}

export interface QuizResponse {
  id: string
  timestamp: string
  language: Language
  answers: {
    educationLevel: string
    perfumeType: string
    gender: string
    objective: string
    bottle: string
  }
  result: {
    essenceName: string
    bottleName: string
  }
}

export function PerfumeQuiz() {
  const [language, setLanguage] = useState<Language | null>(null)
  const [currentStep, setCurrentStep] = useState(-2) // -2: language selection, -1: welcome, 0+: questions
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const t = language ? translations[language] : translations.pt
  const totalSteps = questionData.length
  const progress = currentStep < 0 ? 0 : ((currentStep + 1) / totalSteps) * 100
  const currentQuestion = currentStep >= 0 ? questionData[currentStep] : null
  const currentQuestionText = currentStep >= 0 ? t.questions[currentStep] : null

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setCurrentStep(-1)
  }

  const handleStart = () => {
    setCurrentStep(0)
  }

  const saveResponse = async (finalAnswers: Record<number, string>) => {
    if (!language) return
    
    const result = getResult(finalAnswers, language)
    
    const response: Omit<QuizResponse, "id" | "timestamp"> = {
      language,
      answers: {
        educationLevel: finalAnswers[1],
        perfumeType: finalAnswers[2],
        gender: finalAnswers[3],
        objective: finalAnswers[4],
        bottle: finalAnswers[5],
      },
      result: {
        essenceName: result.name,
        bottleName: result.bottle,
      },
    }

    try {
      setIsSaving(true)
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      })
    } catch (error) {
      console.error("Failed to save response:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleContinue = async () => {
    if (!selectedOption || !currentQuestion) return

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentStep < questionData.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await saveResponse(newAnswers)
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(-2)
    setLanguage(null)
    setAnswers({})
    setSelectedOption(null)
    setShowResult(false)
  }

  const result = showResult && language ? getResult(answers, language) : null

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
            {currentStep >= 0 && !showResult && (
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} {t.of} {totalSteps}
              </span>
            )}
            {language && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium text-muted-foreground">
                <Globe className="w-4 h-4" />
                {languageLabels[language]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-12">
        <AnimatePresence mode="wait">
          {/* Language Selection Screen */}
          {currentStep === -2 && !showResult && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-md text-center"
            >
              <div className="mb-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground tracking-wide">SCENT MATCH</span>
              </div>

              <div className="flex flex-col gap-3">
                {(Object.keys(languageLabels) as Language[]).map((lang, index) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-5 rounded-2xl border-2 border-border bg-card transition-all duration-200 flex items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 group"
                  >
                    <span className="text-2xl">{languageFlags[lang]}</span>
                    <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {languageFullNames[lang]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Welcome Screen */}
          {currentStep === -1 && !showResult && language && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg text-center"
            >
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance mb-4">
                  {t.welcome.greeting}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {t.welcome.subtitle}
                </p>
              </div>

              <motion.button
                onClick={handleStart}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                {t.start}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Questions */}
          {currentStep >= 0 && !showResult && currentQuestion && currentQuestionText && language && (
            <motion.div
              key={`${currentStep}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              {/* Section Title for Style Questions */}
              {currentStep === 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-primary font-medium mb-2"
                >
                  {t.styleTitle}
                </motion.p>
              )}

              {/* Question */}
              <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight text-balance">
                  {currentQuestionText.question}
                </h1>
                <p className="mt-3 text-muted-foreground text-base">
                  {currentQuestionText.subtitle}
                </p>
              </div>

              {/* Options */}
              {currentQuestion.isBottleQuestion ? (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {bottleImages.map((bottle, index) => (
                    <motion.button
                      key={bottle.id}
                      onClick={() => handleOptionSelect(currentQuestion.values[index])}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative p-3 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3",
                        "hover:border-primary/50",
                        selectedOption === currentQuestion.values[index]
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card"
                      )}
                    >
                      {selectedOption === currentQuestion.values[index] && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                        <Image
                          src={bottle.src}
                          alt={bottle.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {currentQuestionText.options[index]}
                      </span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 mb-8">
                  {currentQuestionText.options.map((option, index) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect(currentQuestion.values[index])}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4",
                        "hover:border-primary/50 hover:bg-muted/50",
                        selectedOption === currentQuestion.values[index]
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                          selectedOption === currentQuestion.values[index]
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {currentQuestion.icons[index]}
                      </div>
                      <span
                        className={cn(
                          "text-base font-medium text-left",
                          selectedOption === currentQuestion.values[index]
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {option}
                      </span>
                      {selectedOption === currentQuestion.values[index] && (
                        <Check className="w-5 h-5 ml-auto text-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Continue Button */}
              <motion.button
                onClick={handleContinue}
                disabled={selectedOption === null || isSaving}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all duration-200",
                  selectedOption !== null && !isSaving
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {isSaving ? "Salvando..." : t.continue}
                {!isSaving && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </motion.div>
          )}

          {/* Result */}
          {showResult && result && language && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              <div className="text-center mb-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-primary font-medium mb-2"
                >
                  {t.yourIdealEssence}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-2"
                >
                  {result.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg italic"
                >
                  {result.tagline}
                </motion.p>
              </div>

              {/* Bottle Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="relative w-48 h-64 mx-auto mb-8"
              >
                <Image
                  src={result.bottleImage}
                  alt={result.bottle}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Result Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-6"
              >
                <p className="text-foreground leading-relaxed mb-6">
                  {result.description}
                </p>

                <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                  <span className="text-sm font-medium text-muted-foreground">{t.chosenBottle}:</span>
                  <span className="text-sm font-semibold text-foreground">{result.bottle}</span>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground block mb-3">{t.essenceNotes}:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.notes.map((note, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Emotional Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8"
              >
                <p className="text-foreground text-center leading-relaxed italic">
                  &ldquo;{result.emotionalMessage}&rdquo;
                </p>
              </motion.div>

              {/* Restart Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleRestart}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-xl font-medium text-lg border-2 border-border text-foreground hover:bg-muted transition-all duration-200"
              >
                {t.redoQuiz}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
