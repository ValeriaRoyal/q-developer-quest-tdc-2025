# MCP Integration & AI Development Rules

## 🤖 **Model Context Protocol Standards**

### **MCP Server Requirements**
- Use only verified and official MCP servers (no hardcode simulations)
- All MCP configurations must be stored in config/mcp/ directory
- Document all MCP tools and their specific purposes
- Test MCP integrations thoroughly before committing to repository
- Maintain compatibility with Amazon Q Developer CLI

### **Verified MCP Servers Only**
- @eslint/mcp@latest - Official ESLint MCP server for code linting
- @modelcontextprotocol/server-filesystem - Official filesystem access
- awslabs/mcp servers - Official AWS Labs MCP servers for AWS integration
- No custom or simulated MCP servers without proper verification

### **MCP Configuration Management**
- Primary configuration: config/mcp/mcp-amazon-q-optimized.json
- Environment-specific configurations for different development stages
- All MCP server paths and commands must be absolute and verified
- Regular updates to MCP server versions following semantic versioning

## 🎯 **AI-Assisted Development Rules**

### **Amazon Q Developer Integration**
- Maintain 90%+ AI-generated code ratio for the project
- Use Vibe Coding methodology for natural development flow
- Document all significant AI-generated code sections with comments
- Leverage Amazon Q's AWS expertise for infrastructure decisions
- Use MCP for enhanced context and project understanding

### **Prompt Engineering Standards**
- Write clear, specific prompts with detailed requirements
- Include context about existing codebase and architecture
- Specify coding standards and best practices in prompts
- Request tests and documentation along with feature implementation
- Use iterative refinement for complex features

### **AI Code Review Process**
- All AI-generated code must be reviewed for security vulnerabilities
- Verify that generated code follows project coding standards
- Test AI-generated functions thoroughly before integration
- Document any modifications made to AI-generated code
- Ensure AI-generated code maintains type safety and error handling

## 🔧 **Development Workflow with MCP**

### **Local Development Setup**
- Configure Amazon Q Developer with project-specific MCP settings
- Use mcp-amazon-q-optimized.json for optimal development experience
- Ensure all team members use consistent MCP configurations
- Regular synchronization of MCP server versions across team

### **Code Generation Guidelines**
- Request complete implementations including error handling
- Ask for TypeScript types and interfaces with all generated code
- Include accessibility considerations in all UI component requests
- Request performance optimizations for database queries and API calls
- Generate comprehensive tests alongside feature implementation

### **Quality Assurance with AI**
- Use Amazon Q for code review suggestions and improvements
- Leverage AI for identifying potential security vulnerabilities
- Request performance optimization suggestions for existing code
- Use AI for generating comprehensive test cases and edge case scenarios
- Ask for accessibility audit suggestions and improvements

## 📚 **Documentation & Knowledge Management**

### **AI-Generated Documentation**
- All AI-generated features must include inline documentation
- Request README updates for new features and configurations
- Generate API documentation for all new endpoints
- Create user guides for complex features using AI assistance
- Maintain changelog with AI-generated feature descriptions

### **Knowledge Sharing Rules**
- Document successful AI prompts and techniques for team reference
- Share effective MCP configurations and usage patterns
- Create templates for common AI development tasks
- Regular knowledge sharing sessions about AI development best practices
- Maintain a repository of proven AI development workflows

## 🚀 **Continuous Improvement with AI**

### **Performance Monitoring**
- Use AI to analyze performance metrics and suggest optimizations
- Regular AI-assisted code reviews for performance improvements
- Leverage Amazon Q's AWS expertise for infrastructure optimization
- Request AI analysis of user experience and interface improvements

### **Innovation and Experimentation**
- Explore new MCP servers and tools as they become available
- Experiment with advanced AI development techniques
- Share successful innovations with the broader development community
- Contribute to MCP ecosystem through feedback and suggestions
- Stay updated with Amazon Q Developer feature releases and improvements
