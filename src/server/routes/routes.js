import express from "express";
import {getAllCodingProblems, addCodingProblem, executeCode} from "../controllers/coding.problem.controller";
const routes = express();

routes.route("/api/faculty/add").post(createFaculty);
routes.route("/api/exams/add").post(addExam);
routes.route("/api/questions/objective/add").post(addObjectiveQuestion);
routes.route("/api/questions/coding/add").post(addCodingProblem);
routes.route("/api/questions/coding").get(getAllCodingProblems);
routes.route("api/executeCode").post(executeCode);

export default routes;