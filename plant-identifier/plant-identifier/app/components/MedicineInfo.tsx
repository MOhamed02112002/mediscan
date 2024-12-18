import { motion } from 'framer-motion'

interface MedicineInfoProps {
  info: {
    name: string
    therapeuticClass: string
    manufacturer: string
    activeIngredient: string
    form: string
    administration: string
    adultDosage: string
    childDosage: string
    storage: string
    description: string
    sideEffects: string
  }
}

export default function MedicineInfo({ info }: MedicineInfoProps) {
  const details = [
    { label: 'Classe thérapeutique', value: info.therapeuticClass },
    { label: 'Laboratoire', value: info.manufacturer },
    { label: 'Principe(s) actif(s)', value: info.activeIngredient },
    { label: 'Forme pharmaceutique', value: info.form },
    { label: 'Voie d\'administration', value: info.administration },
    { label: 'Conservation', value: info.storage },
  ]

  const dosageDetails = [
    { label: 'Dosage adultes', value: info.adultDosage },
    { label: 'Dosage enfants', value: info.childDosage },
  ]

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">{info.name}</h2>
        <p className="text-gray-700 mb-6">{info.description}</p>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Détails du médicament</h3>
          <div className="border rounded-lg overflow-hidden">
            {details.map((detail, index) => (
              <div 
                key={detail.label}
                className={`flex ${index !== details.length - 1 ? 'border-b' : ''}`}
              >
                <div className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                  {detail.label}
                </div>
                <div className="w-2/3 px-4 py-3 text-gray-800">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Posologie</h3>
          <div className="border rounded-lg overflow-hidden">
            {dosageDetails.map((detail, index) => (
              <div 
                key={detail.label}
                className={`flex ${index !== dosageDetails.length - 1 ? 'border-b' : ''}`}
              >
                <div className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                  {detail.label}
                </div>
                <div className="w-2/3 px-4 py-3 text-gray-800">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Effets secondaires fréquents</h3>
          <div className="border rounded-lg p-4 text-gray-800">
            <p>{info.sideEffects}</p>
            <p className="mt-2">Les effets secondaires peuvent inclure :</p>
            <ul className="list-disc list-inside mt-2">
              <li>Troubles gastro-intestinaux (nausées, vomissements, diarrhée)</li>
              <li>Maux de tête</li>
              <li>Vertiges</li>
              <li>Acouphènes (bourdonnements d'oreilles)</li>
              <li>Troubles de la vision</li>
              <li>Réactions cutanées (éruptions, démangeaisons)</li>
            </ul>
            <p className="mt-2">Dans de rares cas, des effets plus graves peuvent survenir. Consultez immédiatement un médecin si vous ressentez des symptômes inhabituels ou préoccupants.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

