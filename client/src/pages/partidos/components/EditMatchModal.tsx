import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import type { Match } from '../hooks/useMatchManager'

interface EditMatchModalProps {
  match: Match | null
  open: boolean
  onClose: () => void
  onSave: (matchId: number, newDate: string) => Promise<void>
}

export function EditMatchModal({ match, open, onClose, onSave }: EditMatchModalProps) {
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (match) {
      // Convertir la fecha UTC a formato local para el input
      const eventDate = new Date(match.eventDate)

      // Formatear fecha para input type="date" (YYYY-MM-DD)
      const year = eventDate.getFullYear()
      const month = String(eventDate.getMonth() + 1).padStart(2, '0')
      const day = String(eventDate.getDate()).padStart(2, '0')
      setDateValue(`${year}-${month}-${day}`)

      // Formatear hora para input type="time" (HH:mm)
      const hours = String(eventDate.getHours()).padStart(2, '0')
      const minutes = String(eventDate.getMinutes()).padStart(2, '0')
      setTimeValue(`${hours}:${minutes}`)
    }
  }, [match])

  const handleSave = async () => {
    if (!match || !dateValue || !timeValue) return

    setIsSaving(true)
    try {
      // Combinar fecha y hora en formato UTC
      const [year, month, day] = dateValue.split('-').map(Number)
      const [hours, minutes] = timeValue.split(':').map(Number)

      // Crear fecha en la zona horaria local del usuario
      const localDate = new Date(year, month - 1, day, hours, minutes)

      // Convertir a UTC para enviar al backend
      const utcDate = localDate.toISOString()

      await onSave(match.id, utcDate)
      onClose()
    } catch (error) {
      console.error('Error al actualizar el partido:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Partido</DialogTitle>
          <DialogDescription>
            Modifica la fecha y hora del partido entre {match?.team1.nombre} vs {match?.team2.nombre}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <label htmlFor="date" className="text-right">
              Fecha
            </label>
            <Input id="date" type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} className="col-span-3" />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <label htmlFor="time" className="text-right">
              Hora
            </label>
            <Input id="time" type="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !dateValue || !timeValue}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
