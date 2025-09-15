-- Hot Wheels Catalog Database Schema
-- Desenvolvido com Amazon Q Developer para TDC São Paulo 2025

-- Tabela de carros (já existe)
CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  serie TEXT NOT NULL,
  ano INTEGER NOT NULL,
  raridade TEXT NOT NULL CHECK (raridade IN ('Comum', 'Raro', 'Super Treasure Hunt', 'Treasure Hunt')),
  cor TEXT,
  tipo TEXT NOT NULL DEFAULT 'blister' CHECK (tipo IN ('blister', 'loose')),
  observacoes TEXT,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  carId TEXT NOT NULL,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (carId) REFERENCES cars (id) ON DELETE CASCADE,
  UNIQUE(carId, userId)
);

-- Tabela de listas
CREATE TABLE IF NOT EXISTS lists (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  userId TEXT NOT NULL,
  isPublic BOOLEAN NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens das listas
CREATE TABLE IF NOT EXISTS list_items (
  id TEXT PRIMARY KEY,
  listId TEXT NOT NULL,
  carId TEXT NOT NULL,
  addedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listId) REFERENCES lists (id) ON DELETE CASCADE,
  FOREIGN KEY (carId) REFERENCES cars (id) ON DELETE CASCADE,
  UNIQUE(listId, carId)
);

-- Tabela de packs
CREATE TABLE IF NOT EXISTS packs (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  serie TEXT NOT NULL,
  ano INTEGER NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 1,
  observacoes TEXT,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_cars_user ON cars(userId);
CREATE INDEX IF NOT EXISTS idx_cars_serie ON cars(serie);
CREATE INDEX IF NOT EXISTS idx_cars_ano ON cars(ano);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(userId);
CREATE INDEX IF NOT EXISTS idx_lists_user ON lists(userId);
CREATE INDEX IF NOT EXISTS idx_packs_user ON packs(userId);
