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
const graphql_1 = require("@nestjs/graphql");
const bookings_service_1 = require("./bookings.service");
const booking_entities_1 = require("./entities/booking.entities");
const create_booking_input_1 = require("./dto/create-booking.input");
const confirm_booking_input_1 = require("./dto/confirm-booking.input");
const travel_entities_1 = require("../travels/entities/travel.entities");
let BookingsResolver = class BookingsResolver {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async createBooking(createBookingInput) {
        const { email, travelId, seats } = createBookingInput;
        return await this.bookingsService.create(email, travelId, seats);
    }
    async travel(booking) {
        return this.bookingsService.findTravelById(booking.travel);
    }
    async confirmBooking(confirmBookingInput) {
        const { id, fakeToken } = confirmBookingInput;
        return await this.bookingsService.confirmBookingWithPayment(id, fakeToken);
    }
};
exports.BookingsResolver = BookingsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => booking_entities_1.Booking),
    __param(0, (0, graphql_1.Args)('createBookingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_input_1.CreateBookingInput]),
    __metadata("design:returntype", Promise)
], BookingsResolver.prototype, "createBooking", null);
__decorate([
    (0, graphql_1.ResolveField)(() => travel_entities_1.Travel),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_entities_1.Booking]),
    __metadata("design:returntype", Promise)
], BookingsResolver.prototype, "travel", null);
__decorate([
    (0, graphql_1.Mutation)(() => booking_entities_1.Booking),
    __param(0, (0, graphql_1.Args)('confirmBookingInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_booking_input_1.ConfirmBookingInput]),
    __metadata("design:returntype", Promise)
], BookingsResolver.prototype, "confirmBooking", null);
exports.BookingsResolver = BookingsResolver = __decorate([
    (0, graphql_1.Resolver)(() => booking_entities_1.Booking),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsResolver);
//# sourceMappingURL=bookings.resolver.js.map