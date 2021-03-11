import express from 'express';
import {roles} from "../enums";
import {getUserRepository} from "../database/registrar";
import {User} from "../entities/user";

const router = express.Router();

export default async function getUsersRouter() {
    const userRepository = getUserRepository();
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const users = await userRepository.getAllUsers();
            res.status(200).json(users);
        })
        .post(async (req, res, next) => {
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
            const result = await userRepository.createAndSave(user);
            res.status(200).json(result);
        });
    /* Handling a specific user */
    router.route('/:id')
        .get(async (req, res, next) => {
            // TODO: check status codes
            // TODO: use JWT for this instead?
            const id = parseInt(req.params.id);
            const user = await userRepository.getUserById(id);
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const id = parseInt(req.params.id);
            await userRepository.updateById(id, req.body);
            return res.status(200).send();
        })
        .delete(async (req, res, next) => {
            const id = parseInt(req.params.id);
            const results = await userRepository.removeById(id);
            return res.status(200).send(results);
        });
    return router;
}
