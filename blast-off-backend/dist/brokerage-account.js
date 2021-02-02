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
exports.BrokerageAccount = void 0;
/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
const typeorm_1 = require("typeorm");
const bank_account_1 = require("./bank-account");
const position_1 = require("./position");
const user_1 = require("./user");
let BrokerageAccount = class BrokerageAccount {
    constructor() {
        this.created = new Date().toDateString();
        this.buyingPower = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BrokerageAccount.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: "date"
    }),
    __metadata("design:type", String)
], BrokerageAccount.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({
        type: "int"
    }),
    __metadata("design:type", Number)
], BrokerageAccount.prototype, "buyingPower", void 0);
__decorate([
    typeorm_1.OneToMany(() => bank_account_1.BankAccount, bankAccount => bankAccount.brokerageAccount),
    __metadata("design:type", Array)
], BrokerageAccount.prototype, "bankAccounts", void 0);
__decorate([
    typeorm_1.OneToMany(() => position_1.Position, position => position.brokerageAccount),
    __metadata("design:type", Array)
], BrokerageAccount.prototype, "positions", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, user => user.brokerageAccounts),
    __metadata("design:type", user_1.User)
], BrokerageAccount.prototype, "user", void 0);
BrokerageAccount = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], BrokerageAccount);
exports.BrokerageAccount = BrokerageAccount;
//# sourceMappingURL=brokerage-account.js.map