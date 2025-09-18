#!/usr/bin/env node

const crypto = require('crypto')

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64')
}

console.log('🔐 Gerando secrets seguros...\n')

console.log('NEXTAUTH_SECRET=' + generateSecret(32))
console.log('DATABASE_ENCRYPTION_KEY=' + generateSecret(32))
console.log('API_SECRET_KEY=' + generateSecret(16))

console.log('\n✅ Copie estes valores para seu arquivo .env.local')
console.log('⚠️  Nunca commite estes valores no Git!')
