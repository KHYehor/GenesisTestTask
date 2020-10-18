import {
  Column,
  Entity,
  Unique,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cities } from "./Cities";

@Index("city_id", ["cityId"], {})
@Unique(["cityId"])
@Entity("CitiesRequests", { schema: "Weather" })
export class CitiesRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

  @Column("int", { name: "count", nullable: true })
  count: number | null;

  @ManyToOne(() => Cities, (cities) => cities.citiesRequests, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: Cities;
}
