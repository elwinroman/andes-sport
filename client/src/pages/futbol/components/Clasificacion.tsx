import { Card } from '@components/Card'

import { CircleIcon } from '@/icons/CircleIcon'

export function Clasificacion() {
  const teams = [
    {
      pos: 1,
      name: 'Proyectos TI (Harold)',
      logo: '🔴',
      pj: 7,
      g: 5,
      e: 1,
      p: 1,
      gf: 14,
      gc: 3,
      gd: 11,
      pts: 16,
      form: ['G', 'G', 'E', 'G', 'P'],
    },
    { pos: 2, name: 'QA (Pele 1)', logo: '🔴', pj: 7, g: 5, e: 0, p: 2, gf: 13, gc: 9, gd: 4, pts: 15, form: ['P', 'P', 'G', 'G', 'G'] },
    { pos: 3, name: 'CSTI (Denis)', logo: '⚪', pj: 7, g: 4, e: 2, p: 1, gf: 13, gc: 5, gd: 8, pts: 14, form: ['G', 'E', 'E', 'G', 'P'] },
    { pos: 4, name: 'GT (Roger)', logo: '🔴', pj: 7, g: 4, e: 2, p: 1, gf: 11, gc: 8, gd: 3, pts: 14, form: ['G', 'E', 'E', 'G', 'G'] },
    {
      pos: 5,
      name: 'Producción (Kevin)',
      logo: '🔵',
      pj: 7,
      g: 4,
      e: 1,
      p: 2,
      gf: 15,
      gc: 6,
      gd: 9,
      pts: 13,
      form: ['G', 'G', 'E', 'G', 'P'],
    },
    {
      pos: 6,
      name: 'Código saurios (Obed)',
      logo: '🔵',
      pj: 7,
      g: 3,
      e: 3,
      p: 1,
      gf: 9,
      gc: 5,
      gd: 4,
      pts: 12,
      form: ['P', 'G', 'G', 'E', 'G'],
    },
    { pos: 7, name: 'QA (Pelé 2)', logo: '🔵', pj: 7, g: 3, e: 2, p: 2, gf: 13, gc: 9, gd: 4, pts: 11, form: ['G', 'P', 'P', 'E', 'G'] },
    {
      pos: 8,
      name: 'Logística (Odilon)',
      logo: '🔵',
      pj: 7,
      g: 3,
      e: 2,
      p: 2,
      gf: 9,
      gc: 7,
      gd: 2,
      pts: 11,
      form: ['G', 'E', 'P', 'E', 'G'],
    },
    {
      pos: 9,
      name: 'Call Center (Yakeline)',
      logo: '🔴',
      pj: 7,
      g: 3,
      e: 2,
      p: 2,
      gf: 7,
      gc: 6,
      gd: 1,
      pts: 11,
      form: ['P', 'G', 'E', 'E', 'G'],
    },
  ]

  const getFormColor = (result: string) => {
    switch (result) {
      case 'G':
        return 'bg-green-500'
      case 'P':
        return 'bg-red-500'
      case 'E':
        return 'bg-amber-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getPositionColor = (pos: number) => {
    if (pos <= 2) return 'border-l-4 border-l-green-500'
    return 'border-l-4 border-transparent'
  }

  return (
    <Card className="w-auto">
      <div className="mx-auto px-3 py-3">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <h5 className="font-bold text-primary mb-2">Clasificación</h5>
            <table className="w-full text-sm text-primary">
              <thead className="text-xs text-secondary">
                <tr>
                  <th className="px-4 py-3 text-left">Pos</th>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-2 py-3 text-center">PJ</th>
                  <th className="px-2 py-3 text-center">G</th>
                  <th className="px-2 py-3 text-center">E</th>
                  <th className="px-2 py-3 text-center">P</th>
                  <th className="px-2 py-3 text-center">Goles</th>
                  <th className="px-2 py-3 text-center">+/-</th>
                  <th className="px-2 py-3 text-center font-bold">PTS</th>
                  <th className="px-4 py-3 text-center">Form</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.pos} className={`${getPositionColor(team.pos)} hover:bg-background  transition-colors`}>
                    <td className="px-2 py-2 font-medium">{team.pos}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2 text-nowrap">
                        <span className="text-lg">{team.logo}</span>
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center">{team.pj}</td>
                    <td className="px-2 py-2 text-center">{team.g}</td>
                    <td className="px-2 py-2 text-center">{team.e}</td>
                    <td className="px-2 py-2 text-center">{team.p}</td>
                    <td className="px-2 py-2 text-center">
                      {team.gf}:{team.gc}
                    </td>
                    <td className="px-2 py-2 text-center font-medium">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                    <td className="px-2 py-2 text-center font-bold text-base">{team.pts}</td>
                    <td className="px-2 py-2">
                      <div className="flex gap-0.5 justify-center">
                        {team.form.map((result, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 ${getFormColor(result)} rounded flex items-center justify-center text-xs font-bold text-white`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 bg-background text-primary text-left text-sm flex flex-col gap-2 p-3 rounded-sm">
          <span className="font-bold">Reglas</span>

          <div className="text-green-500 flex gap-1 items-center">
            <CircleIcon size={12} />
            <span className="text-xs text-secondary">Clasificación Final</span>
          </div>

          <p>
            Si dos equipos están empatados en la clasificación, se utlizarán los siguientes métodos de desempate: 1. Diferencia general de
            goles 2. Mayor cantidad de goles marcados 3. Menor cantidad de goles recibidos 4. Sorteo con moneda
          </p>
        </div>
      </div>
    </Card>
  )
}
