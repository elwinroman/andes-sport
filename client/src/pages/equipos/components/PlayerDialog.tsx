import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { type CurrentPlayer } from '../hooks/useTeamPlayerManager'

interface PlayerDialogProps {
  open: boolean
  currentPlayer: CurrentPlayer
  availablePlayers: Array<{ id: number; nombres: string; apellidos: string }>
  onOpenChange: (open: boolean) => void
  onSave: () => void
  onAssignExisting: (playerId: number) => void
  onPlayerChange: (player: CurrentPlayer) => void
  loading: boolean
}

export function PlayerDialog({
  open,
  currentPlayer,
  availablePlayers,
  onOpenChange,
  onSave,
  onAssignExisting,
  onPlayerChange,
  loading = false,
}: PlayerDialogProps) {
  const [mode, setMode] = useState<'new' | 'existing'>('new')
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('')

  const handleAssign = () => {
    if (selectedPlayerId) {
      onAssignExisting(Number(selectedPlayerId))
      setSelectedPlayerId('')
      setMode('new')
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setMode('new')
      setSelectedPlayerId('')
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentPlayer.id ? 'Editar Jugador' : 'Agregar Jugador'}</DialogTitle>
        </DialogHeader>

        {!currentPlayer.id && (
          <RadioGroup value={mode} onValueChange={(value: string) => setMode(value as 'new' | 'existing')} className="mb-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <label htmlFor="new" className="text-sm font-medium cursor-pointer">
                Crear nuevo jugador
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing" />
              <label htmlFor="existing" className="text-sm font-medium cursor-pointer">
                Asignar jugador existente
              </label>
            </div>
          </RadioGroup>
        )}

        <div className="py-4 space-y-4">
          {mode === 'new' ? (
            <>
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
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Seleccionar Jugador</label>
              <Select value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un jugador" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayers.map((player) => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                      {player.nombres} {player.apellidos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancelar
          </Button>
          {mode === 'new' ? (
            <Button onClick={onSave} className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {currentPlayer.id ? 'Guardar Cambios' : 'Agregar Jugador'}
            </Button>
          ) : (
            <Button onClick={handleAssign} disabled={!selectedPlayerId || loading} className="bg-blue-600 hover:bg-blue-700">
              Asignar Jugador
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
