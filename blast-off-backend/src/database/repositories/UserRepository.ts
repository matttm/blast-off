import {EntityRepository, Repository} from "typeorm";
import {User} from "../../entities/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createAndSave(user: User): Promise<number> {
        const _user = new User();
        _user.username = user.username;
        _user.password = user.password;
        _user.firstName = user.firstName;
        _user.lastName = user.lastName;
        // there should be no brokerage accounts when first making user
        _user.brokerageAccounts = [];
        this.save(_user);
        return _user.id;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.find();
    }

    async getById(id: number): Promise<User | undefined> {
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
