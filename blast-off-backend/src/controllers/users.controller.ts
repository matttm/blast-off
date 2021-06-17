import {roles} from "../enums";
import {User} from "../entities/user";
import * as registrar from "../database/registrar";

export default class UsersController {

    private userRepository = registrar.getUserRepository();

    async getUsers(req, res, next) {
        const users = await this.userRepository.getAllUsers();
        res.status(200).json(users);
    }

    async createUser(req, res, next) {
        const user = new User();
        const {
            username,
            firstName,
            lastName,
            password
        } = req.body;
        if (!username || !firstName || !lastName || !password) {
            res.status(422).send();
        }
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.role = roles.STANDARD;
        const result = await this.userRepository.createAndSave(user);
        res.status(200).json(result);
    }

    /* Handling a specific user */
    async getUser(req, res, next) {
        // TODO: check status codes
        // TODO: use JWT for this instead?
        const id = parseInt(req.params.userId);
        const user = await this.userRepository.getUserById(id);
        res.status(200).json(user);
    }

    async updateUser(req, res, next) {
        const id = parseInt(req.params.userId);
        await this.userRepository.updateById(id, req.body);
        return res.status(200).send();
    }

    async deleteUser(req, res, next) {
        const id = parseInt(req.params.userId);
        const results = await this.userRepository.removeById(id);
        return res.status(200).send(results);
    }
}
