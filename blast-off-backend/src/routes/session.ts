import express, {json} from 'express';
import * as jwt from 'jsonwebtoken';
import {getConnection} from "typeorm";

const router = express.Router();
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || 'secret';
const EXPIRES_IN = process.env.EXPIRES_IN || 126;
const SESSION_COOKIE_KEY = "SESSIONID";

/* GET home page. */
router.route('/')
    .post(async (req, res) => {
        const {
            username,
            firstName,
            lastName,
            password,
            role
        } = req.body;
        // TODO: validate user
        if (! await isValidUser(username, password)) {
            res.status(401).send();
            return;
        }
        // TODO: get userId
        const userId = 0;
        const payload = {
            userId,
            username,
            role
        };
        const jwtBearerToken = jwt.sign(payload, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: EXPIRES_IN,
            subject: userId
        });
        // set it in an HTTP Only + Secure Cookie
        res.cookie(SESSION_COOKIE_KEY, jwtBearerToken,
            {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + (EXPIRES_IN as number))
            })
            .status(201)
            .json();
    })
    .delete((req, res) => {
        res.clearCookie(SESSION_COOKIE_KEY).status(200);
    });

async function isValidUser(username: string, password: string): Promise<boolean> {
    const userRepo = await getConnection().getRepository('User');
    const user = await userRepo.find({ where: {username, password}});
    return !!user;
}

export default router;
