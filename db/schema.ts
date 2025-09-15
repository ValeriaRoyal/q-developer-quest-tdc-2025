import { pgTable, text, integer, boolean, timestamp, uuid, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// NextAuth tables
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable('accounts', {
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => ({
  compoundKey: primaryKey(account.provider, account.providerAccountId),
}))

export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// Hot Wheels tables
export const hotwheels = pgTable('hotwheels', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  serie: text('serie').notNull(),
  ano: integer('ano').notNull(),
  raridade: text('raridade').notNull(), // Comum, Raro, Super Treasure Hunt
  cor: text('cor'),
  tipo: text('tipo').default('blister'), // blister, loose
  observacoes: text('observacoes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const packs = pgTable('packs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  serie: text('serie').notNull(),
  ano: integer('ano').notNull(),
  quantidade: integer('quantidade').notNull(),
  observacoes: text('observacoes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  cor: text('cor').default('#3B82F6'), // Cor hex para tags
  createdAt: timestamp('created_at').defaultNow(),
})

export const favorites = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemType: text('item_type').notNull(), // 'car' ou 'pack'
  itemId: uuid('item_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const lists = pgTable('lists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  descricao: text('descricao'),
  isPublic: boolean('is_public').default(false),
  slug: text('slug').unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const listItems = pgTable('list_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  listId: uuid('list_id').notNull().references(() => lists.id, { onDelete: 'cascade' }),
  itemType: text('item_type').notNull(), // 'car' ou 'pack'
  itemId: uuid('item_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Junction table for categories (many-to-many)
export const hotWheelsCategories = pgTable('hotwheels_categories', {
  hotWheelId: uuid('hotwheels_id').notNull().references(() => hotwheels.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey(table.hotWheelId, table.categoryId),
}))

export const packCategories = pgTable('pack_categories', {
  packId: uuid('pack_id').notNull().references(() => packs.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey(table.packId, table.categoryId),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  hotwheels: many(hotwheels),
  packs: many(packs),
  categories: many(categories),
  favorites: many(favorites),
  lists: many(lists),
}))

export const hotWheelsRelations = relations(hotwheels, ({ one, many }) => ({
  user: one(users, {
    fields: [hotwheels.userId],
    references: [users.id],
  }),
  categories: many(hotWheelsCategories),
}))

export const packsRelations = relations(packs, ({ one, many }) => ({
  user: one(users, {
    fields: [packs.userId],
    references: [users.id],
  }),
  categories: many(packCategories),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  hotwheels: many(hotWheelsCategories),
  packs: many(packCategories),
}))

export const listsRelations = relations(lists, ({ one, many }) => ({
  user: one(users, {
    fields: [lists.userId],
    references: [users.id],
  }),
  items: many(listItems),
}))

export const listItemsRelations = relations(listItems, ({ one }) => ({
  list: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type HotWheel = typeof hotwheels.$inferSelect
export type Pack = typeof packs.$inferSelect
export type Category = typeof categories.$inferSelect
export type Favorite = typeof favorites.$inferSelect
export type List = typeof lists.$inferSelect
export type ListItem = typeof listItems.$inferSelect
