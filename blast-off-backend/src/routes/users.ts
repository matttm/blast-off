import express from 'express';
const router = express.Router();

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
      res.send('respond with a resource');
    })
    .post((req, res, next) => {
      res.send('making user');
    });
/* Handling a specific user */
router.route('/:id')
    .get((req, res, next) => {
        res.send('respond with a resource');
    })
    .put((req, res, next) => {
        res.send('respond with a resource');
    })
    .delete((req, res, next) => {
        res.send('deleting a resource');
    });

export default router;
