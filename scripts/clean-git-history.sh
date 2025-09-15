#!/bin/bash

echo "🚨 LIMPEZA DE SEGURANÇA DO GIT"
echo "================================"
echo ""
echo "⚠️  ATENÇÃO: Este script irá:"
echo "   • Remover credenciais do histórico"
echo "   • Reescrever commits afetados"
echo "   • Forçar push (se necessário)"
echo ""

read -p "Continuar? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operação cancelada"
    exit 1
fi

echo "🔄 Removendo credenciais do histórico..."

# Remover credenciais específicas do histórico
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch test-connection.js' \
  --prune-empty --tag-name-filter cat -- --all

# Limpar referências
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✅ Histórico limpo!"
echo ""
echo "🔧 Próximos passos:"
echo "   1. Trocar credenciais do banco de dados"
echo "   2. Gerar novos secrets: node scripts/generate-secrets.js"
echo "   3. Force push: git push --force-with-lease origin main"
echo ""
echo "⚠️  IMPORTANTE: Coordene com a equipe antes do force push!"
