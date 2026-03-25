"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide text-center mb-12"
        >
          Essence and Presence Collection
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            href="/quiz"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white text-lg font-light tracking-wide transition-all duration-300 hover:scale-105"
          >
            <span>Discover Your Scent</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
