const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

async function testConnection() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não configurada no .env.local');
    process.exit(1);
  }
  
  try {
    console.log('🔄 Testando conexão com banco...');
    
    const client = postgres(process.env.DATABASE_URL);
    const db = drizzle(client);
    
    const result = await client`SELECT version()`;
    console.log('✅ Conexão bem-sucedida!');
    console.log('📊 PostgreSQL version:', result[0].version.split(' ')[0]);
    
    await client.end();
    console.log('🎯 Banco pronto para uso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.log('🔧 Verifique:');
    console.log('   • URL de conexão no .env.local');
    console.log('   • Firewall/rede');
    console.log('   • Credenciais do banco');
  }
}

testConnection();
