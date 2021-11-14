import express from "express";
import {addCodingProblem, filterProblems, getProblemById} from "../controllers/coding.problem.controller.js";
import {addObjectiveQuestion,fetchByQuestionID,fetchByTopicName} from "../controllers/objective.js";
import {createFaculty, facultyById, login, logout, changeFacultyPassword} from "../controllers/faculty.js";
import {
  createStudent,
  signIn,
  studentById,
  changeStudentPassword,
  signOut,
} from "../controllers/student.js";
import {addExam} from "../controllers/exam.js";

const routes = express();

routes.route("/api/faculty/add").post(createFaculty);
routes.route("/api/faculty/signin").get(login);
routes.route("/api/faculty/signout").delete(logout);
routes.route("/api/faculty/change-password/:facultyId").put(changeFacultyPassword);
// routes.route("/api/faculty/exams/:facultyId").get(getExamsByFaculty);
// routes.route("/api/faculty/result/:facultyId").get(getResultBySection);

routes.route("/api/student/add").post(createStudent);
routes.route("/api/student/signin").get(signIn);
routes.route("/api/student/signout").delete(signOut);
routes.route("/api/student/change-password/:studentId").put(changeStudentPassword);
// routes.route("/api/student/result:studentId").get(getResultById).post(updateResultById);
// routes.route("/api/student/exams/:studentId").get(getExams);
routes.route("/api/student/")

routes.route("/api/exams/add").post(addExam);

routes.route("/api/questions/objective/add").post(addObjectiveQuestion);
routes.route("/api/questions/objective/fetchByID").get(fetchByQuestionID);
routes.route("/api/questions/objective/fetchByTopicName").get(fetchByTopicName);

routes.route("/api/questions/coding/add").post(addCodingProblem);
routes.route("/api/questions/coding/id").get(getProblemById);
routes.route("/api/questions/coding/filter").get(filterProblems);
// routes.route("api/executeCode").post(executeCode);
routes.param("facultyId", facultyById);
routes.param("studentId", studentById);

export default routes;