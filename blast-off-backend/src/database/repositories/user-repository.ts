import {EntityRepository, Repository} from "typeorm";
import {User} from "../../entities/user";
import {BrokerageAccount} from "../../entities/brokerage-account";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createAndSave(user: User): Promise<number> {
        const _user = this.create();
        _user.username = user.username;
        _user.password = user.password;
        _user.firstName = user.firstName;
        _user.lastName = user.lastName;
        _user.role = user.role;
        // there should be no brokerage accounts when first making user
        _user.brokerageAccounts = [];
        await this.manager.save(_user);
        return _user.id;
    }

    async addBrokerageAccountToUser(userId: number, account: BrokerageAccount): Promise<number | undefined> {
        const user: User | undefined = await this.getUserById(userId);
        if (user) {
            user.brokerageAccounts.push(account);
            await this.save(user);
            const lastIdx = user.brokerageAccounts.length;
            return user.brokerageAccounts[lastIdx].id;
        } else {
            return undefined;
        }
    }

    async getAllUsers(): Promise<User[]> {
        return await this.find();
    }

    async getUserById(id: number): Promise<User | undefined> {
        return await this.findOne({where: {id}});
    }

    async getUserByCredentials(username: string, password: string): Promise<User | undefined> {
        return await this.findOne({where: {username, password}});
    }

    async updateById(id: number, user: User): Promise<number> {
        // TODO: add validation here
        await this.manager.update(User, id, user);
        return id;
    }

    async removeById(id: number) {
        await this.manager.delete(User, id);
    }
}
