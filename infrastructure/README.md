# 🏗️ Infrastructure as Code - Hot Wheels Catalog

> **Infraestrutura AWS desenvolvida com Amazon Q Developer para o TDC São Paulo 2025**

## 📋 Visão Geral

Esta infraestrutura provisiona todos os recursos AWS necessários para executar o Hot Wheels Catalog em produção, incluindo:

- **S3 + CloudFront** para assets estáticos
- **RDS PostgreSQL** para banco de dados
- **Secrets Manager** para credenciais
- **IAM Roles** para Lambda (opcional)

## 🛠️ Recursos Provisionados

### Storage & CDN
- **S3 Bucket** para assets estáticos
- **CloudFront Distribution** para CDN global
- **Bucket Policy** para acesso público aos assets

### Database
- **RDS PostgreSQL 15.4** com backup automático
- **Security Groups** para acesso seguro
- **Subnet Groups** para isolamento de rede

### Security
- **Secrets Manager** para credenciais sensíveis
- **IAM Roles** para serviços AWS
- **Encryption** em repouso e em trânsito

## 🚀 Como Usar

### 1. Pré-requisitos
```bash
# Instalar Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# Configurar AWS CLI
aws configure
```

### 2. Configurar Variáveis
```bash
# Copiar arquivo de exemplo
cp terraform.tfvars.example terraform.tfvars

# Editar com seus valores
vim terraform.tfvars
```

### 3. Deploy da Infraestrutura
```bash
# Inicializar Terraform
terraform init

# Planejar mudanças
terraform plan

# Aplicar infraestrutura
terraform apply
```

### 4. Obter Outputs
```bash
# Ver todas as saídas
terraform output

# Obter DATABASE_URL
terraform output -raw database_url
```

## 📊 Arquitetura AWS

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CloudFront    │────│   S3 Bucket      │    │   RDS PostgreSQL│
│   (CDN Global)  │    │   (Static Assets)│    │   (Database)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Users/Vercel  │    │   Public Access  │    │  Private Subnet │
│   (Frontend)    │    │   (Read Only)    │    │  (Secure Access)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔐 Segurança

### Secrets Management
- **Secrets Manager** armazena todas as credenciais
- **Encryption** automática em repouso
- **IAM Policies** para acesso controlado

### Network Security
- **Security Groups** restringem acesso ao RDS
- **Private Subnets** para isolamento do banco
- **VPC** para isolamento de rede

### Data Protection
- **RDS Encryption** habilitada
- **Backup automático** com retenção de 7 dias
- **Deletion Protection** em produção

## 💰 Custos Estimados (us-east-1)

| Recurso | Configuração | Custo/Mês |
|---------|-------------|-----------|
| RDS t3.micro | 20GB storage | ~$15 |
| S3 Bucket | 1GB storage | ~$0.02 |
| CloudFront | 1GB transfer | ~$0.08 |
| Secrets Manager | 1 secret | ~$0.40 |
| **Total** | | **~$15.50** |

## 🔧 Customização

### Ambientes
```hcl
# Desenvolvimento
environment = "development"
db_instance_class = "db.t3.micro"

# Produção
environment = "production"
db_instance_class = "db.t3.small"
```

### Regiões
```hcl
# Alterar região
aws_region = "sa-east-1"  # São Paulo
```

## 📝 Variáveis Obrigatórias

```hcl
# Network (obrigatório)
vpc_id = "vpc-xxxxxxxxx"
private_subnet_ids = ["subnet-xxx", "subnet-yyy"]

# Database (obrigatório)
db_password = "senha-super-segura"

# OAuth (obrigatório para auth)
github_client_id = "seu-github-client-id"
github_client_secret = "seu-github-client-secret"
```

## 🧹 Limpeza

```bash
# Destruir toda a infraestrutura
terraform destroy

# Confirmar com 'yes'
```

## 📚 Documentação

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS RDS](https://docs.aws.amazon.com/rds/)
- [AWS S3](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront](https://docs.aws.amazon.com/cloudfront/)

---

**Infraestrutura desenvolvida com ❤️ e Amazon Q Developer para o TDC São Paulo 2025**
