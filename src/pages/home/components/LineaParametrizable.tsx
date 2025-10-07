interface Props {
  min?: number
  max?: number
  valor?: number
  color?: string
}

export function LineaParametrizable({ min = 0, max = 100, valor = 50, color = 'bg-white/90' }: Props) {
  const valorNormalizado = Math.max(min, Math.min(valor, max))
  const porcentaje = ((valorNormalizado - min) / (max - min)) * 100

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-700 rounded-l-none w-full">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  )
}
