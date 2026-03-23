import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export interface QuizResponse {
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

const DATA_FILE = path.join(process.cwd(), "data", "responses.json")

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]))
  }
}

async function readResponses(): Promise<QuizResponse[]> {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE, "utf-8")
  return JSON.parse(data)
}

async function writeResponses(responses: QuizResponse[]) {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(responses, null, 2))
}

export async function GET() {
  try {
    const responses = await readResponses()
    return NextResponse.json(responses)
  } catch (error) {
    console.error("Error reading responses:", error)
    return NextResponse.json({ error: "Failed to read responses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const responses = await readResponses()
    
    const newResponse: QuizResponse = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...body,
    }
    
    responses.push(newResponse)
    await writeResponses(responses)
    
    return NextResponse.json(newResponse, { status: 201 })
  } catch (error) {
    console.error("Error saving response:", error)
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}
