import { NextFunction, Request, Response } from "express";
import {
	addSchoolSchema,
	listSchoolsQuerySchema
} from "./school.validation";
import { addSchool, listSchoolsSortedByDistance } from "./school.service";

export const addSchoolHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const payload = addSchoolSchema.parse(req.body);
		const school = await addSchool(payload);

		res.status(201).json({
			success: true,
			message: "School added successfully",
			data: school
		});
	} catch (error) {
		next(error);
	}
};

export const listSchoolsHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { latitude, longitude } = listSchoolsQuerySchema.parse(req.query);
		const schools = await listSchoolsSortedByDistance(latitude, longitude);

		res.status(200).json({
			success: true,
			data: schools
		});
	} catch (error) {
		next(error);
	}
};
