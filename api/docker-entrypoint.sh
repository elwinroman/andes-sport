#!/bin/sh
# deshabilitado, se está teniendo errores de migración automatizado, ejecutar las migraciones manualmente
set -e

echo "Esperando que la base de datos esté disponible en $DB_HOST:$DB_PORT ..."
until nc -z $DB_HOST $DB_PORT; do
  echo "Esperando a que la base de datos inicie..."
  sleep 3
done

echo "Base de datos lista. Ejecutando migraciones..."
pnpm run migration:run:prod

echo "Iniciando aplicación..."
exec "$@"
