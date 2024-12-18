'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// This would typically come from a database or state management
const recentMedicines = [
  { id: 1, name: "Paracétamol", image: "/placeholder.svg" },
  { id: 2, name: "Ibuprofène", image: "/placeholder.svg" },
  { id: 3, name: "Aspirine", image: "/placeholder.svg" },
  // Add more recent medicines as needed
]

export default function RecentMedicines() {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Médicaments récents</h2>
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {recentMedicines.map((medicine) => (
            <CarouselItem key={medicine.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                  </CardContent>
                </Card>
                <p className="text-center mt-2">{medicine.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

