# Hot Wheels Catalog - Project Rules

## 🎯 **Core Development Standards**

### **Next.js 14 & TypeScript Rules**
- All components must be TypeScript with proper type definitions
- Use Next.js 14 App Router exclusively, no Pages Router
- All API routes must include proper error handling and validation
- Components must be organized in src/components/ with clear naming
- Use server components by default, client components only when necessary

### **Code Quality & Testing**
- All new features must include corresponding tests (Jest + Testing Library)
- Maintain minimum 80% test coverage
- All functions must have TypeScript return types explicitly defined
- Use ESLint rules strictly, no warnings allowed in production builds
- All database queries must use Drizzle ORM with proper type safety

### **Accessibility (WCAG AAA) Requirements**
- All interactive elements must have proper ARIA labels
- Color contrast ratio must be minimum 7:1 for all text
- All forms must include proper validation and error messages
- Keyboard navigation must work for all interactive elements
- All images must have descriptive alt text

### **Performance Standards**
- Lighthouse performance score must remain above 95
- All images must be optimized using Next.js Image component
- Implement proper loading states for all async operations
- Use React.memo() for expensive components
- Database queries must be optimized with proper indexing

### **Security Rules**
- All API endpoints must validate input data using Zod schemas
- Never expose sensitive data in client-side code
- All database connections must use environment variables
- Implement proper rate limiting on API routes
- All user inputs must be sanitized before database operations

## 🗂️ **File Organization Standards**

### **Import Rules**
- Use path aliases (@/components, @/lib, @/types) for all imports
- Group imports: external libraries first, then internal modules
- No relative imports beyond one level (../), use path aliases instead
- All type imports must use 'import type' syntax

### **Component Structure**
- One component per file with matching filename
- Export component as default, types as named exports
- Props interface must be defined above component
- Use consistent naming: PascalCase for components, camelCase for functions

### **Database & API Rules**
- All database schemas must be defined in src/lib/db-schema.sql
- API routes must follow RESTful conventions
- Use proper HTTP status codes (200, 201, 400, 401, 404, 500)
- All API responses must follow consistent JSON structure

## 🎨 **Design System Rules**

### **Styling Guidelines**
- Use Tailwind CSS classes exclusively, no custom CSS unless absolutely necessary
- Follow Hot Wheels color palette: red (#dc2626), blue (#2563eb), yellow (#eab308)
- All components must be responsive (mobile-first approach)
- Use consistent spacing scale (4, 8, 12, 16, 24, 32px)

### **UI Component Standards**
- All UI components must be in src/components/ui/ directory
- Components must accept className prop for customization
- Use forwardRef for components that need DOM access
- All interactive components must have hover and focus states

## 🔧 **MCP Integration Rules**

### **Model Context Protocol Standards**
- Use only verified MCP servers (no hardcode simulations)
- MCP configurations must be in config/mcp/ directory
- Document all MCP tools and their purposes
- Test MCP integrations before committing

### **Amazon Q Developer Integration**
- Use mcp-amazon-q-optimized.json as primary configuration
- All prompts must follow Vibe Coding methodology
- Document significant AI-generated code sections
- Maintain 90%+ AI-generated code ratio

## 🚀 **Deployment & Infrastructure Rules**

### **Environment Configuration**
- All environment variables must be documented in .env.example
- Use different configurations for development, staging, production
- Never commit sensitive data (API keys, passwords) to repository
- All infrastructure must be defined as code (Terraform preferred)

### **AWS Infrastructure Standards**
- All S3 buckets must have encryption enabled and block public access
- All RDS instances must have encryption at rest enabled
- Use least privilege principle for all IAM roles and policies
- All resources must be tagged with project, environment, and owner

### **Cost Optimization Rules**
- Use AWS Free Tier resources for development and testing
- Document all infrastructure costs in deployment documentation
- Implement auto-scaling for production workloads
- Regular cost reviews and optimization recommendations

## 📊 **Monitoring & Analytics Rules**

### **Performance Monitoring**
- Implement Web Vitals tracking on all pages
- Monitor API response times and error rates
- Use proper logging for debugging (structured logs preferred)
- Implement health checks for all critical services

### **Error Handling Standards**
- All errors must be properly caught and logged
- User-facing error messages must be helpful and actionable
- Implement proper fallback UI for error states
- Use Error Boundaries for React component error handling

## 🔄 **Git & Version Control Rules**

### **Commit Standards**
- Use conventional commit messages (feat:, fix:, docs:, refactor:)
- All commits must pass linting and tests before pushing
- Use meaningful branch names (feature/, bugfix/, hotfix/)
- Squash commits before merging to main branch

### **Code Review Requirements**
- All code changes must be reviewed before merging
- Tests must pass and coverage must not decrease
- Documentation must be updated for new features
- Performance impact must be considered and documented
