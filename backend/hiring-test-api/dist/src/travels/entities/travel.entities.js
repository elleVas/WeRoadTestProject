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
exports.Travel = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const booking_entities_1 = require("../../bookings/entities/booking.entities");
let Moods = class Moods {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Moods.prototype, "nature", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Moods.prototype, "relax", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Moods.prototype, "history", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Moods.prototype, "culture", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Moods.prototype, "party", void 0);
Moods = __decorate([
    (0, graphql_1.ObjectType)()
], Moods);
let Travel = class Travel {
    get formattedEndingDate() {
        return this.endingDate ? new Date(this.endingDate) : null;
    }
};
exports.Travel = Travel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "description_extended", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    __metadata("design:type", Date)
], Travel.prototype, "startingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Travel.prototype, "endingDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Travel.prototype, "formattedEndingDate", null);
__decorate([
    (0, typeorm_1.Column)('int'),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Travel.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    (0, graphql_1.Field)((type) => Moods, { nullable: true }),
    __metadata("design:type", Moods)
], Travel.prototype, "moods", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Travel.prototype, "maxCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Travel.prototype, "iata", void 0);
__decorate([
    (0, graphql_1.Field)(() => [booking_entities_1.Booking]),
    (0, typeorm_1.OneToMany)(() => booking_entities_1.Booking, (booking) => booking.travel),
    __metadata("design:type", Array)
], Travel.prototype, "bookings", void 0);
exports.Travel = Travel = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Travel);
//# sourceMappingURL=travel.entities.js.map