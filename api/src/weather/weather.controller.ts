import {Controller, Get, Query, Req, Res, } from '@nestjs/common';
import { WeatherService } from "./weather.service";
import {WeatherRequestDto} from "./dto/weather.request.dto";

import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() query: WeatherRequestDto
  ) {
    const result = await this.weatherService.getWeather(query);
    reply.status(200).send({ weather: result });
  }

  @Get('average')
  async getAverageTemperature(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() query: WeatherRequestDto
  ) {
    const result = await this.weatherService.getAverage(query);
    reply.status(200).send({ avg: result });
  }

}
