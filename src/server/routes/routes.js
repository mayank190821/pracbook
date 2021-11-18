import express from "express";
import {
  addCodingProblem,
  filterProblems,
  getProblemById,
} from "../controllers/coding.problem.controller.js";
import {
  addObjectiveQuestion,
  fetchByQuestionID,
  fetchByTopicName,
} from "../controllers/objective.js";
import {
  createFaculty,
  facultyById,
  login,
  logout,
  examResults,
  getExamsByFaculty,
  changeFacultyPassword,
} from "../controllers/faculty.js";
import {
  createStudent,
  signIn,
  studentById,
  getResultById,
  uploadResult,
  changeStudentPassword,
  getExamsByStudentId,
  signOut,
} from "../controllers/student.js";
import { addExam } from "../controllers/exam.js";

const routes = express();

//***************************************** Faculty API

routes.route("/auth/faculty/signup").post(createFaculty); // req.body = complete faculty model, result = faculty added.
routes
  .route("/auth/faculty")
  .post(login) // req.body = {email, password}, result = complete user details with token.
  .put(logout); // empty request body, result = successfully signed out.
routes
  .route("/api/faculty/change-password/:facultyId") // req.body = {currentPassword, newPassword}, result = password changed.
  .put(changeFacultyPassword);
routes.route("/api/faculty/exams/:facultyId").get(getExamsByFaculty); // empty request body, result = list of exams.
routes.route("/api/faculty/result/:facultyId").get(examResults);
// req.body = {examId, section, subject}, result = [{"studentName": string, "section": string, "status": U/P/A, "marks": int }]

//***************************************** Student API

routes.route("/auth/student/signup").post(createStudent); // req.body = complete student model, result = student added.
routes
  .route("/auth/student")
  .post(signIn) // req.body = {email, password}, result = complete student details with token.
  .put(signOut); // empty request body, result = successfully signed out.
routes
  .route("/api/student/change-password/:studentId") // req.body = {currentPassword, newPassword}, result = password changed.
  .put(changeStudentPassword);
routes
  .route("/api/student/result/:studentId")
  .get(getResultById) // req.body = {examId}, result = {marks: value}.
  .put(uploadResult); // req.body = {examId, marks, submissions}, result = result uploaded.
routes.route("/api/student/exams/:studentId").get(getExamsByStudentId); // empty request body, result = list of exams.

//***************************************** Exam API

routes.route("/api/exams/add").post(addExam); // req.body = complete exams model, result = exam added.

//***************************************** Objective Problem API

routes.route("/api/questions/objective/add").post(addObjectiveQuestion); // req.body = complete objective problem model, result = question added.
routes.route("/api/questions/objective/fetchByID").get(fetchByQuestionID); // req.body = {questionId}, result = {question}.
routes.route("/api/questions/objective/fetchByTopicName").get(fetchByTopicName); // req.body = {topicName}, result = list of questions.

//***************************************** Coding Problem API

routes.route("/api/questions/coding/add").post(addCodingProblem); // req.body = complete coding problem model, result = question added.
routes.route("/api/questions/coding/id").get(getProblemById); // req.body = {id}, result = {question}.
routes.route("/api/questions/coding/filter").get(filterProblems); // req.body = {type, difficulty, questionId}, result = list of filtered questions.

routes.param("facultyId", facultyById);
routes.param("studentId", studentById);

export default routes;
