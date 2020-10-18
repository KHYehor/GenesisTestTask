import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CitiesRequests } from "./CitiesRequests";
import { Weather } from "./Weather";

@Entity("Cities", { schema: "Weather" })
export class Cities {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", { name: "name", nullable: true, length: 64 })
  name: string | null;

  @OneToMany(() => CitiesRequests, (citiesRequests) => citiesRequests.city)
  citiesRequests: CitiesRequests[];

  @OneToMany(() => Weather, (weather) => weather.city)
  weathers: Weather[];
}
