import { Play } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import type { Match } from '../hooks/useMatchManager'

interface StartMatchDialogProps {
  match: Match | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function StartMatchDialog({ match, isOpen, onOpenChange, onConfirm }: StartMatchDialogProps) {
  if (!match) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-green-600" />
            Iniciar Partido
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>¿Estás seguro de que deseas iniciar el siguiente partido?</p>
            <div className="p-3 mt-3 border rounded-md bg-slate-50 border-slate-200">
              <div className="flex items-center justify-center gap-3 font-semibold text-primary">
                <span>{match.team1.nombre}</span>
                <span className="text-sm text-slate-500">vs</span>
                <span>{match.team2.nombre}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              El partido se marcará como <strong>En Curso</strong> y se registrará la fecha de inicio.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            Iniciar Partido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
