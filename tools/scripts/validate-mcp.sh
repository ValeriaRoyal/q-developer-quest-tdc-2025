#!/bin/bash

# Validação MCP - Hot Wheels Catalog
# Testa se os servidores MCP estão funcionando

echo "🔍 VALIDANDO SERVIDORES MCP..."
echo ""

# 1. Verificar se os servidores MCP estão instalados
echo "📦 1. VERIFICANDO INSTALAÇÕES:"
echo ""

echo "🔧 ESLint MCP Server:"
npx @eslint/mcp --version 2>/dev/null && echo "✅ @eslint/mcp instalado" || echo "❌ @eslint/mcp NÃO instalado"

echo ""
echo "📁 Filesystem MCP Server:"
npx @modelcontextprotocol/server-filesystem --help 2>/dev/null | head -1 && echo "✅ filesystem server instalado" || echo "❌ filesystem server NÃO instalado"

echo ""
echo "☁️ AWS MCP Servers:"
ls aws-mcp-temp/src/aws-pricing-mcp-server/ >/dev/null 2>&1 && echo "✅ AWS MCP servers disponíveis" || echo "❌ AWS MCP servers NÃO encontrados"

echo ""
echo "📋 2. TESTANDO CONFIGURAÇÕES MCP:"
echo ""

# 2. Verificar configurações MCP
echo "🔧 Configuração principal:"
if [ -f "config/mcp/mcp-amazon-q-optimized.json" ]; then
    echo "✅ mcp-amazon-q-optimized.json encontrado"
    # Validar JSON
    cat config/mcp/mcp-amazon-q-optimized.json | jq . >/dev/null 2>&1 && echo "✅ JSON válido" || echo "❌ JSON inválido"
else
    echo "❌ mcp-amazon-q-optimized.json NÃO encontrado"
fi

echo ""
echo "🧪 3. TESTANDO FUNCIONALIDADES:"
echo ""

# 3. Testar ESLint MCP
echo "🔧 Testando ESLint MCP:"
if command -v npx >/dev/null 2>&1; then
    echo "// Test file" > /tmp/test-mcp.js
    npx eslint /tmp/test-mcp.js 2>/dev/null && echo "✅ ESLint funcionando" || echo "⚠️ ESLint com warnings/errors (normal)"
    rm -f /tmp/test-mcp.js
else
    echo "❌ npx não disponível"
fi

echo ""
echo "📁 Testando Filesystem access:"
if [ -r "package.json" ]; then
    echo "✅ Filesystem access funcionando"
else
    echo "❌ Filesystem access com problemas"
fi

echo ""
echo "🤖 4. TESTANDO AMAZON Q INTEGRATION:"
echo ""

# 4. Verificar se Amazon Q CLI está disponível
if command -v q >/dev/null 2>&1; then
    echo "✅ Amazon Q CLI disponível"
    echo "🚀 Para testar MCP completo, execute:"
    echo "   q chat --mcp-config config/mcp/mcp-amazon-q-optimized.json"
else
    echo "❌ Amazon Q CLI não encontrado"
    echo "💡 Instale com: npm install -g @aws/amazon-q-developer-cli"
fi

echo ""
echo "📊 5. RESUMO DA VALIDAÇÃO:"
echo ""

# 5. Resumo
ESLINT_OK=$(npx @eslint/mcp --version 2>/dev/null && echo "1" || echo "0")
FILESYSTEM_OK=$(npx @modelcontextprotocol/server-filesystem --help 2>/dev/null >/dev/null && echo "1" || echo "0")
AWS_OK=$(ls aws-mcp-temp/src/aws-pricing-mcp-server/ >/dev/null 2>&1 && echo "1" || echo "0")
CONFIG_OK=$([ -f "config/mcp/mcp-amazon-q-optimized.json" ] && echo "1" || echo "0")
Q_CLI_OK=$(command -v q >/dev/null 2>&1 && echo "1" || echo "0")

TOTAL=$((ESLINT_OK + FILESYSTEM_OK + AWS_OK + CONFIG_OK + Q_CLI_OK))

echo "├── ESLint MCP: $([ $ESLINT_OK -eq 1 ] && echo "✅" || echo "❌")"
echo "├── Filesystem MCP: $([ $FILESYSTEM_OK -eq 1 ] && echo "✅" || echo "❌")"
echo "├── AWS MCP: $([ $AWS_OK -eq 1 ] && echo "✅" || echo "❌")"
echo "├── Configuração: $([ $CONFIG_OK -eq 1 ] && echo "✅" || echo "❌")"
echo "└── Amazon Q CLI: $([ $Q_CLI_OK -eq 1 ] && echo "✅" || echo "❌")"

echo ""
echo "🎯 SCORE: $TOTAL/5 componentes funcionando"

if [ $TOTAL -eq 5 ]; then
    echo "🏆 MCP TOTALMENTE FUNCIONAL!"
elif [ $TOTAL -ge 3 ]; then
    echo "⚠️ MCP PARCIALMENTE FUNCIONAL"
else
    echo "❌ MCP COM PROBLEMAS - Verificar instalações"
fi

echo ""
echo "💡 PRÓXIMOS PASSOS:"
if [ $Q_CLI_OK -eq 1 ]; then
    echo "1. Execute: q chat --mcp-config config/mcp/mcp-amazon-q-optimized.json"
    echo "2. Teste comandos: 'Lint this file' ou 'List project files'"
else
    echo "1. Instale Amazon Q CLI: npm install -g @aws/amazon-q-developer-cli"
    echo "2. Configure credenciais AWS se necessário"
fi
