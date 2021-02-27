import express, {json} from 'express';
import * as jwt from 'jsonwebtoken';

const router = express.Router();
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || 'secret';
const EXPIRES_IN = process.env.EXPIRES_IN || 126;

/* GET home page. */
router.route('/')
    .post((req, res) => {
        const {
            username,
            firstName,
            lastName,
            password,
            role
        } = req.body;
        // TODO: validate user
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
        res.cookie("SESSIONID", jwtBearerToken,
            {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + (EXPIRES_IN as number))
        })
            .status(201)
            .json();
    })
    .delete((req, res) => {
        // TODO: implement
        res.status(403);
    });

export default router;
