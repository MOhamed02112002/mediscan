'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Assurez-vous d'avoir défini cette variable d'environnement
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || 'AIzaSyBDaLIkZfEOYcqMeiJQyOwtcMwiO73bsPk'

if (!API_KEY || API_KEY === 'AIzaSyBDaLIkZfEOYcqMeiJQyOwtcMwiO73bsPk') {
  console.warn('Attention: Utilisation de la clé API par défaut. Il est recommandé de définir votre propre clé API dans les variables d\'environnement.')
}

const genAI = new GoogleGenerativeAI(API_KEY)

export async function identifyPlant(file: File) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    const prompt = "Identifiez cette plante et fournissez son nom commun, son nom scientifique et une brève description."

    const imageData = await file.arrayBuffer()
    const image = {
      inlineData: {
        data: Buffer.from(imageData).toString('base64'),
        mimeType: file.type
      }
    }

    const result = await model.generateContent([prompt, image])
    const response = await result.response
    const text = response.text()

    // Analyser la réponse pour extraire les informations structurées
    const lines = text.split('\n')
    const name = lines.find(line => line.startsWith('Nom commun:'))?.split(':')[1].trim() || 'Inconnu'
    const scientificName = lines.find(line => line.startsWith('Nom scientifique:'))?.split(':')[1].trim() || 'Inconnu'
    const description = lines.slice(2).join(' ').trim()

    return {
      name,
      scientificName,
      description
    }
  } catch (error) {
    console.error('Erreur lors de l\'identification de la plante:', error)
    throw new Error('Impossible d\'identifier la plante')
  }
}

