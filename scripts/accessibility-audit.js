#!/usr/bin/env node

/**
 * Accessibility Audit Script
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 * Usa MCP para melhorias de acessibilidade
 */

const fs = require('fs');
const path = require('path');

// Configuração de acessibilidade
const ACCESSIBILITY_CONFIG = {
  wcagLevel: 'AAA',
  colorContrastRatio: '7:1',
  focusIndicators: 'required',
  ariaCompliance: 'strict'
};

// Componentes para auditoria
const COMPONENTS_TO_AUDIT = [
  'components/CarModal.tsx',
  'components/CarsPage.tsx', 
  'components/Header.tsx',
  'components/CarsList.tsx',
  'components/SearchBar.tsx'
];

// Regras de acessibilidade
const ACCESSIBILITY_RULES = {
  // ARIA Labels obrigatórios
  ariaLabels: {
    button: ['aria-label', 'aria-labelledby'],
    input: ['aria-label', 'aria-labelledby'],
    img: ['alt', 'aria-label'],
    link: ['aria-label', 'aria-labelledby']
  },
  
  // Hierarquia de headings
  headingHierarchy: {
    pattern: /^h[1-6]$/i,
    sequence: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  
  // Contraste de cores
  colorContrast: {
    normal: '4.5:1',
    large: '3:1',
    aaa: '7:1'
  },
  
  // Navegação por teclado
  keyboardNavigation: {
    focusable: ['button', 'input', 'select', 'textarea', 'a'],
    tabIndex: [-1, 0]
  }
};

/**
 * Analisa arquivo de componente para problemas de acessibilidade
 */
function analyzeComponent(filePath) {
  console.log(`🔍 Analisando: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Arquivo não encontrado: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Verificar ARIA labels
  const buttonMatches = content.match(/<button[^>]*>/g) || [];
  buttonMatches.forEach((button, index) => {
    if (!button.includes('aria-label') && !button.includes('aria-labelledby')) {
      issues.push({
        type: 'missing-aria-label',
        element: 'button',
        line: index + 1,
        severity: 'high',
        message: 'Button sem aria-label ou aria-labelledby'
      });
    }
  });
  
  // Verificar imagens sem alt
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  imgMatches.forEach((img, index) => {
    if (!img.includes('alt=')) {
      issues.push({
        type: 'missing-alt-text',
        element: 'img',
        line: index + 1,
        severity: 'high',
        message: 'Imagem sem texto alternativo (alt)'
      });
    }
  });
  
  // Verificar hierarquia de headings
  const headingMatches = content.match(/<h[1-6][^>]*>/g) || [];
  if (headingMatches.length > 0) {
    const levels = headingMatches.map(h => parseInt(h.match(/h([1-6])/)[1]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] > levels[i-1] + 1) {
        issues.push({
          type: 'heading-hierarchy',
          element: `h${levels[i]}`,
          line: i + 1,
          severity: 'medium',
          message: `Hierarquia de heading incorreta: h${levels[i-1]} → h${levels[i]}`
        });
      }
    }
  }
  
  // Verificar inputs sem labels
  const inputMatches = content.match(/<input[^>]*>/g) || [];
  inputMatches.forEach((input, index) => {
    if (!input.includes('aria-label') && !input.includes('aria-labelledby')) {
      issues.push({
        type: 'missing-input-label',
        element: 'input',
        line: index + 1,
        severity: 'high',
        message: 'Input sem label acessível'
      });
    }
  });
  
  return issues;
}

/**
 * Gera sugestões de melhorias
 */
function generateImprovements(issues, filePath) {
  const improvements = [];
  
  issues.forEach(issue => {
    switch (issue.type) {
      case 'missing-aria-label':
        improvements.push({
          component: path.basename(filePath),
          fix: `Adicionar aria-label="${getContextualLabel(issue.element)}"`,
          code: `<button aria-label="${getContextualLabel(issue.element)}">`,
          priority: 'high'
        });
        break;
        
      case 'missing-alt-text':
        improvements.push({
          component: path.basename(filePath),
          fix: 'Adicionar texto alternativo descritivo',
          code: '<img alt="Descrição da imagem" />',
          priority: 'high'
        });
        break;
        
      case 'heading-hierarchy':
        improvements.push({
          component: path.basename(filePath),
          fix: 'Corrigir hierarquia de headings (h1→h2→h3)',
          code: 'Usar headings em sequência lógica',
          priority: 'medium'
        });
        break;
        
      case 'missing-input-label':
        improvements.push({
          component: path.basename(filePath),
          fix: 'Adicionar label ou aria-label ao input',
          code: '<input aria-label="Campo de busca" />',
          priority: 'high'
        });
        break;
    }
  });
  
  return improvements;
}

/**
 * Gera label contextual baseado no elemento
 */
function getContextualLabel(element) {
  const labels = {
    button: 'Executar ação',
    input: 'Campo de entrada',
    link: 'Navegar para'
  };
  return labels[element] || 'Elemento interativo';
}

/**
 * Executa auditoria completa
 */
function runAccessibilityAudit() {
  console.log('🚀 Iniciando Auditoria de Acessibilidade');
  console.log('📋 Configuração WCAG AAA');
  console.log('');
  
  const allIssues = [];
  const allImprovements = [];
  
  COMPONENTS_TO_AUDIT.forEach(componentPath => {
    const issues = analyzeComponent(componentPath);
    const improvements = generateImprovements(issues, componentPath);
    
    allIssues.push(...issues);
    allImprovements.push(...improvements);
    
    if (issues.length > 0) {
      console.log(`❌ ${path.basename(componentPath)}: ${issues.length} problemas`);
      issues.forEach(issue => {
        console.log(`   ${issue.severity === 'high' ? '🔴' : '🟡'} ${issue.message}`);
      });
    } else {
      console.log(`✅ ${path.basename(componentPath)}: Sem problemas detectados`);
    }
    console.log('');
  });
  
  // Gerar relatório
  const report = {
    timestamp: new Date().toISOString(),
    totalIssues: allIssues.length,
    highPriority: allIssues.filter(i => i.severity === 'high').length,
    mediumPriority: allIssues.filter(i => i.severity === 'medium').length,
    issues: allIssues,
    improvements: allImprovements,
    wcagLevel: ACCESSIBILITY_CONFIG.wcagLevel,
    componentsAudited: COMPONENTS_TO_AUDIT.length
  };
  
  // Salvar relatório
  fs.writeFileSync(
    'accessibility-report.json',
    JSON.stringify(report, null, 2)
  );
  
  console.log('📊 RESUMO DA AUDITORIA:');
  console.log(`├── Total de problemas: ${report.totalIssues}`);
  console.log(`├── Alta prioridade: ${report.highPriority}`);
  console.log(`├── Média prioridade: ${report.mediumPriority}`);
  console.log(`└── Componentes auditados: ${report.componentsAudited}`);
  console.log('');
  console.log('📄 Relatório salvo: accessibility-report.json');
  
  return report;
}

// Executar se chamado diretamente
if (require.main === module) {
  runAccessibilityAudit();
}

module.exports = { runAccessibilityAudit, analyzeComponent };
