import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cities } from "./Cities";

@Entity("Weather", { schema: "Weather" })
export class Weather {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", { name: "city_name", nullable: true })
  cityName: number | null;

  @Column("decimal", {
    name: "relative_humidity",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  relativeHumidity: string | null;

  @Column("decimal", {
    name: "wind_speed",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  windSpeed: string | null;

  @Column("decimal", {
    name: "wind_direction",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  windDirection: string | null;

  @Column("datetime", { name: "timestamp", nullable: true })
  timestamp: Date | null;

  @Column("decimal", {
    name: "visibility",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  visibility: string | null;

  @Column("decimal", {
    name: "sea_level_pressure",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  seaLevelPressure: string | null;

  @Column("enum", { name: "day_part", nullable: true, enum: ["n", "d"] })
  dayPart: "n" | "d" | null;

  @Column("decimal", {
    name: "clouds_persent",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  cloudsPersent: string | null;

  @Column("decimal", {
    name: "temperature",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  temperature: string | null;

  @Column("decimal", {
    name: "temperature_feels",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  temperatureFeels: string | null;

  @Column("decimal", {
    name: "pressure",
    nullable: true,
    precision: 6,
    scale: 2,
  })
  pressure: string | null;

  @ManyToOne(() => Cities, (cities) => cities.weathers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_name", referencedColumnName: "name" }])
  city: Cities;
}
