import express from 'express';
import {getRepository} from "typeorm";
import {User} from "../entities/user";
import {roles} from "../enums";
const router = express.Router();

export default async function getUsersRouter() {
    const userRepository = await getRepository(User);
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const users = await userRepository.find();
            res.json(users);
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
            res.status(200).json(user);
        });
    /* Handling a specific user */
    router.route('/:id')
        .get(async (req, res, next) => {
            // TODO: check status codes
            // TODO: use JWT for this instead?
            const user = await userRepository.find({ where: { id: req.params.id}});
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const user = await userRepository.find({ where: { id: req.params.id}})[0];
            userRepository.merge(user, req.body);
            const results = await userRepository.save(user);
            return res.status(200).send(results);
        })
        .delete(async (req, res, next) => {
            const results = await userRepository.delete(req.params.id);
            return res.status(200).send(results);
        });
    return router;
}
