import {EntityRepository, Repository} from "typeorm";
import {Position} from "../../entities/position";
import {BrokerageAccount} from "../../entities/brokerage-account";

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {
    async createAndSave(
        brokerageAccount: BrokerageAccount,
        position: Position
    ): Promise<number> {
        const _position = this.create();
        _position.symbol = position.symbol;
        _position.type =  position.type;
        _position.brokerageAccount = brokerageAccount;
        await this.manager.save(_position);
        return _position.id;
    }

    async getAllPositions(): Promise<Position[]> {
        return await this.find();
    }

    async getAllPositionsWithUserId(userId: number): Promise<Position[] | undefined> {
        return await this.find({ where: { brokerageAccount: { user: { id: userId }}}});
    }

    async getAllPositionsWithBrokerageId(brokerageId: number): Promise<Position[] | undefined> {
        return await this.find({ where: { brokerageAccount: { id: brokerageId } }});
    }

    async updateById(id: number, account: Position): Promise<number> {
        // TODO: add validation here
        await this.manager.update(Position, id, account);
        return id;
    }

    async removeById(id: number) {
        await this.manager.delete(Position, id);
    }
}
