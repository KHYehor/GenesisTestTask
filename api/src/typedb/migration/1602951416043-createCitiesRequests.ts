import {MigrationInterface, QueryRunner} from "typeorm";

export class createCitiesRequests1602951416043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS CitiesRequests(
                id INT NOT NULL AUTO_INCREMENT,
                city_id INT,
                count INT,
                PRIMARY KEY (id),
                FOREIGN KEY (city_id)  REFERENCES Cities (id)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE CitiesRequests;
        `);
    }

}
