# 🚀 Configuração do Banco Neon (PostgreSQL Online Gratuito)

## 1. Criar conta no Neon
1. Acesse: https://neon.tech
2. Clique em "Sign Up" 
3. Use GitHub ou Google para login rápido

## 2. Criar projeto
1. Clique em "Create Project"
2. Nome: `hotwheels-catalog`
3. Região: `US East (Ohio)` (mais próxima)
4. PostgreSQL version: `16` (mais recente)

## 3. Obter string de conexão
1. No dashboard, clique em "Connection Details"
2. Copie a "Connection string"
3. Formato: `postgresql://username:password@host/database?sslmode=require`

## 4. Configurar no projeto
1. Substitua a `DATABASE_URL` no arquivo `.env.local`
2. Cole a string de conexão completa do Neon

## 5. Executar migrações
```bash
# Instalar Drizzle CLI se não tiver
npm install -g drizzle-kit

# Executar migrações
npx drizzle-kit push

# Verificar se funcionou
npm run dev
```

## 6. Benefícios do Neon
- ✅ **Gratuito:** 512MB storage, 1 projeto
- ✅ **Serverless:** Escala automaticamente
- ✅ **Backup automático:** Dados seguros
- ✅ **SSL:** Conexão segura
- ✅ **Dashboard:** Interface visual para SQL

## 7. Alternativas (caso prefira)
- **Supabase:** https://supabase.com (também gratuito)
- **PlanetScale:** https://planetscale.com (MySQL)
- **Railway:** https://railway.app (PostgreSQL)

Após configurar, execute: `npm run dev` para testar!
