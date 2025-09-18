# AWS Security & Infrastructure Rules

## 🔒 **AWS Security Standards**

### **S3 Bucket Security**
- All Amazon S3 buckets must have encryption enabled (AES-256 or KMS)
- All S3 buckets must enforce SSL/TLS for data in transit
- All S3 buckets must block public access unless explicitly required
- S3 bucket policies must follow least privilege principle
- Enable S3 bucket versioning for critical data
- Implement S3 bucket logging for audit trails

### **Database Security (RDS/PostgreSQL)**
- All Amazon RDS instances must have encryption at rest enabled
- All database connections must use SSL/TLS encryption
- Database credentials must be stored in AWS Secrets Manager
- Enable automated backups with point-in-time recovery
- Use VPC security groups to restrict database access
- Regular security patches must be applied automatically

### **API Gateway & Lambda Security**
- All API Gateway endpoints must use HTTPS only
- Implement proper authentication and authorization (JWT/OAuth)
- Use API Gateway throttling to prevent abuse
- All Lambda functions must have minimal IAM permissions
- Enable AWS CloudTrail for API access logging
- Implement request/response validation

### **Networking Security**
- All resources must be deployed in private subnets when possible
- Use NAT Gateway for outbound internet access from private subnets
- Implement proper security group rules (least privilege)
- Enable VPC Flow Logs for network monitoring
- Use AWS WAF for web application protection

## 🏗️ **Infrastructure as Code Standards**

### **Terraform Requirements**
- All AWS resources must be defined in Terraform
- Use Terraform modules for reusable components
- Implement proper state management (remote backend)
- All resources must be tagged consistently
- Use Terraform validation rules for resource configuration

### **Resource Tagging Standards**
- Project: "hot-wheels-catalog"
- Environment: "dev" | "staging" | "prod"
- Owner: "team-name"
- CostCenter: "development"
- ManagedBy: "terraform"

### **Cost Management Rules**
- Use AWS Free Tier resources for development
- Implement auto-scaling for cost optimization
- Set up billing alerts for cost monitoring
- Regular cost reviews and optimization
- Document all infrastructure costs

## 🔐 **Access Control & IAM**

### **IAM Best Practices**
- Use IAM roles instead of IAM users for applications
- Implement least privilege access principle
- Enable MFA for all administrative access
- Regular access reviews and cleanup
- Use AWS Organizations for multi-account management

### **Secrets Management**
- All API keys and secrets must be stored in AWS Secrets Manager
- Rotate secrets regularly (90 days maximum)
- Never hardcode secrets in application code
- Use IAM roles for service-to-service authentication
- Implement proper secret access logging

## 📊 **Monitoring & Compliance**

### **CloudWatch Standards**
- Enable CloudWatch monitoring for all critical resources
- Set up CloudWatch alarms for key metrics
- Implement centralized logging with CloudWatch Logs
- Use CloudWatch Insights for log analysis
- Regular monitoring dashboard reviews

### **Compliance Requirements**
- Enable AWS Config for compliance monitoring
- Implement AWS Security Hub for security findings
- Regular security assessments and penetration testing
- Document all security controls and procedures
- Maintain audit trails for all administrative actions
