# 💰 AWS Pricing Review - Hot Wheels Catalog

> **Revisão detalhada de custos AWS usando servidor MCP oficial da AWS com Amazon Q Developer**

## 🔍 **Metodologia de Revisão**

### 🤖 **Ferramentas Utilizadas**
- **Amazon Q Developer** - Assistente de IA para desenvolvimento
- **Servidor MCP AWS Oficial** - `@modelcontextprotocol/server-aws`
- **AWS Pricing Calculator** - Validação de estimativas
- **AWS Cost Explorer** - Análise de custos reais

### 📊 **Configuração MCP AWS**
```json
{
  "servers": {
    "aws": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-aws"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_PROFILE": "default"
      }
    }
  },
  "tools": [
    "aws_pricing",
    "aws_resources", 
    "aws_cost_estimate"
  ]
}
```

## 💵 **Análise Detalhada de Custos**

### 🗄️ **RDS PostgreSQL**
| Configuração | Preço/Hora | Preço/Mês | Observações |
|--------------|-------------|------------|-------------|
| **db.t3.micro** | $0.017 | **$12.24** | Free Tier: 750h/mês por 12 meses |
| **db.t3.small** | $0.034 | $24.48 | Produção pequena |
| **db.t3.medium** | $0.068 | $48.96 | Produção média |

**💡 Recomendação:** db.t3.micro para demo/desenvolvimento

### 📦 **S3 Storage**
| Tipo | Preço | Uso Estimado | Custo/Mês |
|------|-------|--------------|-----------|
| **Standard Storage** | $0.023/GB | 1GB | **$0.023** |
| **PUT Requests** | $0.0005/1000 | 1000 req | $0.0005 |
| **GET Requests** | $0.0004/1000 | 10000 req | $0.004 |

**💡 Total S3:** ~$0.03/mês

### 🌐 **CloudFront CDN**
| Métrica | Preço | Uso Estimado | Custo/Mês |
|---------|-------|--------------|-----------|
| **Data Transfer** | $0.085/GB | 1GB | **$0.085** |
| **HTTP Requests** | $0.0075/10000 | 100k req | $0.075 |
| **HTTPS Requests** | $0.01/10000 | 100k req | $0.10 |

**💡 Total CloudFront:** ~$0.26/mês

### 🔐 **Secrets Manager**
| Recurso | Preço | Quantidade | Custo/Mês |
|---------|-------|------------|-----------|
| **Secret Storage** | $0.40/secret | 1 secret | **$0.40** |
| **API Calls** | $0.05/10000 | 1000 calls | $0.005 |

**💡 Total Secrets Manager:** ~$0.41/mês

### 🔒 **Security Groups & VPC**
| Recurso | Preço | Observações |
|---------|-------|-------------|
| **VPC** | Gratuito | Incluído |
| **Security Groups** | Gratuito | Incluído |
| **Subnets** | Gratuito | Incluído |

## 📈 **Resumo de Custos Mensais**

### 💚 **Cenário Mínimo (Free Tier)**
```
RDS t3.micro (Free Tier):     $0.00
S3 Storage (1GB):             $0.03
CloudFront (1GB):             $0.26
Secrets Manager:              $0.41
─────────────────────────────────
TOTAL:                        $0.70/mês
```

### 🟡 **Cenário Produção Pequena**
```
RDS t3.micro:                $12.24
S3 Storage (5GB):             $0.12
CloudFront (10GB):            $0.85
Secrets Manager:              $0.41
─────────────────────────────────
TOTAL:                       $13.62/mês
```

### 🔴 **Cenário Produção Média**
```
RDS t3.small:                $24.48
S3 Storage (20GB):            $0.46
CloudFront (50GB):            $4.25
Secrets Manager:              $0.41
─────────────────────────────────
TOTAL:                       $29.60/mês
```

## 🎯 **Otimizações de Custo**

### 💡 **Estratégias Recomendadas**

#### **1. Free Tier Maximization**
- ✅ **RDS Free Tier:** 750 horas/mês por 12 meses
- ✅ **S3 Free Tier:** 5GB storage + 20k GET + 2k PUT
- ✅ **CloudFront Free Tier:** 1TB transfer + 10M requests

#### **2. Reserved Instances**
- 🔹 **RDS Reserved:** 30-60% desconto
- 🔹 **Commitment:** 1-3 anos
- 🔹 **Economia:** $4-8/mês em t3.small

#### **3. Spot Instances (Lambda)**
- 🔹 **Lambda:** Pay-per-use
- 🔹 **Custo:** $0.0000166667/GB-second
- 🔹 **Alternativa:** Para APIs com baixo tráfego

#### **4. S3 Intelligent Tiering**
- 🔹 **Automatic:** Move dados para tiers mais baratos
- 🔹 **Economia:** 20-40% em storage
- 🔹 **Ideal:** Para dados com acesso variável

## 🚨 **Alertas de Custo**

### ⚠️ **Configurações Recomendadas**
```json
{
  "billing_alerts": {
    "threshold_1": "$5.00",
    "threshold_2": "$15.00", 
    "threshold_3": "$30.00"
  },
  "auto_shutdown": {
    "dev_environment": "enabled",
    "schedule": "weekends_and_nights"
  }
}
```

### 📊 **Monitoramento**
- ✅ **AWS Cost Explorer:** Análise mensal
- ✅ **CloudWatch Billing:** Alertas automáticos
- ✅ **AWS Budgets:** Controle proativo
- ✅ **Cost Anomaly Detection:** Detecção de picos

## 🔄 **Comparação com Alternativas**

### 🆓 **Opções Gratuitas vs AWS**
| Plataforma | Custo/Mês | Limitações | AWS Equivalente |
|------------|-----------|------------|-----------------|
| **Vercel + Neon** | $0.00 | 500MB DB | $0.70 (Free Tier) |
| **Railway** | $0.00 | $5 crédito | $13.62 |
| **Render** | $0.00 | Sleep mode | $13.62 |
| **Supabase** | $0.00 | 500MB DB | $0.70 |

### 💰 **ROI Analysis**
```
Desenvolvimento: Gratuito (Vercel + Neon)
MVP/Demo:       $0.70/mês (AWS Free Tier)
Produção:       $13.62/mês (AWS Paid)
Enterprise:     $29.60+/mês (AWS Scaled)
```

## ✅ **Recomendações Finais**

### 🎯 **Para TDC 2025 Demo**
- ✅ **Usar:** Vercel + Neon (gratuito)
- ✅ **Backup:** AWS Free Tier ($0.70/mês)
- ✅ **Monitorar:** Billing alerts configurados

### 🚀 **Para Produção**
- ✅ **Iniciar:** AWS Free Tier
- ✅ **Escalar:** Conforme necessidade
- ✅ **Otimizar:** Reserved Instances após 6 meses

### 🔍 **Revisão Contínua**
- 📅 **Mensal:** Cost Explorer review
- 📅 **Trimestral:** Architecture optimization
- 📅 **Anual:** Reserved Instance planning

---

**Revisão realizada com Amazon Q Developer + Servidor MCP AWS Oficial**
**Data:** 18/09/2025 | **Região:** us-east-1 | **Moeda:** USD
