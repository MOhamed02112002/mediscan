interface PlantInfoProps {
  info: {
    name: string
    scientificName: string
    description: string
  }
}

export default function PlantInfo({ info }: PlantInfoProps) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-green-800 mb-4">{info.name}</h2>
      <p className="text-gray-600 mb-2"><span className="font-bold">Nom scientifique:</span> {info.scientificName}</p>
      <p className="text-gray-700">{info.description}</p>
    </div>
  )
}

