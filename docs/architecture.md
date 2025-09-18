# 🏗️ Arquitetura do Sistema - Hot Wheels Catalog

## 📊 Diagrama de Arquitetura

```mermaid
graph TB
    subgraph "Frontend - Next.js 14"
        A[Pages Router] --> B[React Components]
        B --> C[UI Components]
        C --> D[Tailwind CSS]
        B --> E[TanStack Query]
        E --> F[State Management]
    end
    
    subgraph "API Layer"
        G[API Routes] --> H[Middleware]
        H --> I[Authentication]
        I --> J[Rate Limiting]
        G --> K[Validation]
        K --> L[Zod Schemas]
    end
    
    subgraph "Database Layer"
        M[PostgreSQL] --> N[Drizzle ORM]
        N --> O[Database Schema]
        O --> P[Migrations]
    end
    
    subgraph "Authentication"
        Q[NextAuth.js] --> R[OAuth Providers]
        R --> S[Google]
        R --> T[GitHub]
        Q --> U[JWT Tokens]
    end
    
    subgraph "External Services"
        V[Vercel Deployment]
        W[Neon Database]
        X[GitHub OAuth]
        Y[Google OAuth]
    end
    
    A --> G
    G --> N
    Q --> G
    V --> A
    W --> M
    X --> S
    Y --> T
    
    classDef frontend fill:#FF7800,stroke:#000,color:#000
    classDef api fill:#4CAF50,stroke:#000,color:#fff
    classDef database fill:#2196F3,stroke:#000,color:#fff
    classDef auth fill:#9C27B0,stroke:#000,color:#fff
    classDef external fill:#607D8B,stroke:#000,color:#fff
    
    class A,B,C,D,E,F frontend
    class G,H,I,J,K,L api
    class M,N,O,P database
    class Q,R,S,T,U auth
    class V,W,X,Y external
```

## 🔧 Componentes Principais

### Frontend (Next.js 14)
- **Pages Router**: Roteamento baseado em arquivos
- **React Components**: Componentes funcionais com hooks
- **UI Components**: Sistema de design reutilizável
- **Tailwind CSS**: Estilização utilitária
- **TanStack Query**: Gerenciamento de estado servidor

### API Layer
- **API Routes**: Endpoints RESTful
- **Middleware**: Autenticação e rate limiting
- **Validation**: Validação com Zod schemas
- **Error Handling**: Tratamento centralizado de erros

### Database
- **PostgreSQL**: Banco de dados relacional
- **Drizzle ORM**: ORM type-safe
- **Migrations**: Controle de versão do schema
- **Connection Pooling**: Pool de conexões otimizado

### Authentication
- **NextAuth.js**: Sistema de autenticação
- **OAuth Providers**: Google e GitHub
- **JWT Tokens**: Tokens seguros
- **Session Management**: Gerenciamento de sessões

## 📁 Estrutura de Pastas

```
catalogo-hotwheels/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   ├── cars/              # Páginas de carros
│   ├── favorites/         # Páginas de favoritos
│   ├── lists/             # Páginas de listas
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizáveis
│   └── ...               # Componentes específicos
├── lib/                  # Utilitários e configurações
│   ├── auth.ts           # Configuração NextAuth
│   ├── db.ts             # Configuração database
│   └── utils.ts          # Funções utilitárias
├── __tests__/            # Testes automatizados
├── docs/                 # Documentação
└── public/               # Assets estáticos
```

## 🔄 Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    participant Auth as NextAuth
    
    U->>F: Acessa aplicação
    F->>Auth: Verifica autenticação
    Auth-->>F: Status de auth
    
    alt Usuário autenticado
        F->>A: Requisição API
        A->>A: Middleware validation
        A->>D: Query database
        D-->>A: Retorna dados
        A-->>F: Response JSON
        F-->>U: Renderiza interface
    else Usuário não autenticado
        F-->>U: Redireciona para login
        U->>Auth: Login OAuth
        Auth-->>U: Callback com token
    end
```

## 🛡️ Segurança

### Autenticação
- OAuth 2.0 com Google e GitHub
- JWT tokens seguros
- Session management
- CSRF protection

### API Security
- Rate limiting por IP
- Input validation com Zod
- SQL injection prevention
- Error sanitization

### Database Security
- Connection pooling
- Prepared statements
- Environment variables
- SSL connections

## 📈 Performance

### Frontend Optimizations
- Code splitting automático
- Lazy loading de componentes
- Image optimization
- Bundle analysis

### API Optimizations
- Response caching
- Database connection pooling
- Query optimization
- Compression

### Database Optimizations
- Indexed queries
- Connection pooling
- Query optimization
- Pagination

## 🧪 Estratégia de Testes

### Testes Unitários
- Componentes React
- Funções utilitárias
- Validação de schemas
- API endpoints

### Testes de Integração
- Fluxos completos
- Database operations
- Authentication flows
- API integration

### Testes E2E
- User journeys
- Critical paths
- Cross-browser testing
- Performance testing

## 🚀 Deploy e CI/CD

```mermaid
graph LR
    A[GitHub Push] --> B[Vercel Build]
    B --> C[Run Tests]
    C --> D[Build Next.js]
    D --> E[Deploy Preview]
    E --> F[Production Deploy]
    
    G[Database] --> H[Neon PostgreSQL]
    I[Environment] --> J[Vercel Env Vars]
    
    classDef deploy fill:#00D9FF,stroke:#000,color:#000
    class A,B,C,D,E,F deploy
```

## 📊 Monitoramento

### Performance Monitoring
- Lighthouse CI
- Core Web Vitals
- Bundle size tracking
- API response times

### Error Tracking
- Error boundaries
- API error logging
- User feedback
- Performance metrics

### Analytics
- User behavior
- Feature usage
- Performance metrics
- Error rates
