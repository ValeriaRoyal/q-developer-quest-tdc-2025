#!/bin/bash

# Setup Real AWS MCP Servers
# Based on https://awslabs.github.io/mcp/

set -e

echo "🚀 Setting up Real AWS MCP Servers"
echo "📚 Based on: https://awslabs.github.io/mcp/"
echo ""

# Check if already cloned
if [ ! -d "aws-mcp-servers" ]; then
    echo "📥 Cloning AWS MCP Servers repository..."
    git clone https://github.com/awslabs/mcp.git aws-mcp-servers
else
    echo "✅ AWS MCP repository already exists"
fi

cd aws-mcp-servers

echo ""
echo "📋 Available AWS MCP Servers:"
echo "├── aws-pricing-mcp-server (Cost & Operations)"
echo "├── aws-api-mcp-server (Getting Started)" 
echo "├── cloudwatch-mcp-server (Monitoring)"
echo "├── s3-mcp-server (Storage)"
echo "├── dynamodb-mcp-server (Database)"
echo "└── 50+ other specialized servers"
echo ""

# Setup AWS Pricing MCP Server
echo "🔧 Setting up AWS Pricing MCP Server..."
cd src/aws-pricing-mcp-server

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "📦 Installing uv package manager..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
fi

echo "📦 Installing dependencies with uv..."
uv sync

echo ""
echo "✅ AWS Pricing MCP Server setup complete!"
echo ""
echo "🔧 To use with Claude Desktop:"
echo "1. Add to ~/Library/Application Support/Claude/claude_desktop_config.json:"
echo '{'
echo '  "mcpServers": {'
echo '    "aws-pricing": {'
echo '      "command": "uv",'
echo '      "args": ["--directory", "'$(pwd)'", "run", "aws-pricing-mcp-server"],'
echo '      "env": {'
echo '        "AWS_REGION": "us-east-1"'
echo '      }'
echo '    }'
echo '  }'
echo '}'
echo ""
echo "🔧 To use with Amazon Q:"
echo "q chat --mcp-config ../../../mcp-real.json"
echo ""
echo "📚 Documentation: https://awslabs.github.io/mcp/servers/aws-pricing-mcp-server"
echo ""
echo "⚠️  Note: Requires AWS credentials configured (aws configure)"
