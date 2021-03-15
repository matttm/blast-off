import express from 'express';
import * as jwt from 'jsonwebtoken';

const router = express.Router();
const RSA_PRIVATE_KEY: string = process.env.RSA_PRIVATE_KEY || 'secret';
const EXPIRES_IN = process.env.EXPIRES_IN || 126;
const SESSION_COOKIE_KEY = "SESSIONID";

/* GET home page. */
router.route('/')
    .post(async (req, res) => {
        console.log('Attempting to establish a connection');
        const {
            username,
            password
        } = req.body;
        // if a needed arg is missing, reject
        if (!username || !password) {
            res.status(422).send();
            return;
        }
        const ret = await getUser(username, password);
        // if credentials don't match a user, reject
        // if id does not exist, id is undefined
        if (ret === undefined) {
            res.status(401).send();
            return;
        }
        const {id, role} = ret;
        // otherwise generate a jwt
        const payload = {
            id,
            username,
            role
        };
        const jwtBearerToken = jwt.sign(payload, 'secret', {
            expiresIn: '2h',  // EXPIRES_IN as string,
            subject: `${id}`
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
        console.log('Deleting an  established connection');
        res.clearCookie(SESSION_COOKIE_KEY).status(200);
    });

export default router;
