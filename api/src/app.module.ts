import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DeporteModule } from './modules/deporte/deporte.module'
import { DetallesFutbolModule } from './modules/detalles-futbol/detalles-futbol.module'
import { DetallesVoleyModule } from './modules/detalles-voley/detalles-voley.module'
import { EquipoModule } from './modules/equipo/equipo.module'
import { EquipoJugadorModule } from './modules/equipo-jugador/equipo-jugador.module'
import { EstadoPartidoModule } from './modules/estado-partido/estado-partido.module'
import { JugadorModule } from './modules/jugador/jugador.module'
import { PartidoModule } from './modules/partido/partido.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '1433'), 10),
        username: configService.get<string>('DB_USERNAME', 'sa'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_DATABASE', 'QASports'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        options: {
          encrypt: configService.get<string>('DB_ENCRYPT', 'false') === 'true',
          trustServerCertificate: configService.get<string>('DB_TRUST_SERVER_CERTIFICATE', 'true') === 'true',
        },
      }),
      inject: [ConfigService],
    }),

    // Módulos de la aplicación
    DeporteModule,
    EquipoModule,
    JugadorModule,
    EstadoPartidoModule,
    PartidoModule,
    EquipoJugadorModule,
    DetallesFutbolModule,
    DetallesVoleyModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
