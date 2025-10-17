import { motion } from 'framer-motion'
import { Award, FileText, Medal, Shield, Target, Trophy, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/Card'
import { FutbolIcon } from '@/icons/FutbolIcon'
import { VoleyIcon } from '@/icons/VoleyIcon'
import { SPORT_IDS } from '@/pages/partidos/constants/sportIds'
import { getAllEquiposWithoutPlayersService } from '@/services/equipo.service'

import { HeroPage } from './components/HeroPage'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut
    },
  },
}

export function HomePage() {
  const [equiposFutbol, setEquiposFutbol] = useState(0)
  const [equiposVoley, setEquiposVoley] = useState(0)
  const [equiposGincana, setEquiposGincana] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const { call } = getAllEquiposWithoutPlayersService()
        const response = await call

        // Filtrar equipos por deporte
        const futbol = response.data.filter((equipo) => equipo.cDetalle === String(SPORT_IDS.FUTBOL))
        const voley = response.data.filter((equipo) => equipo.cDetalle === String(SPORT_IDS.VOLEY))
        const gincana = response.data.filter((equipo) => equipo.cDetalle === 'gincana')

        setEquiposFutbol(futbol.length)
        setEquiposVoley(voley.length)
        setEquiposGincana(gincana.length)
      } catch (error) {
        console.error('Error al cargar equipos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipos()
  }, [])

  return (
    <>
      <HeroPage />
      <motion.section
        className="mt-8 sm:mt-12 max-w-7xl m-auto px-4 sm:px-4 pb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Info deportes */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <Card className="flex flex-col gap-4 px-4 sm:px-6 py-4 sm:py-6 h-full">
              <h2 className="text-2xl font-bold text-left text-primary font-montserrat">Evento</h2>
              <p className="text-sm text-left text-primary/90 text-balance">
                De parte del <strong>Departamento de Aseguramiento de Calidad</strong>, nos complace presentar con gran entusiasmo el
                Campeonato de confraternidad octubre 2025, un evento que refleja nuestro firme compromiso con el desarrollo humano y
                organizacional.
              </p>
              <p className="text-sm text-left text-primary/90 text-pretty">
                Esta iniciativa, dirigida a todos los colaboradores de la empresa, busca crear un entorno de sana competencia y
                esparcimiento, donde el deporte se convierte en el medio ideal para promover la confianza, el trabajo en equipo y la
                integración entre áreas.
              </p>
            </Card>
          </motion.div>

          {/*  Futbol */}
          <Link to="/futbol">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-[250px] sm:h-[300px] bg-brand-cyan rounded-md font-montserrat font-bold cursor-pointer overflow-hidden"
              style={{
                backgroundImage: 'url(/soccer.574162f.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'auto 100%',
              }}
            >
              <article className="flex flex-col items-start justify-between h-full p-4 sm:p-6">
                <div className="flex items-center gap-1 text-white/90">
                  <FutbolIcon />
                  <h3 className="text-sm font-bold">FÚTBOL</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-3xl sm:text-4xl text-white">{isLoading ? '...' : equiposFutbol}</h4>
                    <h4 className="text-xs text-white">EQUIPOS INSCRITOS</h4>
                  </div>
                </div>
              </article>
            </motion.div>
          </Link>

          {/*  Voley */}
          <Link to="/voley">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-[250px] sm:h-[300px] bg-accent rounded-md font-montserrat font-bold cursor-pointer overflow-hidden"
              style={{
                backgroundImage: 'url(/basketball.a4db9e2.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'auto 100%',
              }}
            >
              <article className="flex flex-col items-start justify-between h-full p-4 sm:p-6">
                <div className="flex items-center gap-1 text-white">
                  <VoleyIcon />
                  <h3 className="text-sm">VOLEY</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-3xl sm:text-4xl text-brand-magenta">{isLoading ? '...' : equiposVoley}</h4>
                    <h4 className="text-xs text-white">EQUIPOS INSCRITOS</h4>
                  </div>
                </div>
              </article>
            </motion.div>
          </Link>

          {/* Gincana */}
          <Link to="/gincana">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-[250px] sm:h-[300px] bg-brand-blue rounded-md font-montserrat font-bold cursor-pointer overflow-hidden"
              style={{
                backgroundImage: 'url(/soccer.574162f.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: 'auto 100%',
              }}
            >
              <article className="flex flex-col items-start justify-between h-full p-4 sm:p-6">
                <div className="flex items-center gap-1 text-white/90">
                  <Target className="w-5 h-5 text-white" />
                  <h3 className="text-sm">GINCANA</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-3xl sm:text-4xl text-white">{isLoading ? '...' : equiposGincana}</h4>
                    <h4 className="text-xs text-white">EQUIPOS INSCRITOS</h4>
                  </div>
                </div>
              </article>
            </motion.div>
          </Link>
        </div>

        {/* Sección de Reglamento */}
        <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
          <Card className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-3 rounded-lg bg-brand-cyan/10 shrink-0">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-brand-cyan" />
              </div>
              <div className="flex-1 w-full">
                <h2 className="mb-2 text-xl sm:text-2xl font-bold text-primary font-montserrat">Reglamento del Evento</h2>
                <p className="mb-4 text-sm text-primary/80">
                  Consulta las reglas oficiales de cada disciplina deportiva y las normas generales del campeonato.
                </p>
                <motion.a
                  href="/bases-qa-campeonato.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors rounded-md bg-brand-cyan hover:bg-brand-cyan/90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" />
                  Descargar Reglamento (PDF)
                </motion.a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sección de Premios y Reconocimientos */}
        <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
          <div className="mb-4 sm:mb-6 text-center px-4">
            <motion.h2
              className="mb-2 text-2xl sm:text-3xl font-bold text-primary font-montserrat"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Premios y Reconocimientos
            </motion.h2>
            <motion.p
              className="text-sm text-primary/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Celebramos el esfuerzo y dedicación de todos los participantes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Premios por Disciplina */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-cyan to-brand-cyan/80"
            >
              <div className="absolute top-0 right-0 opacity-10">
                <Trophy className="w-32 h-32 text-white" />
              </div>
              <div className="relative p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5">
                    <FutbolIcon />
                  </div>
                  <h3 className="text-lg font-bold text-white font-montserrat">FÚTBOL</h3>
                </div>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-md bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Trophy className="w-5 h-5 text-accent" />
                    <span className="text-sm font-semibold text-white">1er Puesto</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-md bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Medal className="w-5 h-5 text-white/90" />
                    <span className="text-sm font-semibold text-white">2do Puesto</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-accent to-accent/80"
            >
              <div className="absolute top-0 right-0 opacity-10">
                <Trophy className="w-32 h-32 text-white" />
              </div>
              <div className="relative p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5">
                    <VoleyIcon />
                  </div>
                  <h3 className="text-lg font-bold text-white font-montserrat">VOLEY</h3>
                </div>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-md bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Trophy className="w-5 h-5 text-brand-magenta" />
                    <span className="text-sm font-semibold text-white">1er Puesto</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-md bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Medal className="w-5 h-5 text-white/90" />
                    <span className="text-sm font-semibold text-white">2do Puesto</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-blue to-brand-blue/80"
            >
              <div className="absolute top-0 right-0 opacity-10">
                <Trophy className="w-32 h-32 text-white" />
              </div>
              <div className="relative p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white font-montserrat">GINCANA</h3>
                </div>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-md bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Trophy className="w-5 h-5 text-accent" />
                    <span className="text-sm font-semibold text-white">1er Puesto</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reconocimientos Individuales */}
          <motion.div
            variants={itemVariants}
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-brand-magenta" />
                  <h3 className="text-lg sm:text-xl font-bold text-primary font-montserrat">Reconocimientos Individuales</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                  <motion.div
                    className="relative p-3 sm:p-4 overflow-hidden border-2 border-transparent rounded-lg bg-gradient-to-br from-brand-cyan/10 to-transparent group hover:border-brand-cyan"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-10">
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-brand-cyan" />
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-brand-cyan" />
                      <p className="text-[10px] sm:text-xs font-bold text-primary">Mejor Jugador</p>
                      <p className="text-[10px] sm:text-xs text-primary/60">Fútbol</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative p-3 sm:p-4 overflow-hidden border-2 border-transparent rounded-lg bg-gradient-to-br from-accent/10 to-transparent group hover:border-accent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-10">
                      <Target className="w-12 h-12 sm:w-16 sm:h-16 text-accent" />
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-accent" />
                      <p className="text-[10px] sm:text-xs font-bold text-primary">Goleador</p>
                      <p className="text-[10px] sm:text-xs text-primary/60">Fútbol</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative p-3 sm:p-4 overflow-hidden border-2 border-transparent rounded-lg bg-gradient-to-br from-brand-magenta/10 to-transparent group hover:border-brand-magenta"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-10">
                      <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-brand-magenta" />
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-brand-magenta" />
                      <p className="text-[10px] sm:text-xs font-bold text-primary">Mejor Arquero</p>
                      <p className="text-[10px] sm:text-xs text-primary/60">Fútbol</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative p-3 sm:p-4 overflow-hidden border-2 border-transparent rounded-lg bg-gradient-to-br from-accent/10 to-transparent group hover:border-accent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-10">
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-accent" />
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-accent" />
                      <p className="text-[10px] sm:text-xs font-bold text-primary">Mejor Jugador</p>
                      <p className="text-[10px] sm:text-xs text-primary/60">Voley</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  )
}
