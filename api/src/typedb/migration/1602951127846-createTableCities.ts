import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCities1602951127846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Cities(
                id INT NOT NULL AUTO_INCREMENT,
                name CHAR(64),
                PRIMARY KEY (id),
                UNIQUE (name)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          DROP TABLE Cities;
      `);
    }

}
