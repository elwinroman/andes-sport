#!/bin/bash

# Script para ignorar builds en Vercel si solo hay cambios en la carpeta api/
# Este script retorna:
# - exit 0: Ignorar build (no construir)
# - exit 1: Proceder con el build

echo "🔍 Checking if build should proceed..."

# Obtener el commit anterior
if git rev-parse HEAD^ >/dev/null 2>&1; then
    PREV_COMMIT="HEAD^"
else
    # Si es el primer commit, construir siempre
    echo "✅ First commit detected, proceeding with build"
    exit 1
fi

# Obtener lista de archivos modificados
CHANGED_FILES=$(git diff --name-only $PREV_COMMIT HEAD)

echo "📝 Changed files:"
echo "$CHANGED_FILES"

# Verificar si hay cambios fuera de la carpeta api/
if echo "$CHANGED_FILES" | grep -v "^api/" | grep -q .; then
    echo "✅ Changes detected outside api/ folder, proceeding with build"
    exit 1
else
    echo "⏭️  Only api/ folder changed, skipping build"
    exit 0
fi
