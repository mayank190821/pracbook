import express from "express";
import {addCodingProblem} from "../controllers/coding.problem.controller.js";
import {addObjectiveQuestion,fetchByQuestionID,fetchByTopicName} from "../controllers/objective.js";
import {createFaculty} from "../controllers/faculty.js";
import { createStudent, signIn } from "../controllers/student.js";
import {addExam} from "../controllers/exam.js";

const routes = express();

routes.route("/api/faculty/add").post(createFaculty);
routes.route("/api/exams/add").post(addExam);
routes.route("/api/questions/objective/add").post(addObjectiveQuestion);
routes.route("/api/questions/objective/fetchByID").get(fetchByQuestionID);
routes.route("/api/questions/objective/fetchByTopicName").get(fetchByTopicName);
routes.route("/api/questions/coding/add").post(addCodingProblem);
routes.route("/api/student/add").post(createStudent);
routes.route("/api/student/signin").get(signIn);
// routes.route("/api/questions/coding").get(getAllCodingProblems);
// routes.route("api/executeCode").post(executeCode);

export default routes;