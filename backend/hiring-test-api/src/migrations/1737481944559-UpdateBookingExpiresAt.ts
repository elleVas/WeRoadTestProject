import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingExpiresAt1737481944559 implements MigrationInterface {
    name = 'UpdateBookingExpiresAt1737481944559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "seats" integer NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP, "travelId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_78838cd890d05484000f7dbf9eb" FOREIGN KEY ("travelId") REFERENCES "travel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_78838cd890d05484000f7dbf9eb"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
