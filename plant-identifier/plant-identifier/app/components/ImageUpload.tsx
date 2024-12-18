'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { identifyMedicine } from '../actions/identifyMedicine'
import MedicineInfo from './MedicineInfo'
import { Camera, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [medicineInfo, setMedicineInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile)
    setLoading(true)
    setError(null)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
    
    try {
      const result = await identifyMedicine(selectedFile)
      setMedicineInfo(result)
    } catch (error) {
      console.error('Error identifying medicine:', error)
      setError(error instanceof Error ? error.message : 'Une erreur inconnue est survenue')
    }
    setLoading(false)
  }

  //const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //  e.preventDefault()
  //  if (file) {
  //    setLoading(true)
  //    setError(null)
  //    try {
  //      const result = await identifyMedicine(file)
  //      setMedicineInfo(result)
  //    } catch (error) {
  //      console.error('Error identifying medicine:', error)
  //      setError(error instanceof Error ? error.message : 'Une erreur inconnue est survenue')
  //    }
  //    setLoading(false)
  //  }
  //}

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg border-none mb-6">
        <CardContent className="flex justify-center space-x-12 p-6">
          <motion.div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
              <Upload size={56} className="text-white" />
            </div>
            <span className="text-blue-800 font-medium text-lg">Télécharger</span>
          </motion.div>
          <motion.div 
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
              <Camera size={56} className="text-white" />
            </div>
            <span className="text-blue-800 font-medium text-lg">Photo</span>
          </motion.div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <AnimatePresence>
        {preview && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img src={preview} alt="Aperçu" className="max-w-full h-auto rounded-lg shadow-md" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {loading && (
          <motion.div
            className="flex justify-center items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4"
            role="alert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {medicineInfo && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <MedicineInfo info={medicineInfo} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

