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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const travels_service_1 = require("./travels.service");
const travel_entities_1 = require("./entities/travel.entities");
const create_travel_input_1 = require("./dto/create-travel.input");
let TravelsResolver = class TravelsResolver {
    constructor(travelsService) {
        this.travelsService = travelsService;
    }
    async travels() {
        const travels = await this.travelsService.findAll();
        return travels.map((travel) => {
            if (travel.startingDate) {
                travel.startingDate = new Date(travel.startingDate);
            }
            else if (travel.endingDate) {
                travel.endingDate = new Date(travel.endingDate);
            }
            return travel;
        });
    }
    travel(id) {
        return this.travelsService.findOne(id);
    }
    createTravel(createTravelInput) {
        return this.travelsService.create(createTravelInput);
    }
};
exports.TravelsResolver = TravelsResolver;
__decorate([
    (0, graphql_1.Query)(() => [travel_entities_1.Travel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TravelsResolver.prototype, "travels", null);
__decorate([
    (0, graphql_1.Query)(() => travel_entities_1.Travel),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TravelsResolver.prototype, "travel", null);
__decorate([
    (0, graphql_1.Mutation)(() => travel_entities_1.Travel),
    __param(0, (0, graphql_1.Args)('createTravelInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_travel_input_1.CreateTravelInput]),
    __metadata("design:returntype", Promise)
], TravelsResolver.prototype, "createTravel", null);
exports.TravelsResolver = TravelsResolver = __decorate([
    (0, graphql_1.Resolver)(() => travel_entities_1.Travel),
    __metadata("design:paramtypes", [travels_service_1.TravelsService])
], TravelsResolver);
//# sourceMappingURL=travels.resolver.js.map