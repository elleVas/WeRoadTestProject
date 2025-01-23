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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entities_1 = require("./entities/booking.entities");
const travel_entities_1 = require("../travels/entities/travel.entities");
const schedule_1 = require("@nestjs/schedule");
const payments_service_1 = require("../payments/payments.service");
let BookingsService = class BookingsService {
    constructor(bookingRepository, paymentsService, travelRepository) {
        this.bookingRepository = bookingRepository;
        this.paymentsService = paymentsService;
        this.travelRepository = travelRepository;
    }
    async create(email, travelId, seats) {
        const travel = await this.travelRepository.findOneBy({ id: travelId });
        if (!travel) {
            throw new Error('Travel not found');
        }
        const activeBookings = await this.bookingRepository.find({
            where: { travel, isConfirmed: false },
        });
        const reservedSeats = activeBookings.reduce((sum, b) => sum + b.seats, 0);
        if (reservedSeats + seats > travel.maxCapacity) {
            throw new Error('Not enough available seats');
        }
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);
        const booking = this.bookingRepository.create({
            email,
            seats,
            expiresAt,
            travel,
        });
        return await this.bookingRepository.save(booking);
    }
    async findTravelById(travelInput) {
        const travel = await this.travelRepository.findOne({ where: { id: travelInput.id } });
        if (!travel) {
            throw new Error(`Travel with id ${travel} not found`);
        }
        return travel;
    }
    async confirmBookingWithPayment(id, fakeToken) {
        const booking = await this.bookingRepository.findOneBy({ id });
        if (!booking || booking.isConfirmed) {
            throw new Error('Invalid booking');
        }
        const paymentResult = await this.paymentsService.processPayment(id, fakeToken);
        if (!paymentResult.success) {
            throw new Error(paymentResult.message);
        }
        booking.isConfirmed = true;
        booking.expiresAt = null;
        return await this.bookingRepository.save(booking);
    }
    async cleanupExpiredBookings() {
        const now = new Date();
        const expired = await this.bookingRepository.find({
            where: { expiresAt: (0, typeorm_2.LessThanOrEqual)(now), isConfirmed: false },
        });
        return await this.bookingRepository.remove(expired);
    }
    async cleanupExpiredBookingsTask() {
        await this.cleanupExpiredBookings();
    }
};
exports.BookingsService = BookingsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsService.prototype, "cleanupExpiredBookingsTask", null);
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entities_1.Booking)),
    __param(2, (0, typeorm_1.InjectRepository)(travel_entities_1.Travel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        payments_service_1.PaymentsService,
        typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map