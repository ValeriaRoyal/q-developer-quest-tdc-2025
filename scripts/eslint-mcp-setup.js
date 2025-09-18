#!/usr/bin/env node

/**
 * ESLint MCP Server Setup Script
 * Baseado em: https://eslint.org/docs/latest/use/mcp
 * Para Hot Wheels Catalog - TDC São Paulo 2025
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔧 ESLint MCP Server Setup')
console.log('📚 Baseado em: https://eslint.org/docs/latest/use/mcp')
console.log('')

// Verificar se ESLint está instalado
try {
  execSync('npx eslint --version', { stdio: 'pipe' })
  console.log('✅ ESLint encontrado')
} catch (error) {
  console.log('📦 Instalando ESLint...')
  execSync('npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin', { stdio: 'inherit' })
}

// Executar ESLint no projeto
function runESLint(command, description) {
  console.log(`\n🔍 ${description}`)
  try {
    const output = execSync(command, { 
      encoding: 'utf8',
      cwd: process.cwd()
    })
    console.log(output)
    return { success: true, output }
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`)
    if (error.stdout) console.log(error.stdout)
    return { success: false, error: error.message }
  }
}

// Simular funcionalidades do ESLint MCP Server
const eslintMCPTools = {
  lint_file: (filePath) => {
    return runESLint(`npx eslint "${filePath}"`, `Linting arquivo: ${filePath}`)
  },
  
  lint_project: () => {
    return runESLint('npx eslint . --ext .js,.jsx,.ts,.tsx', 'Linting projeto completo')
  },
  
  fix_file: (filePath) => {
    return runESLint(`npx eslint "${filePath}" --fix`, `Auto-fix arquivo: ${filePath}`)
  },
  
  fix_project: () => {
    return runESLint('npx eslint . --ext .js,.jsx,.ts,.tsx --fix', 'Auto-fix projeto completo')
  },
  
  get_rules: () => {
    return runESLint('npx eslint --print-config .eslintrc.json', 'Obtendo regras ESLint')
  },
  
  check_config: () => {
    return runESLint('npx eslint --print-config package.json', 'Validando configuração ESLint')
  }
}

// Executar demonstração das funcionalidades
console.log('\n🚀 Demonstração ESLint MCP Tools:')

// 1. Verificar configuração
eslintMCPTools.check_config()

// 2. Lint arquivos específicos
const filesToLint = [
  'components/CarModal.tsx',
  'components/CarsPage.tsx',
  'app/page.tsx'
]

filesToLint.forEach(file => {
  if (fs.existsSync(file)) {
    eslintMCPTools.lint_file(file)
  }
})

// 3. Lint projeto completo (apenas mostrar comando)
console.log('\n📋 Para usar com MCP:')
console.log('q chat --mcp-config mcp-eslint.json')
console.log('')
console.log('💡 Comandos disponíveis:')
console.log('"Lint the file components/CarModal.tsx"')
console.log('"Fix all ESLint issues in the project"')
console.log('"Check what ESLint rules are available"')
console.log('"Validate the current ESLint configuration"')

// Gerar relatório
const report = {
  timestamp: new Date().toISOString(),
  project: 'Hot Wheels Catalog',
  eslint_version: execSync('npx eslint --version', { encoding: 'utf8' }).trim(),
  config_file: '.eslintrc.json',
  files_checked: filesToLint.filter(f => fs.existsSync(f)),
  mcp_config: 'mcp-eslint.json',
  status: 'configured'
}

fs.writeFileSync('eslint-mcp-report.json', JSON.stringify(report, null, 2))
console.log('\n📄 Relatório salvo: eslint-mcp-report.json')
console.log('\n✅ ESLint MCP Setup concluído!')
