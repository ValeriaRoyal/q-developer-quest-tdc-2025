# 🚀 Implementação Real de MCP AWS

> **Baseado na documentação oficial:** https://awslabs.github.io/mcp/

## 📚 **Sobre AWS MCP Servers**

### 🎯 **O que são?**
Os **AWS MCP Servers** são uma suíte de servidores MCP especializados desenvolvidos pela AWS Labs que ajudam a obter o máximo da AWS, onde quer que você use MCP.

### 🔧 **Servidores Disponíveis (50+)**

#### **🏁 Getting Started**
- **aws-api-mcp-server** - Interação geral com APIs AWS
- **core-mcp-server** - Funcionalidades centrais

#### **💰 Cost & Operations**  
- **aws-pricing-mcp-server** - Consultas de preços AWS
- **billing-cost-management-mcp-server** - Gestão de custos
- **cost-explorer-mcp-server** - Análise de custos

#### **🗄️ Data & Analytics**
- **dynamodb-mcp-server** - Amazon DynamoDB
- **documentdb-mcp-server** - Amazon DocumentDB
- **redshift-mcp-server** - Amazon Redshift

#### **🤖 AI & Machine Learning**
- **bedrock-kb-retrieval-mcp-server** - Amazon Bedrock
- **nova-canvas-mcp-server** - Amazon Nova Canvas
- **amazon-rekognition-mcp-server** - Amazon Rekognition

#### **🏗️ Infrastructure & Deployment**
- **ccapi-mcp-server** - Cloud Control API
- **cfn-mcp-server** - CloudFormation
- **cdk-mcp-server** - AWS CDK
- **terraform-mcp-server** - Terraform

## 🚀 **Implementação Real**

### 📋 **Configuração MCP Real**
```json
{
  "mcpVersion": "2024-11-05",
  "name": "hot-wheels-real-mcp",
  "servers": {
    "aws-pricing": {
      "command": "python",
      "args": ["-m", "awslabs.aws_pricing_mcp_server"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    },
    "aws-api": {
      "command": "python", 
      "args": ["-m", "awslabs.aws_api_mcp_server"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_PROFILE": "default"
      }
    }
  }
}
```

### 🔧 **Instalação Automática**
```bash
# Executar script de setup
./scripts/setup-real-mcp.sh

# Ou manualmente:
git clone https://github.com/awslabs/mcp.git aws-mcp-servers
cd aws-mcp-servers/src/aws-pricing-mcp-server
uv sync
```

### 💻 **Uso com Claude Desktop**
```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "aws-pricing": {
      "command": "uv",
      "args": ["--directory", "/path/to/mcp/src/aws-pricing-mcp-server", "run", "aws-pricing-mcp-server"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

### 🤖 **Uso com Amazon Q**
```bash
# Usar configuração real
q chat --mcp-config mcp-real.json

# Comandos disponíveis:
"Qual o preço do RDS db.t3.micro na região us-east-1?"
"Calcule o custo mensal de 100GB no S3 Standard"
"Liste os serviços AWS disponíveis"
"Descreva o serviço Amazon EC2"
```

## 🛠️ **Ferramentas Disponíveis**

### 💰 **AWS Pricing MCP Server**
- `get_pricing` - Obter informações de preços
- `calculate_cost` - Calcular custos de recursos
- `compare_pricing` - Comparar preços entre regiões
- `estimate_monthly_cost` - Estimar custos mensais

### 🔧 **AWS API MCP Server**
- `list_services` - Listar serviços AWS
- `describe_service` - Descrever serviço específico
- `get_service_endpoints` - Obter endpoints de serviço
- `check_service_availability` - Verificar disponibilidade

## 📊 **Exemplos Práticos**

### 💡 **Consulta de Preços**
```
Usuário: "Qual o preço do RDS db.t3.micro?"
MCP: Consultando aws-pricing-mcp-server...
Resposta: "RDS db.t3.micro na us-east-1: $0.017/hora ($12.24/mês)"
```

### 🔍 **Análise de Custos**
```
Usuário: "Compare custos S3 vs EBS para 1TB"
MCP: Calculando com aws-pricing-mcp-server...
Resposta: 
- S3 Standard: $23/mês
- EBS gp3: $80/mês
- Economia S3: 71%
```

## ⚙️ **Requisitos**

### 🔧 **Sistema**
- **Python >= 3.8**
- **uv package manager**
- **Git**

### ☁️ **AWS**
- **Credenciais AWS** configuradas (`aws configure`)
- **Permissões** para Pricing API
- **Região AWS** definida

### 📦 **Dependências**
```bash
# Instalar uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Configurar AWS CLI
aws configure
```

## 🎯 **Diferenças: Real vs Demonstrativo**

| Aspecto | Demonstrativo (Anterior) | Real (Atual) |
|---------|-------------------------|--------------|
| **Servidores** | Hipotéticos | ✅ Oficiais AWS Labs |
| **Instalação** | Configuração JSON | ✅ Clone + uv sync |
| **Funcionalidade** | Simulada | ✅ APIs reais AWS |
| **Dados** | Mock/Demo | ✅ Preços reais AWS |
| **Manutenção** | Manual | ✅ Mantido pela AWS |

## 📚 **Documentação Oficial**

### 🔗 **Links Importantes**
- **Site Principal:** https://awslabs.github.io/mcp/
- **Repositório:** https://github.com/awslabs/mcp
- **AWS Pricing Server:** https://awslabs.github.io/mcp/servers/aws-pricing-mcp-server
- **Installation Guide:** https://awslabs.github.io/mcp/installation
- **Vibe Coding Tips:** https://awslabs.github.io/mcp/vibe_coding

### 📖 **Guias Específicos**
- **Getting Started:** Como começar com MCP AWS
- **Server Configuration:** Configuração de servidores
- **Authentication:** Configuração de credenciais
- **Troubleshooting:** Resolução de problemas

## 🏆 **Benefícios da Implementação Real**

### ✅ **Vantagens**
- **Dados reais** da AWS Pricing API
- **Manutenção oficial** pela AWS Labs
- **50+ servidores** especializados disponíveis
- **Documentação completa** e atualizada
- **Suporte da comunidade** AWS

### 🎯 **Casos de Uso**
- **Estimativas precisas** de custos AWS
- **Planejamento de arquitetura** com preços reais
- **Otimização de custos** baseada em dados
- **Comparação de serviços** e regiões

---

**Implementação real baseada na documentação oficial AWS MCP Servers!**
**Fonte:** https://awslabs.github.io/mcp/
