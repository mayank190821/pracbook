import express from "express";
import {addCodingProblem} from "../controllers/coding.problem.controller";
import {addObjectiveQuestion} from "../controllers/objective";
import {createFaculty} from "../controllers/faculty.js";
import {addExam} from "../controllers/exam";

const routes = express();

routes.route("/api/faculty/add").post(createFaculty);
routes.route("/api/exams/add").post(addExam);
routes.route("/api/questions/objective/add").post(addObjectiveQuestion);
routes.route("/api/questions/coding/add").post(addCodingProblem);
// routes.route("/api/questions/coding").get(getAllCodingProblems);
// routes.route("api/executeCode").post(executeCode);

export default routes;