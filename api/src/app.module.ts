import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';

import { Cities } from "./typedb/entity/Cities";
import { CitiesRequests } from "./typedb/entity/CitiesRequests";
import { Weather } from "./typedb/entity/Weather";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: /*process.env.DB_HOST*/ '0.0.0.0',
      port: /*Number(process.env.DB_PORT)*/3306,
      username: /*process.env.DB_USERNAME*/"node",
      password: /*process.env.DB_PASSWORD*/"pass",
      database: /*process.env.DB_DATABASE*/"Weather",
      entities: [Cities, CitiesRequests, Weather],
      synchronize: false,
    }),
    CityModule,
    WeatherModule,
  ],
  providers: [],
})
export class AppModule {}
