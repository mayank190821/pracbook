import express from "express";
import {addCodingProblem, filterProblems, getProblemById} from "../controllers/coding.problem.controller.js";
import {addObjectiveQuestion} from "../controllers/objective.js";
import {createFaculty} from "../controllers/faculty.js";
import { createStudent, signIn } from "../controllers/student.js";
import {addExam} from "../controllers/exam.js";

const routes = express();

routes.route("/api/faculty/add").post(createFaculty);
// routes.route("/api/faculty/fetch-exams/:facultyId").get(getExamsByFaculty);

routes.route("/api/student/add").post(createStudent);
routes.route("/api/student/signin").get(signIn);

routes.route("/api/questions/objective/add").post(addObjectiveQuestion);

routes.route("/api/questions/coding/add").post(addCodingProblem);
routes.route("/api/questions/coding/id").get(getProblemById);
routes.route("/api/questions/coding/filter").get(filterProblems);

routes.route("/api/exams/add").post(addExam);
// routes.route("api/executeCode").post(executeCode);

export default routes;