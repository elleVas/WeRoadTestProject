"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const travels_service_1 = require("./travels.service");
const travels_resolver_1 = require("./travels.resolver");
const travel_entities_1 = require("./entities/travel.entities");
let TravelsModule = class TravelsModule {
};
exports.TravelsModule = TravelsModule;
exports.TravelsModule = TravelsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([travel_entities_1.Travel])],
        providers: [travels_service_1.TravelsService, travels_resolver_1.TravelsResolver],
    })
], TravelsModule);
//# sourceMappingURL=travels.module.js.map