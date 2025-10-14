import { Card } from '@/components/Card'
import { FutbolIcon } from '@/icons/FutbolIcon'
import { VoleyIcon } from '@/icons/VoleyIcon'

import { HeroPage } from './components/HeroPage'

export function HomePage() {
  return (
    <>
      <HeroPage />
      <section className="mt-12 max-w-7xl m-auto sm:px-4 h-[calc(100%-48px)]">
        <div className="grid grid-cols-2 gap-4">
          {/* Info deportes */}
          <Card className="flex flex-col gap-4 px-6 py-6">
            <h2 className="text-2xl font-bold text-left text-primary font-montserrat">Evento</h2>
            <p className="text-sm text-left text-primary/90 text-balance">
              De parte del <strong>Departamento de Aseguramiento de Calidad</strong>, nos complace presentar con gran entusiasmo el
              Campeonato de confraternidad octubre 2025, un evento que refleja nuestro firme compromiso con el desarrollo humano y
              organizacional.
            </p>
            <p className="text-sm text-left text-primary/90 text-pretty">
              Esta iniciativa, dirigida a todos los colaboradores de la empresa, busca crear un entorno de sana competencia y esparcimiento,
              donde el deporte se convierte en el medio ideal para promover la confianza, el trabajo en equipo y la integración entre áreas.
            </p>
          </Card>

          {/*  Futbol */}
          <div
            className="h-[300px] bg-brand-cyan rounded-md p-6 font-montserrat font-bold"
            style={{
              backgroundImage: 'url(https://static.flashscore.com/res/_fs/build/soccer.574162f.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '101%',
              backgroundSize: 'auto 100%',
            }}
          >
            <div className="flex items-center gap-1 text-white/90">
              <FutbolIcon />
              <h3 className="text-sm font-bold">FÚTBOL</h3>
            </div>
          </div>

          {/*  Voley */}
          <div
            className="h-[300px] bg-accent rounded-md p-6 font-montserrat font-bold"
            style={{
              backgroundImage: 'url(https://static.flashscore.com/res/_fs/build/basketball.a4db9e2.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '101%',
              backgroundSize: 'auto 100%',
            }}
          >
            <article className="flex flex-col items-start justify-between h-full">
              <div className="flex items-center gap-1 text-white">
                <VoleyIcon />
                <h3 className="text-sm">VOLEY</h3>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1">
                  <h4 className="text-4xl text-brand-magenta">12</h4>
                  <h4 className="text-xs text-white">PARTIDOS</h4>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h4 className="text-4xl text-brand-magenta">8</h4>
                  <h4 className="text-xs text-white">EQUIPOS INSCRITOS</h4>
                </div>
              </div>
            </article>
          </div>

          {/* Gincana */}
          <div
            className="h-[300px] bg-brand-blue rounded-md p-6 font-montserrat font-bold"
            style={{
              backgroundImage: 'url(https://static.flashscore.com/res/_fs/build/soccer.574162f.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '101%',
              backgroundSize: 'auto 100%',
            }}
          >
            <div className="flex items-center gap-1 text-white/90">
              <FutbolIcon />
              <h3 className="text-sm">GINCANA</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
