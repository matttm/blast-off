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
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            // TODO: add pw field
            // const password = req.body.password;
            // TODO: need validation?
            user.firstName = firstName;
            user.lastName = lastName;
            user.role = roles.STANDARD;
            // user.password = password;
            res.json(user);
        });
    /* Handling a specific user */
    router.route('/:id')
        .get(async (req, res, next) => {
            // TODO: use JWT for this instead?
            const user = await userRepository.findOne();
            res.json(user);
        })
        .put((req, res, next) => {
            res.send('modifying a resource');
        })
        .delete((req, res, next) => {
            res.send('deleting a resource');
        });
    return router;
}
