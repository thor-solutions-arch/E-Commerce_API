-- Migration 001 — schema inicial + seed desde mock
-- Correr con: wrangler d1 execute dormirco-db --file=migrations/001_init.sql

-- ── Tabla principal ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id             TEXT    PRIMARY KEY,
  name           TEXT    NOT NULL,
  slug           TEXT    NOT NULL UNIQUE,
  category       TEXT    NOT NULL,
  price          INTEGER NOT NULL,
  original_price INTEGER,            -- NULL si no tiene descuento
  rating         REAL    NOT NULL,
  review_count   INTEGER NOT NULL DEFAULT 0,
  badge          TEXT,               -- NULL si no tiene badge
  firmness       TEXT    NOT NULL,
  description    TEXT    NOT NULL,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- sizes y features como tablas relacionadas (más limpio que JSON en columna)
CREATE TABLE IF NOT EXISTS product_sizes (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size       TEXT NOT NULL,
  PRIMARY KEY (product_id, size)
);

CREATE TABLE IF NOT EXISTS product_features (
  product_id TEXT    NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  feature    TEXT    NOT NULL,
  PRIMARY KEY (product_id, position)
);

-- Índices útiles para filtrado
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_firmness  ON products(firmness);
CREATE INDEX IF NOT EXISTS idx_products_price     ON products(price);
CREATE INDEX IF NOT EXISTS idx_product_sizes_size ON product_sizes(size);

-- ── Seed ─────────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO products VALUES
  ('p001','Noctis Látex Natural','noctis-latex-natural','latex',289000,340000,4.8,124,'Más vendido','medium-firm','El equilibrio perfecto entre soporte y confort. Fabricado con látex natural certificado.',datetime('now')),
  ('p002','Somnia Memory Foam','somnia-memory-foam','memory-foam',215000,NULL,4.6,89,NULL,'medium','Tecnología viscoelástica que se adapta a la forma de tu cuerpo para un descanso sin presiones.',datetime('now')),
  ('p003','Aura Resortes Pocket','aura-resortes-pocket','resortes',175000,195000,4.4,203,'Oferta','firm','Sistema de resortes ensacados que aíslan el movimiento y garantizan ventilación permanente.',datetime('now')),
  ('p004','Sereno Ortopédico Pro','sereno-ortopedico-pro','ortopedico',320000,NULL,4.9,57,'Premium','firm','Diseñado con fisioterapeutas para máximo soporte de columna y alineación postural perfecta.',datetime('now')),
  ('p005','Luna Híbrido Gel','luna-hibrido-gel','hibrido',265000,310000,4.7,76,'Nuevo','medium-soft','Lo mejor de dos mundos: el soporte de los resortes con el confort del memory foam y regulación térmica.',datetime('now')),
  ('p006','Bruma Soft Touch','bruma-soft-touch','espuma',98000,NULL,4.2,312,NULL,'soft','Confort accesible sin sacrificar calidad. Ideal para cuartos de huéspedes o uso secundario.',datetime('now')),
  ('p007','Cima Látex Firm','cima-latex-firm','latex',305000,350000,4.7,44,NULL,'firm','Para quienes prefieren una superficie firme. Soporte máximo y durabilidad excepcional.',datetime('now')),
  ('p008','Ébano Box Top','ebano-box-top','resortes',240000,NULL,4.5,91,NULL,'medium-soft','El clásico reinterpretado. Resortes de alta resistencia con capa de acolchado que envuelve el cuerpo.',datetime('now'));

INSERT OR IGNORE INTO product_sizes VALUES
  ('p001','plaza'),('p001','plaza-y-media'),('p001','matrimonial'),('p001','king'),
  ('p002','plaza'),('p002','plaza-y-media'),('p002','matrimonial'),
  ('p003','plaza'),('p003','plaza-y-media'),('p003','matrimonial'),('p003','king'),('p003','twin'),
  ('p004','plaza'),('p004','matrimonial'),('p004','king'),
  ('p005','plaza-y-media'),('p005','matrimonial'),('p005','king'),
  ('p006','twin'),('p006','plaza'),('p006','plaza-y-media'),('p006','matrimonial'),
  ('p007','plaza'),('p007','matrimonial'),('p007','king'),
  ('p008','plaza'),('p008','plaza-y-media'),('p008','matrimonial'),('p008','king');

INSERT OR IGNORE INTO product_features VALUES
  ('p001',0,'Látex natural 100%'),('p001',1,'Funda removible'),('p001',2,'Doble cara'),
  ('p002',0,'Viscoelástico de alta densidad'),('p002',1,'Adaptable al cuerpo'),('p002',2,'Anti-ácaros'),
  ('p003',0,'1200 resortes individuales'),('p003',1,'Movimiento independiente'),('p003',2,'Alta ventilación'),
  ('p004',0,'Soporte lumbar reforzado'),('p004',1,'Espuma HR50'),('p004',2,'Garantía 10 años'),
  ('p005',0,'Gel termorregulador'),('p005',1,'Resortes + memory foam'),('p005',2,'Funda 3D transpirable'),
  ('p006',0,'Espuma HR35'),('p006',1,'Ultra suave'),('p006',2,'Ideal colchoneta auxiliar'),
  ('p007',0,'Látex sintético premium'),('p007',1,'Firmeza extrema'),('p007',2,'Ideal deportistas'),
  ('p008',0,'Pillow top integrado'),('p008',1,'Resortes bicónicos'),('p008',2,'Acolchado extra');
