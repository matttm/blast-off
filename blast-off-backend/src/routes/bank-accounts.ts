import express from "express";
import {getRepository} from "typeorm";
import {BrokerageAccount} from "../entities/brokerage-account";

const router = express.Router({ mergeParams: true });
