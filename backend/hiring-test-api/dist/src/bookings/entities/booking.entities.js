"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const travel_entities_1 = require("../../travels/entities/travel.entities");
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Booking.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Booking.prototype, "seats", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Booking.prototype, "isConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => travel_entities_1.Travel, (travel) => travel.bookings, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'travelId' }),
    __metadata("design:type", travel_entities_1.Travel)
], Booking.prototype, "travel", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Booking.prototype, "travelId", void 0);
exports.Booking = Booking = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entities.js.map