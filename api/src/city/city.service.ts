import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {Repository, createQueryBuilder, Raw} from 'typeorm';
import { Cities } from "../typedb/entity/Cities";
import { CitiesRequests } from "../typedb/entity/CitiesRequests";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,

    @InjectRepository(CitiesRequests)
    private readonly citiesRequestsRepository: Repository<CitiesRequests>,
  ) {
  }

  async getAll(): Promise<Cities[]> {
    return this.citiesRepository.find();
  }

  async getMostPopular(): Promise<string> {
    const subQuery = createQueryBuilder('CitiesRequests')
      .select('MAX(count)');

    const city = await createQueryBuilder()
      .select('Cities.name')
      .from(CitiesRequests, 'CitiesRequests')
      .leftJoinAndSelect("CitiesRequests.city", "Cities")
      .where(`CitiesRequests.count = (${subQuery.getQuery()})`)
      .execute();

    if (!city) {
      throw new HttpException({
        status: 404,
        error: 'No city required yet',
      }, 404);
    }
    return city[0].name;
  }
}
