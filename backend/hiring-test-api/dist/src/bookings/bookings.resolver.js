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
exports.BookingsResolver = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entities_1 = require("./entities/booking.entities");
const travel_entities_1 = require("../travels/entities/travel.entities");
let BookingsResolver = class BookingsResolver {
    constructor(bookingRepository, travelRepository) {
        this.bookingRepository = bookingRepository;
        this.travelRepository = travelRepository;
    }
    async findAll() {
        return this.bookingRepository.find({ relations: ['travel'] });
    }
    async create(createBookingInput) {
        const { travelId, ...bookingData } = createBookingInput;
        const travel = await this.travelRepository.findOne({
            where: { id: travelId },
        });
        if (!travel) {
            throw new Error(`Travel with ID ${travelId} not found`);
        }
        const booking = this.bookingRepository.create({
            ...bookingData,
            travel,
        });
        return this.bookingRepository.save(booking);
    }
};
exports.BookingsResolver = BookingsResolver;
exports.BookingsResolver = BookingsResolver = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entities_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(travel_entities_1.Travel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsResolver);
//# sourceMappingURL=bookings.resolver.js.map