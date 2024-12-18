import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      className="bg-blue-800 text-white py-4 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 MediScan. Tous droits réservés.</p>
      </div>
    </motion.footer>
  )
}

