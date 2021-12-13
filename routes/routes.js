import express from "express";
import {
  addCodingProblem,
  filterProblems,
  getProblemById,
  fetchCpQuestions,
} from "../controllers/coding.problem.controller.js";
import {
  addObjectiveQuestion,
  fetchByQuestionID,
  fetchByTopicName,
  fetchQuestions,
} from "../controllers/objective.js";
import {
  createFaculty,
  facultyById,
  login,
  logout,
  examResults,
  getExamsByFaculty,
  changeFacultyPassword,
  fetchExamId,
} from "../controllers/faculty.js";
import {
  createStudent,
  signIn,
  studentById,
  getResultById,
  uploadResult,
  getStudentById,
  changeStudentPassword,
  getExamsByStudentId,
  signOut,
} from "../controllers/student.js";
import {
  addExam,
  getExamById,
  deleteOneByID,
  compile,
} from "../controllers/exam.js";

const routes = express();

//***************************************** Faculty API

routes.route("/faculty/signup").post(createFaculty); // req.body = complete faculty model, result = faculty added.
routes
  .route("/faculty")
  .post(login) // req.body = {email, password}, result = complete user details with token.
  .put(logout); // empty request body, result = successfully signed out.
routes
  .route("/faculty/change-password/:facultyId") // req.body = {currentPassword, newPassword}, result = password changed.
  .put(changeFacultyPassword);
routes.route("/faculty/exams/:facultyId").get(getExamsByFaculty); // empty request body, result = list of exams.
routes.route("/faculty/result/:facultyId").put(fetchExamId, examResults);
// req.body = {examId, section, subject}, result = [{"studentName": string, "section": string, "status": U/P/A, "marks": int }]

//***************************************** Student API

routes.route("/student/signup").post(createStudent); // req.body = complete student model, result = student added.
routes
  .route("/student")
  .post(signIn) // req.body = {email, password}, result = complete student details with token.
  .put(signOut); // empty request body, result = successfully signed out.
routes
  .route("/student/change-password/:studentId") // req.body = {currentPassword, newPassword}, result = password changed.
  .put(changeStudentPassword);
routes.route("/getStudent/:studentId").get(getStudentById);
routes
  .route("/student/result/:studentId")
  .get(getResultById) // req.body = {examId}, result = {marks: value}.
  .put(uploadResult); // req.body = {examId, marks, submissions}, result = result uploaded.
routes.route("/student/exams/:studentId").get(getExamsByStudentId); // empty request body, result = list of exams.

//***************************************** Exam API

routes.route("/exam").post(addExam).get(getExamById).delete(deleteOneByID); // req.body = complete exams model, result = exam added.
routes.route("/exam/compile").post(compile);

//***************************************** Objective Problem API

routes.route("/questions/objective/add").post(addObjectiveQuestion); // req.body = complete objective problem model, result = question added.
routes.route("/questions/objective/fetchByID").get(fetchByQuestionID); // req.body = {questionId}, result = {question}.
routes.route("/questions/objective/fetchByTopicName").get(fetchByTopicName);
routes.route("/questions/objective/fetchQuestions").get(fetchQuestions); // req.body = {topicName}, result = list of questions.

//***************************************** Coding Problem API

routes.route("/questions/coding/add").post(addCodingProblem); // req.body = complete coding problem model, result = question added.
routes.route("/questions/coding/fetchByID").get(getProblemById); // req.body = {id}, result = {question}.
routes.route("/questions/coding/filter").get(filterProblems); // req.body = {type, difficulty, questionId}, result = list of filtered questions.
routes.route("/questions/coding/fetchCpQuestions").get(fetchCpQuestions);

routes.param("facultyId", facultyById);
routes.param("studentId", studentById);

export default routes;
