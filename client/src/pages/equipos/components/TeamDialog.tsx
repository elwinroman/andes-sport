import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { type CurrentTeam } from '../hooks/useTeamPlayerManager'

interface TeamDialogProps {
  open: boolean
  currentTeam: CurrentTeam
  onOpenChange: (open: boolean) => void
  onSave: () => void
  onTeamChange: (team: CurrentTeam) => void
}

export function TeamDialog({ open, currentTeam, onOpenChange, onSave, onTeamChange }: TeamDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentTeam.id ? 'Editar Equipo' : 'Nuevo Equipo'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary/70">Nombre del Equipo</label>
            <Input
              placeholder="Ej: Los Invencibles"
              value={currentTeam.nombre}
              onChange={(e) => onTeamChange({ ...currentTeam, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary/70">Detalles</label>
            <Textarea
              placeholder="Información adicional sobre el equipo..."
              value={currentTeam.detalles}
              onChange={(e) => onTeamChange({ ...currentTeam, detalles: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            {currentTeam.id ? 'Guardar Cambios' : 'Crear Equipo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
