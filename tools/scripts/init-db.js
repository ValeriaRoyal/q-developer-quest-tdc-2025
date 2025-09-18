/**
 * Database Initialization Script
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

function initDatabase() {
  console.log('🚀 Inicializando banco de dados Hot Wheels...')
  
  const db = new Database('hotwheels.db')
  
  // Ler schema SQL
  const schemaPath = path.join(__dirname, '..', 'lib', 'db-schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf8')
  
  // Executar schema
  db.exec(schema)
  
  console.log('✅ Tabelas criadas com sucesso!')
  
  // Inserir dados de exemplo (opcional)
  const hasData = db.prepare('SELECT COUNT(*) as count FROM cars').get()
  
  if (hasData.count === 0) {
    console.log('📦 Inserindo dados de exemplo...')
    
    // Carros de exemplo
    const insertCar = db.prepare(`
      INSERT INTO cars (id, nome, serie, ano, raridade, cor, tipo, observacoes, userId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const now = new Date().toISOString()
    const userId = 'dev@hotwheels.com'
    
    const exampleCars = [
      {
        id: 'car-1',
        nome: 'Corvette C8',
        serie: 'Mainline',
        ano: 2024,
        raridade: 'Comum',
        cor: 'Vermelho',
        tipo: 'blister',
        observacoes: 'Primeiro carro da coleção'
      },
      {
        id: 'car-2', 
        nome: 'Skyline GT-R',
        serie: 'Car Culture',
        ano: 2024,
        raridade: 'Raro',
        cor: 'Azul',
        tipo: 'blister',
        observacoes: 'Edição especial JDM'
      },
      {
        id: 'car-3',
        nome: 'Mustang Boss 302',
        serie: 'Mainline',
        ano: 2024,
        raridade: 'Treasure Hunt',
        cor: 'Verde',
        tipo: 'loose',
        observacoes: 'Treasure Hunt encontrado!'
      }
    ]
    
    exampleCars.forEach(car => {
      insertCar.run(
        car.id, car.nome, car.serie, car.ano, car.raridade, 
        car.cor, car.tipo, car.observacoes, userId, now, now
      )
    })
    
    console.log(`✅ ${exampleCars.length} carros de exemplo inseridos!`)
  }
  
  db.close()
  console.log('🎯 Banco de dados inicializado com sucesso!')
}

// Executar se chamado diretamente
if (require.main === module) {
  initDatabase()
}

module.exports = { initDatabase }
