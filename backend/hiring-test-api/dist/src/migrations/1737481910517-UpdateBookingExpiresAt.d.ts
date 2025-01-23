import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateBookingExpiresAt1737481910517 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
