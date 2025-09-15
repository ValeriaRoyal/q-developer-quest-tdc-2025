#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando banco de dados Hot Wheels...\n');

// Verificar se DATABASE_URL está configurada
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env.local não encontrado!');
  console.log('📝 Crie o arquivo .env.local com a DATABASE_URL do Neon');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('neon.tech') && !envContent.includes('supabase.co')) {
  console.log('⚠️  DATABASE_URL parece ser local. Configure um banco online:');
  console.log('   • Neon: https://neon.tech (recomendado)');
  console.log('   • Supabase: https://supabase.com');
  console.log('   • Railway: https://railway.app\n');
}

try {
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🔄 Executando migrações...');
  execSync('npm run db:push', { stdio: 'inherit' });

  console.log('\n✅ Banco configurado com sucesso!');
  console.log('🎯 Próximos passos:');
  console.log('   1. npm run dev - Iniciar servidor');
  console.log('   2. npm run db:studio - Abrir Drizzle Studio');
  console.log('   3. Acessar http://localhost:3000\n');

} catch (error) {
  console.error('\n❌ Erro na configuração:', error.message);
  console.log('\n🔧 Soluções:');
  console.log('   1. Verifique se a DATABASE_URL está correta');
  console.log('   2. Teste a conexão no dashboard do Neon');
  console.log('   3. Execute: npm run db:push manualmente');
  process.exit(1);
}
