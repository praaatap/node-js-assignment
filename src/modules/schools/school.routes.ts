import { Router } from "express";
import { addSchoolHandler, listSchoolsHandler } from "./school.controller";

const schoolRouter = Router();

schoolRouter.post("/addSchool", addSchoolHandler);
schoolRouter.get("/listSchools", listSchoolsHandler);

export default schoolRouter;
