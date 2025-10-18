import { motion } from 'framer-motion'
import { Award, Calendar, Navigation } from 'lucide-react'

import { Navbar } from '@/layout/Navbar'

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

const infoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function HeroPage() {
  return (
    <>
      <Navbar />
      <div
        className="relative flex items-center justify-center w-screen h-screen bg-red-300 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/background-stadium.webp')",
        }}
      >
        {/* Overlay de color */}
        <div className="absolute inset-0 bg-[#0d1028] opacity-77 mix-blend-multiply"></div>

        <motion.div
          className="flex flex-col items-center w-full gap-10 px-4 z-1 font-montserrat"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Titulo general */}
          <motion.div className="flex flex-col gap-4" variants={titleVariants}>
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl leading-11 sm:leading-13">Gran Campeonato</h1>
            <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
              <span>Octubre </span>
              <motion.span className="text-accent" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                2
              </motion.span>
              <motion.span className="text-brand-magenta" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                0
              </motion.span>
              <span>2</span>
              <motion.span className="text-brand-cyan" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                5
              </motion.span>
            </h2>

            {/* Organizador */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-2 sm:mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-brand-cyan/20 via-brand-magenta/20 to-accent/20 backdrop-blur-sm border border-white/20 rounded-full">
                <Award size={18} className="text-brand-cyan shrink-0" />
                <p className="text-xs sm:text-sm font-semibold text-white/90 tracking-wide">
                  Organizado por el <span className="text-brand-cyan">Departamento de Calidad de Software</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Fecha y lugar */}
          <motion.div className="flex flex-col items-center gap-3 text-sm sm:text-base sm:gap-10 sm:flex-row" variants={infoVariants}>
            <motion.a
              href="https://maps.app.goo.gl/e2QUNsus2zXPVZtB6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white transition-colors hover:text-brand-magenta"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Navigation size={20} className="text-brand-magenta" />
              <span>Leoncio Prado 514 "Club Deportivo Casona Moya"</span>
            </motion.a>
            <motion.div className="flex items-center gap-2 text-white" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Calendar size={20} className="text-brand-magenta" />
              <span>Sabado, 18 de octubre</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
