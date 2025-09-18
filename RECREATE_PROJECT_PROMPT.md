# 🚀 Prompt Completo para Recriar o Hot Wheels Catalog

## 📋 **Prompt Principal para Amazon Q Developer**

```
Crie um catálogo completo de Hot Wheels com as seguintes especificações:

### 🎯 TECNOLOGIAS CORE
- Next.js 14 com App Router e TypeScript
- Tailwind CSS para styling responsivo
- PostgreSQL com Drizzle ORM
- NextAuth.js para autenticação
- Estrutura organizada em /src, /config, /tools

### 🏗️ ARQUITETURA DO PROJETO
1. **Frontend (Next.js 14)**
   - App Router com páginas: /, /cars, /packs, /favorites, /lists, /perfil
   - Componentes reutilizáveis em src/components/
   - Sistema de UI components (Button, Modal, Card, etc.)
   - Hooks customizados em src/hooks/
   - Contexts para estado global em src/contexts/

2. **Backend (API Routes)**
   - /api/cars - CRUD completo de carrinhos
   - /api/packs - Gerenciamento de pacotes
   - /api/favorites - Sistema de favoritos
   - /api/lists - Listas personalizadas
   - /api/auth - Autenticação NextAuth
   - /api/health - Health check

3. **Banco de Dados (PostgreSQL + Drizzle)**
   - Tabela cars: id, name, brand, year, color, category, image_url, rarity
   - Tabela packs: id, name, year, theme, cars_count, image_url
   - Tabela favorites: user_id, car_id, created_at
   - Tabela lists: id, user_id, name, description, cars (JSON)
   - Relacionamentos e índices otimizados

### 🎨 DESIGN E UX
- Design moderno com tema Hot Wheels (vermelho, azul, amarelo)
- Interface responsiva mobile-first
- Componentes acessíveis (WCAG AAA)
- Loading states e error boundaries
- Animações suaves com Tailwind

### 🔧 FUNCIONALIDADES PRINCIPAIS
1. **Catálogo de Carros**
   - Listagem com filtros (marca, ano, cor, categoria, raridade)
   - Busca por nome
   - Modal detalhado para cada carro
   - Sistema de favoritos
   - Paginação otimizada

2. **Gerenciamento de Pacotes**
   - Listagem de pacotes Hot Wheels
   - Filtros por ano e tema
   - Visualização de carros do pacote

3. **Sistema de Usuário**
   - Autenticação com NextAuth (Google, GitHub)
   - Perfil personalizado
   - Listas personalizadas de carros
   - Favoritos sincronizados

4. **Dashboard e Analytics**
   - Estatísticas da coleção
   - Performance da aplicação
   - Métricas de uso

### 🧪 QUALIDADE E TESTES
- Testes unitários com Jest + Testing Library
- Testes de API routes
- Testes de componentes React
- Coverage mínimo de 80%
- ESLint + Prettier configurados

### ♿ ACESSIBILIDADE (WCAG AAA)
- Contraste de cores 7:1
- Navegação por teclado completa
- Labels ARIA descritivos
- Skip links implementados
- Suporte a screen readers
- Componente AccessibilityProvider

### 🚀 INFRAESTRUTURA E DEPLOY
1. **Opções de Deploy Gratuitas**
   - Vercel (recomendado)
   - Railway
   - Render
   - Supabase + Netlify

2. **Infraestrutura AWS (Terraform)**
   - EC2 + RDS para produção
   - S3 para assets estáticos
   - CloudFront para CDN
   - Estimativa de custos documentada

### 🔧 MODEL CONTEXT PROTOCOL (MCP)
- Configuração para Amazon Q Developer
- Servidor ESLint MCP oficial (@eslint/mcp)
- Servidor Filesystem MCP
- Servidores AWS MCP (awslabs/mcp)
- Configuração otimizada em config/mcp/

### 📊 PERFORMANCE
- Lighthouse score 98/100
- Core Web Vitals otimizados
- Lazy loading de imagens
- Code splitting automático
- Preload de recursos críticos

### 🗂️ ESTRUTURA DE PASTAS
```
projeto/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilitários
│   ├── types/         # TypeScript types
│   ├── contexts/      # React contexts
│   └── utils/         # Funções auxiliares
├── app/               # Next.js App Router
├── config/
│   ├── mcp/          # Configurações MCP
│   ├── database/     # Schemas DB
│   └── deployment/   # IaC
├── tools/
│   ├── scripts/      # Scripts automação
│   └── mcp-servers/  # MCP customizados
├── __tests__/        # Testes
├── public/           # Assets estáticos
└── docs/            # Documentação
```

### 📝 DADOS INICIAIS
Popule com 50+ carros Hot Wheels reais incluindo:
- Modelos clássicos (Redline, Blackwall)
- Séries especiais (Treasure Hunt, Super Treasure Hunt)
- Marcas variadas (Ferrari, Lamborghini, Ford, etc.)
- Diferentes categorias (Sports Car, Truck, Motorcycle)
- Raridades (Common, Uncommon, Rare, Ultra Rare)

### 🎯 REQUISITOS ESPECÍFICOS
1. **Vibe Coding**: Desenvolvimento natural e intuitivo
2. **94% código IA**: Máximo uso do Amazon Q Developer
3. **Zero bugs**: Código robusto com error handling
4. **Documentação completa**: README detalhado com screenshots
5. **Tag GitHub**: q-developer-quest-tdc-2025

### 🏆 DIFERENCIAIS
- Sistema de listas personalizadas único
- Performance excepcional (Lighthouse 98/100)
- Acessibilidade WCAG AAA completa
- MCP integrado nativamente
- Infraestrutura escalável documentada
- Testes abrangentes (29+ testes)

Implemente seguindo boas práticas de desenvolvimento, com código limpo, 
comentários explicativos e arquitetura escalável. O projeto deve ser 
uma referência de qualidade para catálogos web modernos.
```

## 🔧 **Comandos de Setup Rápido**

```bash
# 1. Criar projeto
npx create-next-app@14 hot-wheels-catalog --typescript --tailwind --app

# 2. Instalar dependências principais
npm install drizzle-orm pg next-auth @next-auth/drizzle-adapter

# 3. Instalar dependências de desenvolvimento
npm install -D @types/pg drizzle-kit jest @testing-library/react

# 4. Configurar MCP
npm install -g @eslint/mcp @modelcontextprotocol/server-filesystem

# 5. Setup banco de dados
# Configurar PostgreSQL local ou usar Supabase

# 6. Configurar autenticação
# Setup NextAuth com providers (Google, GitHub)

# 7. Implementar estrutura de pastas
# Organizar em src/, config/, tools/

# 8. Desenvolver componentes e páginas
# Seguir design system Hot Wheels

# 9. Implementar testes
# Jest + Testing Library

# 10. Deploy
# Vercel ou plataforma escolhida
```

## 📚 **Documentação de Referência**

- **Next.js 14**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs
- **NextAuth.js**: https://next-auth.js.org/getting-started
- **MCP Protocol**: https://modelcontextprotocol.io/
- **ESLint MCP**: https://eslint.org/docs/latest/use/mcp
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Este prompt recria 100% do projeto Hot Wheels Catalog com todas as funcionalidades, 
qualidade e boas práticas implementadas.**
