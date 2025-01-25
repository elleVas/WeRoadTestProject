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
exports.CreateTravelInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let MoodsInput = class MoodsInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MoodsInput.prototype, "nature", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MoodsInput.prototype, "relax", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MoodsInput.prototype, "history", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MoodsInput.prototype, "culture", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MoodsInput.prototype, "party", void 0);
MoodsInput = __decorate([
    (0, graphql_1.InputType)()
], MoodsInput);
let CreateTravelInput = class CreateTravelInput {
};
exports.CreateTravelInput = CreateTravelInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTravelInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTravelInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTravelInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateTravelInput.prototype, "startingDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateTravelInput.prototype, "endingDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateTravelInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)((type) => MoodsInput, { nullable: true }),
    __metadata("design:type", MoodsInput)
], CreateTravelInput.prototype, "moods", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateTravelInput.prototype, "maxCapacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTravelInput.prototype, "iata", void 0);
exports.CreateTravelInput = CreateTravelInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTravelInput);
//# sourceMappingURL=create-travel.input.js.map