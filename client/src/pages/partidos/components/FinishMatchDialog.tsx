import { Flag } from 'lucide-react'

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

interface FinishMatchDialogProps {
  match: Match | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function FinishMatchDialog({ match, isOpen, onOpenChange, onConfirm }: FinishMatchDialogProps) {
  if (!match) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-gray-600" />
            Finalizar Partido
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>¿Estás seguro de que deseas finalizar el siguiente partido?</p>
            <div className="p-3 mt-3 border rounded-md bg-slate-50 border-slate-200">
              <div className="flex items-center justify-center gap-3 font-semibold text-primary">
                <span>{match.team1.nombre}</span>
                <span className="text-sm text-slate-500">vs</span>
                <span>{match.team2.nombre}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              El partido se marcará como <strong>Finalizado</strong> y se registrará la fecha de finalización.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-gray-600 hover:bg-gray-700">
            Finalizar Partido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
