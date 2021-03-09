import express from 'express';
const router = express.Router();

export default async function getUsersRouter() {
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
        })
        .post(async (req, res, next) => {
        });
    /* Handling a specific user */
    router.route('/:id')
        .get(async (req, res, next) => {
        })
        .put(async (req, res, next) => {
        })
        .delete(async (req, res, next) => {
        });
    return router;
}
