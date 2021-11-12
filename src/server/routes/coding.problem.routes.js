import express from "express";
import {getAllCodingProblems, addNewCodingProblem, executeCode} from "./../controllers/coding.problem.controller";
const routes = express();

routes.route("/api/coding-problems").get(getAllCodingProblems);
routes.route("/api/newCodingProblem").post(addNewCodingProblem);
routes.route("api/executeCode").post(executeCode);

export default routes;