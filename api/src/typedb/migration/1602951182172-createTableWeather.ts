import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableWeather1602951182172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Weather(
                id INT NOT NULL AUTO_INCREMENT,
                city_name CHAR(64),
                relative_humidity DECIMAL(6, 2),
                wind_speed DECIMAL(6, 2),
                wind_direction DECIMAL(6, 2),
                timestamp DATETIME,
                visibility DECIMAL(6, 2),
                sea_level_pressure DECIMAL(6, 2),
                day_part enum('n', 'd'),
                clouds_persent DECIMAL(5, 2),
                temperature DECIMAL(6, 2),
                temperature_feels DECIMAL(6, 2),
                pressure DECIMAL(6, 2),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Weather;
        `);
    }

}
