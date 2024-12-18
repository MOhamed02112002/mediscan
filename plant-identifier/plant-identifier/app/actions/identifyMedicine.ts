'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = 'AIzaSyDO0Kq0jGrSYk7CkRJ_TnsY5CK9KGUhSxE'

const genAI = new GoogleGenerativeAI(API_KEY)

export async function identifyMedicine(file: File) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `En utilisant votre base de connaissances, fournissez des informations détaillées sur le médicament dans cette image. 
    Incluez les informations suivantes de manière structurée :
    1. Nom du médicament
    2. Classe thérapeutique
    3. Laboratoire fabricant
    4. Principe(s) actif(s)
    5. Forme pharmaceutique
    6. Voie d'administration
    7. Dosage recommandé (adultes)
    8. Dosage recommandé (enfants)
    9. Contre-indications
    10. Conservation
    11. Description et utilisation
    12. Effets secondaires fréquents
    
    Veuillez fournir ces informations en français, même si le médicament est étranger.
    Basez-vous sur vos connaissances pharmaceutiques plutôt que sur la seule analyse de l'image.`

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

    if (!text) {
      throw new Error('Aucune réponse reçue de l\'API')
    }

    // Analyser la réponse pour extraire les informations structurées
    const lines = text.split('\n')
    return {
      name: extractInfo(lines, 'nom'),
      therapeuticClass: extractInfo(lines, 'classe thérapeutique'),
      manufacturer: extractInfo(lines, 'laboratoire'),
      activeIngredient: extractInfo(lines, 'principe actif'),
      form: extractInfo(lines, 'forme pharmaceutique'),
      administration: extractInfo(lines, 'voie d\'administration'),
      adultDosage: extractInfo(lines, 'dosage', 'adulte'),
      childDosage: extractInfo(lines, 'dosage', 'enfant'),
      contraindications: extractInfo(lines, 'contre-indication'),
      storage: extractInfo(lines, 'conservation'),
      description: extractInfo(lines, 'description'),
      sideEffects: extractInfo(lines, 'effets secondaires')
    }
  } catch (error) {
    console.error('Erreur détaillée lors de l\'identification du médicament:', error)
    throw new Error(`Impossible d'identifier le médicament: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

function extractInfo(lines: string[], key: string, subKey?: string): string {
  const line = lines.find(line => {
    const lowerLine = line.toLowerCase()
    if (subKey) {
      return lowerLine.includes(key) && lowerLine.includes(subKey)
    }
    return lowerLine.includes(key)
  })
  return line?.split(':')[1]?.trim() || 'Non spécifié'
}

