import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { join } from 'path'; 
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehiculos/vehicle.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReturnsModule } from './return/return.module';
import { ReturnsService } from './return/return.service';
import { InvoicesModule } from './invoices/invoice.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [join(__dirname, '**', '*.entity.{js,ts}')],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    VehicleModule,
    UsuarioModule,
    AuthModule,
    ReservationsModule,
    ReturnsModule,
    InvoicesModule,
    MaintenanceModule,  // ReturnsModule está importado correctamente aquí
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],  // Solo 'AppService' aquí, no 'ReturnsService'
})
export class AppModule {}

