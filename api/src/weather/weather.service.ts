import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {Repository, getConnection, Raw, createQueryBuilder} from 'typeorm';
import { Weather } from "../typedb/entity/Weather";
import { CitiesRequests } from "../typedb/entity/CitiesRequests";
import { WeatherRequestDto } from "./dto/weather.request.dto";
import {Cities} from "../typedb/entity/Cities";

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,

    @InjectRepository(CitiesRequests)
    private readonly citiesRequestsRepository: Repository<CitiesRequests>,

    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
  ) {}

  private static isDataValid(data: string): boolean {
    return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(data);
  }

  async getAverage({ name, date }: WeatherRequestDto): Promise<string> {
    const city = await this.citiesRepository.findOne({
      select: ['name', 'id'],
      where: { name }
    });
    if (!city) {
      throw new HttpException({
        status: 404,
        error: 'City does not exist it database',
      }, 404);
    }
    if (!WeatherService.isDataValid(date)) {
      throw new HttpException({
        status: 400,
        error: 'Invalid date format (yyyy-mm-dd should be)',
      }, 404);
    }
    const avg = await createQueryBuilder()
      .from(Weather, 'Weather')
      .select(`AVG(temperature) AS avg_temp`)
      .where(`city_name=:name`, { name: city.name })
      .execute();

    return Number(avg[0].avg_temp).toFixed(2);
  }

  async getWeather({ name, date } : WeatherRequestDto): Promise<Weather[] | string> {
    const city = await this.citiesRepository.findOne({
      select: ['name', 'id'],
      where: { name }
    });
    if (!city) {
      throw new HttpException({
        status: 404,
        error: 'City does not exist it database',
      }, 404);
    }
    if (!WeatherService.isDataValid(date)) {
      throw new HttpException({
        status: 400,
        error: 'Invalid date format (yyyy-mm-dd should be)',
      }, 400);
    }
    const weather = await this.weatherRepository.find({
      where: {
        cityName: city.name,
        timestamp: Raw(alias => `DATE_FORMAT(${alias}, "%Y %m %d") = DATE_FORMAT("${date}", "%Y %m %d")`),
      }
    });
    if (!weather) {
      throw new HttpException({
        status: 404,
        error: 'No weather for this date',
      }, 404);
    }
    await getConnection()
      .query(`
        INSERT INTO CitiesRequests(city_id, count) VALUES (${city.id}, ${1})
        ON DUPLICATE KEY UPDATE count=count+1;
      `);
    return weather;
  }
}
