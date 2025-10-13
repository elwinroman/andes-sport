import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { type CurrentPlayer } from '../hooks/useTeamPlayerManager'

interface PlayerDialogProps {
  open: boolean
  currentPlayer: CurrentPlayer
  onOpenChange: (open: boolean) => void
  onSave: () => void
  onPlayerChange: (player: CurrentPlayer) => void
}

export function PlayerDialog({ open, currentPlayer, onOpenChange, onSave, onPlayerChange }: PlayerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentPlayer.id ? 'Editar Jugador' : 'Nuevo Jugador'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nombres</label>
            <Input
              placeholder="Ej: Juan Carlos"
              value={currentPlayer.nombres}
              onChange={(e) => onPlayerChange({ ...currentPlayer, nombres: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Apellidos</label>
            <Input
              placeholder="Ej: García López"
              value={currentPlayer.apellidos}
              onChange={(e) => onPlayerChange({ ...currentPlayer, apellidos: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
            {currentPlayer.id ? 'Guardar Cambios' : 'Agregar Jugador'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
