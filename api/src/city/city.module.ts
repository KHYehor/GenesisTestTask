import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from "../typedb/entity/Cities";
import { CitiesRequests } from "../typedb/entity/CitiesRequests";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cities, CitiesRequests]),
  ],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
