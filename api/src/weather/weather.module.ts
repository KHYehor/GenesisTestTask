import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from "../typedb/entity/Weather";
import { CitiesRequests } from "../typedb/entity/CitiesRequests";
import {Cities} from "../typedb/entity/Cities";

@Module({
  imports: [TypeOrmModule.forFeature([CitiesRequests, Weather, Cities])],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
