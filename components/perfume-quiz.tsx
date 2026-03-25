"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, GraduationCap, BookOpen, Award, FlaskConical, Scroll, FileText, MoreHorizontal, Droplets, Wind, TreePine, Flower2, Flame, HelpCircle, User, Globe, Brain, Zap, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Language = "pt" | "en" | "fr"

const translations = {
  pt: {
    brandName: "Essence and Presence Collection",
    of: "de",
    continue: "Continuar",
    start: "Comecar",
    yourIdealEssence: "Sua essencia ideal",
    redoQuiz: "Refazer o quiz",
    chosenBottle: "Frasco escolhido",
    essenceNotes: "Notas da essencia",
    languageSelection: {
      title: "Escolha seu idioma",
      subtitle: "Selecione o idioma de sua preferencia",
    },
    welcome: {
      greeting: "Ola, seja bem-vindo estudante",
      subtitle: "Nos conte um pouco sobre voce",
    },
    styleTitle: "Agora vamos entender seu estilo",
    questions: [
      {
        question: "Qual ensino voce esta?",
        subtitle: "Selecione sua fase academica",
        options: ["Medio", "Superior", "Pos-graduacao", "Mestrado", "Doutorado", "Concurso", "Outros"],
      },
      {
        question: "Qual tipo de perfume voce mais gosta?",
        subtitle: "Escolha sua preferencia olfativa",
        options: ["Doce", "Fresco", "Amadeirado", "Floral", "Marcante", "Nao sei ainda"],
      },
      {
        question: "Como voce se identifica?",
        subtitle: "Para personalizar sua recomendacao",
        options: ["Homem", "Mulher", "Outros"],
      },
      {
        question: "Qual o objetivo que voce busca?",
        subtitle: "O que voce precisa no seu dia a dia",
        options: ["Memoria e foco", "Energia mental - combate a fadiga de longas jornadas", "Melhora o humor e a clareza mental"],
      },
      {
        question: "Qual frasco da nossa linha voce gostaria de usar?",
        subtitle: "Escolha o design que mais combina com voce",
        options: ["Bottle 1", "Bottle 2", "Bottle 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clareza mental em cada nota",
        description: "Uma essencia leve e refrescante que desperta sua concentracao. Perfeita para longas sessoes de estudo.",
        emotionalMessage: "Voce esta no caminho certo. Continue focado, cada momento de dedicacao te aproxima dos seus sonhos.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "Energia que te impulsiona",
        description: "Uma essencia vibrante que combate a fadiga e renova suas energias. Ideal para longas jornadas de estudo.",
        emotionalMessage: "Sua determinacao e admiravel. Cada passo conta, e voce tem a forca necessaria para chegar onde deseja.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmonia para sua mente",
        description: "Uma essencia acolhedora que melhora o humor e traz clareza mental. Perfeita para equilibrar seu dia a dia.",
        emotionalMessage: "Voce merece esse momento de paz. Respire fundo e lembre-se: o equilibrio e a chave para o sucesso.",
      },
    },
  },
  en: {
    brandName: "Essence and Presence Collection",
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
      greeting: "Hello, welcome student",
      subtitle: "Tell us a little about yourself",
    },
    styleTitle: "Now let's understand your style",
    questions: [
      {
        question: "What education level are you at?",
        subtitle: "Select your academic phase",
        options: ["High School", "Undergraduate", "Postgraduate", "Master's", "Doctorate", "Civil Service Exam", "Other"],
      },
      {
        question: "What type of perfume do you like most?",
        subtitle: "Choose your olfactory preference",
        options: ["Sweet", "Fresh", "Woody", "Floral", "Bold", "I don't know yet"],
      },
      {
        question: "How do you identify?",
        subtitle: "To personalize your recommendation",
        options: ["Man", "Woman", "Other"],
      },
      {
        question: "What goal are you looking for?",
        subtitle: "What do you need in your daily life",
        options: ["Memory and focus", "Mental energy - combat fatigue from long days", "Improves mood and mental clarity"],
      },
      {
        question: "Which bottle from our line would you like to use?",
        subtitle: "Choose the design that suits you best",
        options: ["Bottle 1", "Bottle 2", "Bottle 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Mental clarity in every note",
        description: "A light and refreshing essence that awakens your concentration. Perfect for long study sessions.",
        emotionalMessage: "You are on the right path. Stay focused, every moment of dedication brings you closer to your dreams.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "Energy that drives you",
        description: "A vibrant essence that fights fatigue and renews your energy. Ideal for long study days.",
        emotionalMessage: "Your determination is admirable. Every step counts, and you have the strength to get where you want.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmony for your mind",
        description: "A welcoming essence that improves mood and brings mental clarity. Perfect for balancing your day.",
        emotionalMessage: "You deserve this moment of peace. Take a deep breath and remember: balance is the key to success.",
      },
    },
  },
  fr: {
    brandName: "Essence and Presence Collection",
    of: "sur",
    continue: "Continuer",
    start: "Commencer",
    yourIdealEssence: "Votre essence ideale",
    redoQuiz: "Refaire le quiz",
    chosenBottle: "Flacon choisi",
    essenceNotes: "Notes de l'essence",
    languageSelection: {
      title: "Choisissez votre langue",
      subtitle: "Selectionnez votre langue preferee",
    },
    welcome: {
      greeting: "Bonjour, bienvenue etudiant",
      subtitle: "Parlez-nous un peu de vous",
    },
    styleTitle: "Maintenant, comprenons votre style",
    questions: [
      {
        question: "Quel niveau d'etudes suivez-vous?",
        subtitle: "Selectionnez votre phase academique",
        options: ["Lycee", "Licence", "Post-graduation", "Master", "Doctorat", "Concours", "Autre"],
      },
      {
        question: "Quel type de parfum preferez-vous?",
        subtitle: "Choisissez votre preference olfactive",
        options: ["Sucre", "Frais", "Boise", "Floral", "Marquant", "Je ne sais pas encore"],
      },
      {
        question: "Comment vous identifiez-vous?",
        subtitle: "Pour personnaliser votre recommandation",
        options: ["Homme", "Femme", "Autre"],
      },
      {
        question: "Quel objectif recherchez-vous?",
        subtitle: "Ce dont vous avez besoin au quotidien",
        options: ["Memoire et concentration", "Energie mentale - combat la fatigue des longues journees", "Ameliore l'humeur et la clarte mentale"],
      },
      {
        question: "Quel flacon de notre gamme aimeriez-vous utiliser?",
        subtitle: "Choisissez le design qui vous correspond",
        options: ["Parfum 1", "Parfum 2", "Parfum 3"],
      },
    ],
    results: {
      focusMode: {
        name: "Focus Mode",
        tagline: "Clarte mentale dans chaque note",
        description: "Une essence legere et rafraichissante qui eveille votre concentration. Parfaite pour les longues sessions d'etude.",
        emotionalMessage: "Vous etes sur la bonne voie. Restez concentre, chaque moment de dedication vous rapproche de vos reves.",
      },
      energyBoost: {
        name: "Energy Boost",
        tagline: "L'energie qui vous propulse",
        description: "Une essence vibrante qui combat la fatigue et renouvelle votre energie. Ideale pour les longues journees d'etude.",
        emotionalMessage: "Votre determination est admirable. Chaque pas compte, et vous avez la force d'arriver ou vous voulez.",
      },
      moodBalance: {
        name: "Mood Balance",
        tagline: "Harmonie pour votre esprit",
        description: "Une essence accueillante qui ameliore l'humeur et apporte de la clarte mentale. Parfaite pour equilibrer votre quotidien.",
        emotionalMessage: "Vous meritez ce moment de paix. Respirez profondement et rappelez-vous: l'equilibre est la cle du succes.",
      },
    },
  },
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
    values: ["bottle1", "bottle2", "bottle3"],
    icons: [],
    isBottleQuestion: true,
  },
]

const bottleImages = [
  {
    id: "bottle1",
    name: "Bottle 1",
    src: "/images/bottle1.png",
  },
  {
    id: "bottle2",
    name: "Bottle 2",
    src: "/images/bottle2.png",
  },
  {
    id: "bottle3",
    name: "Bottle 3",
    src: "/images/bottle3.png",
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
      if (lang === "en") return ["Rosemary", "Cedarwood", "Sandalwood", "Vetiver + Black Pepper", "White Musk + Amber"]
      return ["Romarin", "Menthe", "Eucalyptus"]
    }
    if (objective === "energia") {
      if (lang === "pt") return ["Laranja", "Gengibre", "Cardamomo"]
      if (lang === "en") return ["Sicilian Lemon", "Bergamot", "Sweet Orange", "Ginger + Verbena", "Cedarwood + Ambroxan"]
      return ["Orange", "Gingembre", "Cardamome"]
    }
    if (lang === "pt") return ["Lavanda", "Camomila", "Bergamota"]
    if (lang === "en") return ["Lavender", "Geranium + White Tea", "Peppermint", "Musk", "Vetiver + Amber"]
    return ["Lavande", "Camomille", "Bergamote"]
  }

  const getBottleName = (bottle: string) => {
    if (bottle === "bottle1") return "Bottle 1"
    if (bottle === "bottle2") return "Bottle 2"
    return "Bottle 3"
  }

  const getBottleImage = (bottle: string) => {
    if (bottle === "bottle1") return "/images/bottle1.png"
    if (bottle === "bottle2") return "/images/bottle2.png"
    return "/images/bottle3.png"
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
  const [language] = useState<Language>("en") // Fixed to English
  const [currentStep, setCurrentStep] = useState(-1) // -1: welcome, 0+: questions
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const t = translations[language]
  const totalSteps = questionData.length
  const progress = currentStep < 0 ? 0 : ((currentStep + 1) / totalSteps) * 100
  const currentQuestion = currentStep >= 0 ? questionData[currentStep] : null
  const currentQuestionText = currentStep >= 0 ? t.questions[currentStep] : null

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
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
    setCurrentStep(-1)
    setAnswers({})
    setSelectedOption(null)
    setShowResult(false)
  }

  const result = showResult && language ? getResult(answers, language) : null

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-sm">
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-white/70"
            initial={{ width: 0 }}
            animate={{ width: showResult ? "100%" : `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white/60 tracking-wide">{t.brandName}</span>
          <div className="flex items-center gap-4">
            {currentStep >= 0 && !showResult && (
              <span className="text-sm text-white/60">
                {currentStep + 1} {t.of} {totalSteps}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-12">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {currentStep === -1 && !showResult && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg text-center"
            >
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white/80" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight text-balance mb-4">
                  {t.welcome.greeting}
                </h1>
                <p className="text-white/60 text-lg">
                  {t.welcome.subtitle}
                </p>
              </div>

              <motion.button
                onClick={handleStart}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-2 bg-white text-[#0a1628] hover:bg-white/90 transition-all duration-200"
              >
                {t.start}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Questions */}
          {currentStep >= 0 && !showResult && currentQuestion && currentQuestionText && (
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
                  className="text-center text-white/80 font-medium mb-2"
                >
                  {t.styleTitle}
                </motion.p>
              )}

              {/* Question */}
              <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight text-balance">
                  {currentQuestionText.question}
                </h1>
                <p className="mt-3 text-white/60 text-base">
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
                        "hover:border-white/50",
                        selectedOption === currentQuestion.values[index]
                          ? "border-white bg-white/10 shadow-sm"
                          : "border-white/20 bg-white/5"
                      )}
                    >
                      {selectedOption === currentQuestion.values[index] && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-4 h-4 text-[#0a1628]" />
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
                      <span className="text-sm font-medium text-white">
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
                        "hover:border-white/50 hover:bg-white/10",
                        selectedOption === currentQuestion.values[index]
                          ? "border-white bg-white/10 shadow-sm"
                          : "border-white/20 bg-white/5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                          selectedOption === currentQuestion.values[index]
                            ? "bg-white text-[#0a1628]"
                            : "bg-white/10 text-white/60"
                        )}
                      >
                        {currentQuestion.icons[index]}
                      </div>
                      <span
                        className={cn(
                          "text-base font-medium text-left",
                          selectedOption === currentQuestion.values[index]
                            ? "text-white"
                            : "text-white/60"
                        )}
                      >
                        {option}
                      </span>
                      {selectedOption === currentQuestion.values[index] && (
                        <Check className="w-5 h-5 ml-auto text-white" />
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
                    ? "bg-white text-[#0a1628] hover:bg-white/90"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                )}
              >
                {isSaving ? "Saving..." : t.continue}
                {!isSaving && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </motion.div>
          )}

          {/* Result */}
          {showResult && result && (
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
                  className="text-white/80 font-medium mb-2"
                >
                  {t.yourIdealEssence}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2"
                >
                  {result.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/60 text-lg italic"
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
                className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm mb-6"
              >
                <p className="text-white/80 leading-relaxed mb-6">
                  {result.description}
                </p>

                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
                  <span className="text-sm font-medium text-white/60">{t.chosenBottle}:</span>
                  <span className="text-sm font-semibold text-white">{result.bottle}</span>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-white/60 block mb-3">{t.essenceNotes}:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.notes.map((note, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium"
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
                className="bg-white/5 rounded-2xl p-6 border border-white/20 mb-8"
              >
                <p className="text-white text-center leading-relaxed italic">
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
                className="w-full py-4 px-6 rounded-xl font-medium text-lg border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-200"
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
