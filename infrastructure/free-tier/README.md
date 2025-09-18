# 🆓 Deployment Gratuito - Hot Wheels Catalog

> **Opções 100% gratuitas para hospedar o projeto desenvolvido com Amazon Q Developer**

## 🎯 Opções Gratuitas Disponíveis

### 1. 🚀 **Vercel + Neon (ATUAL - Recomendado)**
- ✅ **Frontend:** Vercel (gratuito)
- ✅ **Database:** Neon PostgreSQL (500MB gratuito)
- ✅ **Auth:** NextAuth.js
- ✅ **Deploy:** Automático via GitHub

**Custo:** R$ 0,00/mês

### 2. 🚂 **Railway**
- ✅ **Full-stack:** App + Database
- ✅ **PostgreSQL:** Incluído
- ✅ **$5 crédito/mês** gratuito
- ✅ **Deploy:** Git push

**Custo:** R$ 0,00/mês (com créditos)

### 3. 🎨 **Render**
- ✅ **Web Service:** Gratuito
- ✅ **PostgreSQL:** 1GB gratuito
- ✅ **SSL:** Automático
- ✅ **Deploy:** GitHub integration

**Custo:** R$ 0,00/mês

### 4. ⚡ **Supabase**
- ✅ **Database:** PostgreSQL gratuito
- ✅ **Auth:** Integrado
- ✅ **Storage:** 1GB gratuito
- ✅ **API:** Auto-gerada

**Custo:** R$ 0,00/mês

### 5. 🐳 **Docker Local**
- ✅ **PostgreSQL:** Container local
- ✅ **Redis:** Cache opcional
- ✅ **Desenvolvimento:** Completo
- ✅ **Produção:** VPS barata

**Custo:** R$ 0,00 (local) ou ~R$ 20/mês (VPS)

## 🚀 Setup Rápido por Plataforma

### 🔥 **Vercel + Neon (Atual)**
```bash
# Já configurado!
# 1. Fork do repositório
# 2. Conectar no Vercel
# 3. Configurar env vars
# 4. Deploy automático
```

### 🚂 **Railway**
```bash
# 1. Conectar GitHub no Railway
# 2. Importar repositório
# 3. Adicionar PostgreSQL plugin
# 4. Deploy automático

# Configuração: railway.json já incluído
```

### 🎨 **Render**
```bash
# 1. Conectar GitHub no Render
# 2. Criar Web Service
# 3. Criar PostgreSQL database
# 4. Configurar env vars

# Configuração: render.yaml já incluído
```

### ⚡ **Supabase**
```bash
# 1. Criar projeto no Supabase
# 2. Executar SQL schema (supabase.sql)
# 3. Configurar Auth providers
# 4. Deploy no Vercel com Supabase

# Schema SQL já incluído
```

### 🐳 **Docker Local**
```bash
# 1. Instalar Docker
docker-compose up -d

# 2. Configurar .env.local
DATABASE_URL="postgresql://hotwheels_user:hotwheels_password@localhost:5432/hotwheels"

# 3. Executar aplicação
npm run dev
```

## 💰 Comparação de Custos

| Plataforma | App | Database | Storage | Custo/Mês |
|------------|-----|----------|---------|-----------|
| **Vercel + Neon** | Gratuito | 500MB | 1GB | **R$ 0** |
| **Railway** | $5 crédito | Incluído | 1GB | **R$ 0** |
| **Render** | Gratuito | 1GB | - | **R$ 0** |
| **Supabase** | - | 500MB | 1GB | **R$ 0** |
| **Docker + VPS** | - | Ilimitado | Ilimitado | **R$ 20** |

## 🔧 Configuração de Environment Variables

### Todas as Plataformas
```bash
# Database
DATABASE_URL="sua-connection-string"

# NextAuth
NEXTAUTH_URL="https://seu-dominio.com"
NEXTAUTH_SECRET="sua-chave-secreta-32-chars"

# OAuth (opcional)
GITHUB_CLIENT_ID="seu-github-id"
GITHUB_CLIENT_SECRET="seu-github-secret"
GOOGLE_CLIENT_ID="seu-google-id"
GOOGLE_CLIENT_SECRET="seu-google-secret"
```

## 📊 Limites Gratuitos

### Vercel
- ✅ **Builds:** 6.000/mês
- ✅ **Bandwidth:** 100GB/mês
- ✅ **Functions:** 100GB-Hrs/mês

### Neon
- ✅ **Storage:** 500MB
- ✅ **Compute:** 100 horas/mês
- ✅ **Branches:** 10

### Railway
- ✅ **Créditos:** $5/mês
- ✅ **Usage:** ~550 horas/mês
- ✅ **Builds:** Ilimitados

### Render
- ✅ **Web Services:** 750 horas/mês
- ✅ **Database:** 1GB storage
- ✅ **Bandwidth:** 100GB/mês

### Supabase
- ✅ **Database:** 500MB
- ✅ **Auth:** 50.000 usuários
- ✅ **Storage:** 1GB
- ✅ **Edge Functions:** 500.000 invocações

## 🎯 Recomendação

### Para TDC 2025 Demo:
**Vercel + Neon** (atual setup)
- ✅ Já configurado
- ✅ Deploy automático
- ✅ Performance excelente
- ✅ Zero configuração

### Para Produção:
**Railway** ou **Render**
- ✅ Mais recursos
- ✅ Melhor performance
- ✅ Suporte completo

### Para Desenvolvimento:
**Docker Local**
- ✅ Controle total
- ✅ Desenvolvimento offline
- ✅ Testes completos

## 🚀 Deploy em 5 Minutos

### Railway (Mais Fácil)
1. Acesse [railway.app](https://railway.app)
2. "Deploy from GitHub repo"
3. Selecione o repositório
4. Adicione PostgreSQL plugin
5. Deploy automático! 🎉

### Render
1. Acesse [render.com](https://render.com)
2. "New Web Service"
3. Conecte GitHub
4. "New PostgreSQL"
5. Configure env vars
6. Deploy! 🚀

**Projeto 100% gratuito e funcional!** 🆓✨
