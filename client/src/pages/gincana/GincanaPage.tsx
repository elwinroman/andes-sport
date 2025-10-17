import { motion } from 'framer-motion'
import { Award, Flag, Medal, Target, Trophy, Users } from 'lucide-react'

import { Card } from '@/components/Card'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function GincanaPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero Section */}
      <motion.section
        className="relative py-12 sm:py-16 bg-gradient-to-r from-brand-blue to-brand-blue/90 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Target className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Trophy className="w-40 h-40 text-white" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Target className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-montserrat">GINCANA</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto"
          >
            Competencias dinámicas que ponen a prueba tu trabajo en equipo, coordinación y estrategia
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Juegos Section */}
        <div className="space-y-6">
          {/* Carrera de Gusano */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-cyan/10 to-transparent">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-cyan/20 shrink-0">
                    <Flag className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat text-left">1. CARRERA DE GUSANO</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-primary/60" />
                      <p className="text-sm text-primary/70 text-left">
                        <strong>Integrantes:</strong> Mínimo 4 personas por equipo - Mixto (misma cantidad en todos los equipos)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-primary">Instrucciones:</h3>
                  <ul className="space-y-2 text-sm text-primary/80">
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">a)</span>
                      <span>
                        Un integrante toma el balón al final de la fila y el resto de los integrantes se colocan echados delante de este
                        mirando al suelo terminando de formar la fila
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">b)</span>
                      <span>
                        El integrante con el balón correrá sobre la fila sin aplastar a sus compañeros, cuando llegue al inicio pasará el
                        balón por debajo de la fila de integrantes (ellos deben elevarse con ayuda de sus brazos y piernas) y el último debe
                        atraparlo
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">c)</span>
                      <span>
                        El integrante que tenía el balón se colocará al inicio formando la fila con el resto para que el último con el balón
                        realice el primer paso
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">d)</span>
                      <span>
                        <strong>Gana el equipo que llegue a la meta más rápido</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">e)</span>
                      <span>Si la pelota se escapa de la fila un integrante puede traerla y continuar con el recorrido</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Carrera Bebedora */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-accent/10 to-transparent">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/20 shrink-0">
                    <Flag className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat">2. CARRERA BEBEDORA</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-primary/60" />
                      <p className="text-sm text-primary/70">
                        <strong>Integrantes:</strong> 5 por equipo - Mixto
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-primary">Instrucciones:</h3>
                  <ul className="space-y-2 text-sm text-primary/80 list-disc list-inside">
                    <li>Debe formarse una fila con los integrantes para comenzar la carrera</li>
                    <li>Para que el segundo integrante pueda iniciar la carrera el primero deberá tocar la palma de su mano</li>
                    <li>
                      <strong>Gana quien termina primero las bebidas sin derramar el líquido</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Carrera de Pulpo */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-magenta/10 to-transparent">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-magenta/20 shrink-0">
                    <Target className="w-6 h-6 text-brand-magenta" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat text-left">3. CARRERA DE PULPO</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-primary/60" />
                      <p className="text-sm text-primary/70 text-left">
                        <strong>Integrantes:</strong> Mínimo 4 personas por equipo - Mixto (misma cantidad en todos los equipos)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-primary">Instrucciones:</h3>
                  <ul className="space-y-2 text-sm text-primary/80 list-disc list-inside">
                    <li>
                      Los jugadores entrelazan sus brazos con las personas de al lado como si fueran un pulpo gigante. Se colocará una
                      pelota en sus espaldas o centro del pulpo
                    </li>
                    <li>
                      El objetivo es que el pulpo avance desde el inicio hasta el final cuidando que la pelota no se caiga o que algún
                      integrante se pare durante el recorrido
                    </li>
                    <li>
                      <strong>Si la pelota se cae o un integrante se para deberán comenzar la carrera desde el inicio</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sistema de Puntaje */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-xl font-bold text-primary font-montserrat text-left">
                      Sistema de Puntaje y Clasificación
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-yellow-300 shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(251, 191, 36, 0.4)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Trophy className="w-8 h-8 text-white shrink-0 drop-shadow-md" />
                    <div>
                      <p className="text-lg font-bold text-white">3 puntos</p>
                      <p className="text-xs text-white/90 font-medium">Victoria</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-slate-300 shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(148, 163, 184, 0.4)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Medal className="w-8 h-8 text-white shrink-0 drop-shadow-md" />
                    <div>
                      <p className="text-lg font-bold text-white">1 punto</p>
                      <p className="text-xs text-white/90 font-medium">Empate</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-orange-700 to-red-800 border-2 border-orange-600 shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(234, 88, 12, 0.4)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <span className="text-lg font-bold text-white">0</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">0 puntos</p>
                      <p className="text-xs text-white/90 font-medium">Derrota</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
