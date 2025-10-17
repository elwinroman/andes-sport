import { config } from 'dotenv'
import { DataSource } from 'typeorm'

// Cargar variables de entorno
config()

const isProduction = process.env.NODE_ENV === 'production'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'SI_AndesSport',
  entities: [isProduction ? 'dist/entities/**/*.entity.js' : 'src/entities/**/*.entity{.ts,.js}'],
  migrations: [isProduction ? 'dist/migrations/**/*.js' : 'src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    useUTC: true, // Usar UTC para todas las operaciones de fecha
  },
})
