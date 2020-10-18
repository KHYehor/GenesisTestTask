import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFKs1603028383433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Weather
            ADD CONSTRAINT FK_Weather_City
            FOREIGN KEY (city_name) REFERENCES Cities(name);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE table_name
            DROP FOREIGN KEY FK_Weather_City;
        `);
    }

}
