import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Extender dayjs con plugins de UTC y timezone
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Convierte una fecha UTC a la zona horaria local del usuario
 * @param utcDate - Fecha en formato UTC (ISO string o Date object)
 * @returns Fecha formateada en hora local
 */
export const utcToLocal = (utcDate: string | Date): dayjs.Dayjs => {
  return dayjs.utc(utcDate).local()
}

/**
 * Formatea una fecha UTC a hora local en formato "HH:mm" (24 horas)
 * @param utcDate - Fecha en formato UTC
 * @returns String con formato "15:30"
 */
export const formatTimeLocal = (utcDate: string | Date): string => {
  return utcToLocal(utcDate).format('HH:mm')
}

/**
 * Formatea una fecha UTC a hora local en formato "hh:mm A" (12 horas con AM/PM)
 * @param utcDate - Fecha en formato UTC
 * @returns String con formato "03:30 PM"
 */
export const formatTime12Local = (utcDate: string | Date): string => {
  return utcToLocal(utcDate).format('hh:mm A')
}

/**
 * Formatea una fecha UTC a formato completo local
 * @param utcDate - Fecha en formato UTC
 * @returns String con formato "15 de Enero, 2025 - 15:30"
 */
export const formatDateTimeLocal = (utcDate: string | Date): string => {
  return utcToLocal(utcDate).format('DD [de] MMMM, YYYY - HH:mm')
}

/**
 * Formatea una fecha UTC a formato corto local
 * @param utcDate - Fecha en formato UTC
 * @returns String con formato "15/01/2025"
 */
export const formatDateLocal = (utcDate: string | Date): string => {
  return utcToLocal(utcDate).format('DD/MM/YYYY')
}

/**
 * Obtiene la zona horaria actual del usuario
 * @returns String con el nombre de la zona horaria (ej: "America/Lima", "Europe/Madrid")
 */
export const getUserTimezone = (): string => {
  return dayjs.tz.guess()
}

/**
 * Convierte fecha local del usuario a UTC
 * @param localDate - Fecha en hora local
 * @returns Fecha en formato UTC ISO string
 */
export const localToUTC = (localDate: Date | string): string => {
  return dayjs(localDate).utc().toISOString()
}
