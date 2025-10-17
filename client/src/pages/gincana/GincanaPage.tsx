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
          {/* Carrera de Pasar el Objeto */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-cyan/10 to-transparent">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-cyan/20 shrink-0">
                    <Flag className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat">1. CARRERA DE PASAR EL OBJETO</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-primary/60" />
                      <p className="text-sm text-primary/70">
                        <strong>Integrantes:</strong> 6 por equipo - Mixto
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-primary">Instrucciones:</h3>
                  <ul className="space-y-2 text-sm text-primary/80">
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">a)</span>
                      <span>Cada equipo tiene 2 mantas, una sostenida por dos personas y sostenida por 4 personas</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">b)</span>
                      <span>
                        Cada equipo pasa el objeto usando la manta al hacerlo los que lo hicieron deben pasar por debajo de la manta y
                        continuar para recibir el objeto nuevamente, repitiendo el juego de esta manera hasta llegar a la zona de
                        lanzamiento
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">c)</span>
                      <span>
                        Al llegar a la zona de lanzamiento aquellos que tengan el objeto deben de lanzarlo usando la manta a un compañero
                        que esta con un saco
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">d)</span>
                      <span>El compañero con el saco debe recibir y encestar el objeto en el saco para ganar</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-cyan font-bold shrink-0">e)</span>
                      <span>
                        <strong>Gana quien termina primero</strong>
                      </span>
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
                    <li>Antes de salir corriendo deberá darse 3 vueltas en el bastón</li>
                    <li>Correr en bastón en la mano y pasarlo al siguiente compañero para continuar</li>
                    <li>
                      <strong>Juego:</strong> Carrera de relevos, gana quien termina primero las bebidas sin derramar el líquido
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enrollados */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-brand-magenta/10 to-transparent">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-magenta/20 shrink-0">
                    <Target className="w-6 h-6 text-brand-magenta" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat">3. ENROLLADOS</h2>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  {/* Preparación */}
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-2">Preparación:</h3>
                    <ul className="space-y-1 text-sm text-primary/80 list-disc list-inside">
                      <li>Cada equipo forma una fila</li>
                      <li>El primer jugador sostiene todo el rollo de la venda</li>
                      <li>El segundo jugador toma el extremo suelto de la venda</li>
                    </ul>
                  </div>

                  {/* Cómo se juega */}
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-3">Cómo se juega - Paso a paso:</h3>
                    <div className="space-y-3">
                      <div className="pl-3 border-l-2 border-brand-magenta">
                        <h4 className="text-sm font-semibold text-primary mb-1">
                          a) Fase de enrollado (Primer jugador → Segundo jugador):
                        </h4>
                        <ul className="space-y-1 text-sm text-primary/80 list-disc list-inside ml-2">
                          <li>
                            A la señal de inicio, el segundo jugador (quien tiene el extremo) comienza a girar sobre sí mismo para enrollar
                            la venda alrededor de su cuerpo
                          </li>
                          <li>El primer jugador sujeta el rollo inicial y va soltando la venda poco a poco mientras el segundo gira</li>
                          <li>Esto continúa hasta que toda la venda está enrollada en el cuerpo del segundo jugador</li>
                        </ul>
                      </div>

                      <div className="pl-3 border-l-2 border-brand-magenta">
                        <h4 className="text-sm font-semibold text-primary mb-1">
                          b) Fase de desenrollado y traspaso (Segundo → Tercer jugador):
                        </h4>
                        <ul className="space-y-1 text-sm text-primary/80 list-disc list-inside ml-2">
                          <li>
                            Una vez el segundo jugador tiene toda la venda enrollada, sin detenerse, debe entregar el extremo suelto (que
                            ahora está en su cuerpo) al tercer jugador
                          </li>
                          <li>Ahora, el segundo jugador gira en sentido contrario para desenrollarse</li>
                          <li>Al mismo tiempo, el tercer jugador gira para enrollar la venda que el segundo va soltando</li>
                          <li>La venda pasa directamente del cuerpo del segundo al cuerpo del tercero</li>
                        </ul>
                      </div>

                      <div className="pl-3 border-l-2 border-brand-magenta">
                        <h4 className="text-sm font-semibold text-primary mb-1">c) Continuación del relevo:</h4>
                        <p className="text-sm text-primary/80 ml-2">Se repite el mismo proceso:</p>
                        <ul className="space-y-1 text-sm text-primary/80 list-disc list-inside ml-2">
                          <li>Quien tiene la venda enrollada se desenrolla girando en reversa</li>
                          <li>El siguiente en la fila se enrolla girando hacia adelante</li>
                          <li>Así hasta que la venda llega al último jugador</li>
                        </ul>
                      </div>

                      <div className="pl-3 border-l-2 border-brand-magenta">
                        <h4 className="text-sm font-semibold text-primary mb-1">d) Final del juego:</h4>
                        <p className="text-sm text-primary/80 ml-2">
                          El juego termina cuando el último jugador tiene toda la venda enrollada en su cuerpo y levanta la mano o grita
                          "¡Listo!".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sistema de Puntaje */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <div className="p-4 sm:p-6 bg-background">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-blue/20 shrink-0">
                    <Award className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary font-montserrat">Sistema de Puntaje y Clasificación</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-brand-blue/10 border-2 border-brand-blue/20"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(59, 130, 246, 0.4)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Trophy className="w-8 h-8 text-brand-blue shrink-0" />
                    <div>
                      <p className="text-lg font-bold text-primary">3 puntos</p>
                      <p className="text-xs text-primary/60">Victoria</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border-2 border-accent/20"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(249, 115, 22, 0.4)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Medal className="w-8 h-8 text-accent shrink-0" />
                    <div>
                      <p className="text-lg font-bold text-primary">1 punto</p>
                      <p className="text-xs text-primary/60">Empate</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border-2 border-primary/10"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-primary/60">0</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">0 puntos</p>
                      <p className="text-xs text-primary/60">Derrota</p>
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
