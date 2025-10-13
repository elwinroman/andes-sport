import { Plus, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  onCreateTeam: () => void
}

export function EmptyState({ onCreateTeam }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 border-slate-300 dark:border-gray-500">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Users className="text-slate-400" size={60} />
        <p className="text-lg text-secondary mb-2 mt-4">No hay equipos registrados</p>
        <p className="text-secondary mb-6">Comienza creando tu primer equipo</p>
        <Button onClick={onCreateTeam} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus />
          Crear Equipo
        </Button>
      </CardContent>
    </Card>
  )
}
