require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não configurada');
    process.exit(1);
  }

  try {
    console.log('🔄 Conectando ao banco...');
    const client = postgres(process.env.DATABASE_URL);

    console.log('🔄 Criando tabelas...');
    
    // Criar tabela users (NextAuth)
    await client`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        "emailVerified" TIMESTAMP,
        image TEXT
      )
    `;

    // Criar tabela accounts (NextAuth)
    await client`
      CREATE TABLE IF NOT EXISTS accounts (
        "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, "providerAccountId")
      )
    `;

    // Criar tabela sessions (NextAuth)
    await client`
      CREATE TABLE IF NOT EXISTS sessions (
        "sessionToken" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL
      )
    `;

    // Criar tabela hotwheels
    await client`
      CREATE TABLE IF NOT EXISTS hotwheels (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        nome TEXT NOT NULL,
        serie TEXT NOT NULL,
        ano INTEGER NOT NULL,
        raridade TEXT NOT NULL,
        cor TEXT,
        tipo TEXT DEFAULT 'blister',
        observacoes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('✅ Tabelas criadas com sucesso!');
    
    // Verificar tabelas criadas
    const tables = await client`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📊 Tabelas no banco:', tables.map(t => t.table_name));
    
    await client.end();
    console.log('🎯 Banco inicializado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error.message);
    process.exit(1);
  }
}

initDatabase();
