import express from "express";
import PositionsController from "../controllers/positions.controller";


export default async function getPositionsRouter() {

    const positionsController = new PositionsController();
    const router = express.Router({ mergeParams: true });

    /* GET users listing. */
    router.route('/')
        .get(
            positionsController.getPositions
        )
        .post(
            positionsController.createPosition
        );
    router.route('/:positionId')
        .get(
            positionsController.getPosition
        )
        .put(
            positionsController.updateOisition
        )
        .delete(
            positionsController.deletePosition
        );
    return router;
}
