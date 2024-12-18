import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Header() {
  return (
    <motion.header 
      className="bg-white shadow-md py-4 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-center items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-2xl font-bold text-blue-600">MediScan</span>
        </Link>
      </div>
    </motion.header>
  )
}

