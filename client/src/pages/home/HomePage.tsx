import { Calendar, Navigation, Trophy } from 'lucide-react'

import { Card } from '../../components/Card'
import { FutbolIcon } from '../../icons/FutbolIcon'
import { VoleyIcon } from '../../icons/VoleyIcon'
import { LineaParametrizable } from './components/LineaParametrizable'

export function HomePage() {
  return (
    <section className="w-full">
      <h2 className="hidden px-1 py-2 text-sm font-semibold text-left text-secondary sm:block">
        Resultados de fútbol en directo y cronograma del campeonato CRACLASA
      </h2>

      <div className="flex flex-col gap-5">
        {/*  card */}
        <Card className="flex flex-col gap-4 px-4 py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-10 md:items-center">
            <img
              src="https://losandes.pe/wp-content/themes/losandes/assets/images/logo_web.png"
              alt="logo caja los andes"
              className="object-contain"
              // className="filter invert brightness-0 sepia saturate-100 hue-rotate-180"
            />
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-xl font-bold md:text-2xl text-brand-blue dark:text-brand-cyan">Campeonato Deportivo</h1>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Calendar size={12} />
                    <span>Sábado, 17 de octubre del 2025 - 15:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold underline text-brand-magenta underline-offset-4 dark:font-medium">
                    <Navigation size={12} />
                    <span>Centro Deportivo Moyas</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-left text-primary">
                  Organizado por el Departamento de Aseguramiento de Calidad
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-1">
            <LineaParametrizable />
            <i className="grid w-5 h-5 rounded-full bg-background place-content-center">
              <Trophy size={13} strokeWidth={1} className="text-primary" />
            </i>
          </div>
        </Card>

        {/* Info deportes */}
        <Card className="flex flex-col gap-4 px-4 py-6">
          <h2 className="text-2xl font-bold text-primary">Titulo</h2>
          <p className="max-w-3xl m-auto text-center text-primary/90">
            De parte del Departamento de Aseguramiento de Calidad, nos complace presentar con gran entusiasmo el Campeonato de
            confraternidad octubre 2025, un evento que refleja nuestro firme compromiso con el desarrollo humano y organizacional.
          </p>
          <p className="max-w-3xl m-auto text-center text-primary/90">
            Esta iniciativa, dirigida a todos los colaboradores de la empresa, busca crear un entorno de sana competencia y esparcimiento,
            donde el deporte se convierte en el medio ideal para promover la confianza, el trabajo en equipo y la integración entre áreas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div
              className="h-[300px] bg-brand-blue rounded-lg p-6"
              style={{
                backgroundImage: 'url(https://static.flashscore.com/res/_fs/build/soccer.574162f.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '101%',
                backgroundSize: 'auto 100%',
              }}
            >
              <div className="flex items-center gap-1 text-white/90">
                <FutbolIcon />
                <h3 className="text-sm font-semibold">FÚTBOL</h3>
              </div>
            </div>
            <div
              className="h-[300px] bg-brand-blue rounded-lg p-6"
              style={{
                backgroundImage: 'url(https://static.flashscore.com/res/_fs/build/basketball.a4db9e2.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '101%',
                backgroundSize: 'auto 100%',
              }}
            >
              <article className="flex flex-col items-start justify-between h-full">
                <div className="flex items-center gap-1 text-white/90">
                  <VoleyIcon />
                  <h3 className="text-sm font-semibold">VOLEY</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-4xl text-brand-magenta">12</h4>
                    <h4 className="text-xs text-white/90">PARTIDOS</h4>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-4xl text-brand-magenta">8</h4>
                    <h4 className="text-xs text-white/90">EQUIPOS INSCRITOS</h4>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
