"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  FlaskConical, 
  Target, 
  Users, 
  TrendingUp, 
  Clock,
  RefreshCw,
  Brain,
  Zap,
  Sparkles,
  GraduationCap,
  Droplets,
  Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuizResponse {
  id: string
  timestamp: string
  language: string
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

interface Stats {
  totalResponses: number
  bottleDistribution: Record<string, number>
  objectiveDistribution: Record<string, number>
  genderDistribution: Record<string, number>
  perfumeTypeDistribution: Record<string, number>
  educationDistribution: Record<string, number>
  languageDistribution: Record<string, number>
}

const objectiveLabels: Record<string, string> = {
  foco: "Memoria e Foco",
  energia: "Energia Mental",
  humor: "Humor e Clareza",
}

const objectiveIcons: Record<string, React.ReactNode> = {
  foco: <Brain className="w-4 h-4" />,
  energia: <Zap className="w-4 h-4" />,
  humor: <Sparkles className="w-4 h-4" />,
}

const bottleLabels: Record<string, string> = {
  bottle1: "Bottle 1",
  bottle2: "Bottle 2",
  bottle3: "Bottle 3",
}

const genderLabels: Record<string, string> = {
  homem: "Homem",
  mulher: "Mulher",
  outros: "Outros",
}

const educationLabels: Record<string, string> = {
  medio: "Ensino Medio",
  superior: "Ensino Superior",
  pos: "Pos-graduacao",
  mestrado: "Mestrado",
  doutorado: "Doutorado",
  concurso: "Concurso",
  outros: "Outros",
}

const perfumeTypeLabels: Record<string, string> = {
  doce: "Doce",
  fresco: "Fresco",
  amadeirado: "Amadeirado",
  floral: "Floral",
  marcante: "Marcante",
  naosei: "Nao sei ainda",
}

const languageLabels: Record<string, string> = {
  pt: "Portugues",
  en: "English",
  fr: "Francais",
}

type AdminLanguage = "pt" | "en"

const adminTranslations = {
  pt: {
    dashboardTitle: "Dashboard Admin",
    analytics: "Analytics",
    refresh: "Atualizar",
    totalResponses: "Total Respostas",
    favoriteBottle: "Frasco Favorito",
    mainObjective: "Objetivo Principal",
    favoritePerfume: "Perfume Favorito",
    overview: "Visao Geral",
    responses: "Respostas",
    bottleDistribution: "Distribuicao de Frascos",
    objectiveDistribution: "Distribuicao de Objetivos",
    educationDistribution: "Distribuicao por Ensino",
    perfumeTypeDistribution: "Distribuicao por Tipo de Perfume",
    genderDistribution: "Distribuicao por Genero",
    languageDistribution: "Distribuicao por Idioma",
    responseHistory: "Historico de Respostas",
    noResponsesYet: "Nenhuma resposta ainda",
    noResponsesRegistered: "Nenhuma resposta registrada ainda",
    responsesWillAppear: "As respostas do quiz aparecerao aqui",
    date: "Data",
    language: "Idioma",
    education: "Ensino",
    perfumeType: "Tipo Perfume",
    gender: "Genero",
    objective: "Objetivo",
    bottle: "Frasco",
    essence: "Essencia",
  },
  en: {
    dashboardTitle: "Admin Dashboard",
    analytics: "Analytics",
    refresh: "Refresh",
    totalResponses: "Total Responses",
    favoriteBottle: "Favorite Bottle",
    mainObjective: "Main Objective",
    favoritePerfume: "Favorite Perfume",
    overview: "Overview",
    responses: "Responses",
    bottleDistribution: "Bottle Distribution",
    objectiveDistribution: "Objective Distribution",
    educationDistribution: "Education Distribution",
    perfumeTypeDistribution: "Perfume Type Distribution",
    genderDistribution: "Gender Distribution",
    languageDistribution: "Language Distribution",
    responseHistory: "Response History",
    noResponsesYet: "No responses yet",
    noResponsesRegistered: "No responses registered yet",
    responsesWillAppear: "Quiz responses will appear here",
    date: "Date",
    language: "Language",
    education: "Education",
    perfumeType: "Perfume Type",
    gender: "Gender",
    objective: "Objective",
    bottle: "Bottle",
    essence: "Essence",
  },
}

function calculateStats(responses: QuizResponse[]): Stats {
  const stats: Stats = {
    totalResponses: responses.length,
    bottleDistribution: {},
    objectiveDistribution: {},
    genderDistribution: {},
    perfumeTypeDistribution: {},
    educationDistribution: {},
    languageDistribution: {},
  }

  responses.forEach((response) => {
    const { bottle, objective, gender, perfumeType, educationLevel } = response.answers
    const { language } = response

    stats.bottleDistribution[bottle] = (stats.bottleDistribution[bottle] || 0) + 1
    stats.objectiveDistribution[objective] = (stats.objectiveDistribution[objective] || 0) + 1
    stats.genderDistribution[gender] = (stats.genderDistribution[gender] || 0) + 1
    stats.perfumeTypeDistribution[perfumeType] = (stats.perfumeTypeDistribution[perfumeType] || 0) + 1
    stats.educationDistribution[educationLevel] = (stats.educationDistribution[educationLevel] || 0) + 1
    stats.languageDistribution[language] = (stats.languageDistribution[language] || 0) + 1
  })

  return stats
}

function getPercentage(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0
}

function DistributionBar({ 
  label, 
  value, 
  total, 
  color 
}: { 
  label: string
  value: number
  total: number
  color: string 
}) {
  const percentage = getPercentage(value, total)
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value} ({percentage}%)</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

const barColors = [
  "bg-primary",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-violet-500",
  "bg-orange-500",
]

export default function AdminDashboard() {
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminLang, setAdminLang] = useState<AdminLanguage>("pt")
  const [hasFetched, setHasFetched] = useState(false)

  const t = adminTranslations[adminLang]

  const fetchResponses = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/responses")
      if (!res.ok) throw new Error("Failed to fetch responses")
      const data = await res.json()
      setResponses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados")
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }

  useEffect(() => {
    fetchResponses()
  }, [])

  const stats = calculateStats(responses)

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMostPopular = (distribution: Record<string, number>, labels: Record<string, string>) => {
    const entries = Object.entries(distribution)
    if (entries.length === 0) return "-"
    const sorted = entries.sort((a, b) => b[1] - a[1])
    return labels[sorted[0][0]] || sorted[0][0]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{t.dashboardTitle}</h1>
              <p className="text-sm text-muted-foreground">Essence and Presence Collection - {t.analytics}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setAdminLang("pt")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  adminLang === "pt" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setAdminLang("en")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  adminLang === "en" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchResponses}
              disabled={loading && hasFetched}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading && hasFetched ? "animate-spin" : ""}`} />
              {t.refresh}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalResponses}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalResponses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.favoriteBottle}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {getMostPopular(stats.bottleDistribution, bottleLabels)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.mainObjective}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {getMostPopular(stats.objectiveDistribution, objectiveLabels)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.favoritePerfume}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {getMostPopular(stats.perfumeTypeDistribution, perfumeTypeLabels)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="responses">{t.responses}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bottle Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FlaskConical className="w-5 h-5 text-primary" />
{t.bottleDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.bottleDistribution).map(([bottle, count], index) => (
                        <DistributionBar
                          key={bottle}
                          label={bottleLabels[bottle] || bottle}
                          value={count}
                          total={stats.totalResponses}
                          color={barColors[index % barColors.length]}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Objective Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-primary" />
{t.objectiveDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.objectiveDistribution).map(([objective, count], index) => (
                        <div key={objective} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground">
                              {objectiveIcons[objective]}
                              {objectiveLabels[objective] || objective}
                            </span>
                            <span className="font-medium text-foreground">
                              {count} ({getPercentage(count, stats.totalResponses)}%)
                            </span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${getPercentage(count, stats.totalResponses)}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${barColors[index % barColors.length]}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Education Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <GraduationCap className="w-5 h-5 text-primary" />
{t.educationDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.educationDistribution).map(([education, count], index) => (
                        <DistributionBar
                          key={education}
                          label={educationLabels[education] || education}
                          value={count}
                          total={stats.totalResponses}
                          color={barColors[index % barColors.length]}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Perfume Type Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Droplets className="w-5 h-5 text-primary" />
{t.perfumeTypeDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.perfumeTypeDistribution).map(([type, count], index) => (
                        <DistributionBar
                          key={type}
                          label={perfumeTypeLabels[type] || type}
                          value={count}
                          total={stats.totalResponses}
                          color={barColors[index % barColors.length]}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Gender Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-primary" />
{t.genderDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.genderDistribution).map(([gender, count], index) => (
                        <DistributionBar
                          key={gender}
                          label={genderLabels[gender] || gender}
                          value={count}
                          total={stats.totalResponses}
                          color={index === 0 ? "bg-blue-500" : index === 1 ? "bg-pink-500" : "bg-violet-500"}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Language Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="w-5 h-5 text-primary" />
{t.languageDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats.totalResponses === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{t.noResponsesYet}</p>
                    ) : (
                      Object.entries(stats.languageDistribution).map(([lang, count], index) => (
                        <DistributionBar
                          key={lang}
                          label={languageLabels[lang] || lang}
                          value={count}
                          total={stats.totalResponses}
                          color={index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-red-500"}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="responses">
            {/* Responses Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5 text-primary" />
{t.responseHistory}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {responses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                        <Users className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">{t.noResponsesRegistered}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t.responsesWillAppear}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t.date}</TableHead>
                            <TableHead>{t.language}</TableHead>
                            <TableHead>{t.education}</TableHead>
                            <TableHead>{t.perfumeType}</TableHead>
                            <TableHead>{t.gender}</TableHead>
                            <TableHead>{t.objective}</TableHead>
                            <TableHead>{t.bottle}</TableHead>
                            <TableHead>{t.essence}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responses
                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                            .map((response) => (
                              <TableRow key={response.id}>
                                <TableCell className="text-muted-foreground whitespace-nowrap">
                                  {formatDate(response.timestamp)}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {response.language.toUpperCase()}
                                  </Badge>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                  {educationLabels[response.answers.educationLevel] || response.answers.educationLevel}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                  {perfumeTypeLabels[response.answers.perfumeType] || response.answers.perfumeType}
                                </TableCell>
                                <TableCell>
                                  {genderLabels[response.answers.gender] || response.answers.gender}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2 whitespace-nowrap">
                                    {objectiveIcons[response.answers.objective]}
                                    <span>{objectiveLabels[response.answers.objective] || response.answers.objective}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {bottleLabels[response.answers.bottle] || response.answers.bottle}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                    {response.result.essenceName}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
