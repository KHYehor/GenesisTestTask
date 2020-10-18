import {Controller, Get, Query, Req, Res} from '@nestjs/common';
import { CityService } from './city.service';
import {WeatherRequestDto} from "../weather/dto/weather.request.dto";

import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('all')
  async getAllCities(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const cities = await this.cityService.getAll();
    reply.status(200).send({ cities });
  }

  @Get('mostpopular')
  async getMostPopular(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const popular = await this.cityService.getMostPopular();
    reply.status(200).send({ popular });
  }
}
