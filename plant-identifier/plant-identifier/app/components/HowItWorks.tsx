'use client'

import { motion } from 'framer-motion'
import { Upload, Search, Info } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Télécharger l'image",
      description: "Prenez une photo ou téléchargez une image existante du médicament que vous souhaitez identifier."
    },
    {
      icon: Search,
      title: "Analyse IA",
      description: "Notre IA avancée analyse l'image pour identifier le médicament et ses caractéristiques."
    },
    {
      icon: Info,
      title: "Obtenir les Informations",
      description: "Recevez des informations détaillées sur le médicament, incluant son nom, sa composition et son utilisation."
    }
  ]

  return (
    <motion.section 
      className="w-full max-w-7xl px-4 mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Comment ça marche</h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-slate-900 text-white border-none h-full">
              <CardContent className="flex flex-col items-center text-center pt-6 h-full">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-300 flex-grow">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

