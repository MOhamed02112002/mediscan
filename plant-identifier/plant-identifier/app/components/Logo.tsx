import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <rect width="40" height="40" rx="8" fill="#3B82F6" />
      <path d="M12 14H28V30H12V14Z" fill="white" />
      <path d="M16 10H24V14H16V10Z" fill="white" />
      <path d="M18 18H22V26H18V18Z" fill="#3B82F6" />
      <path d="M15 22H25V24H15V22Z" fill="#3B82F6" />
    </motion.svg>
  )
}

