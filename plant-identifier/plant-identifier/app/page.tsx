'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import ImageUpload from './components/ImageUpload'
import HowItWorks from './components/HowItWorks'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        className="h-1 bg-blue-600 fixed top-0 left-0 right-0 z-50 origin-left"
        style={{ scaleX }}
      />
      <motion.main 
        className="flex-grow bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-start p-4 space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-blue-800 mt-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Identificateur de Médicaments
        </motion.h1>
        <ImageUpload />
        <HowItWorks />
      </motion.main>
      <Footer />
    </div>
  )
}

