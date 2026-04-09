import { z } from "zod";

export const addSchoolSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(255, "Name is too long"),
	address: z
		.string()
		.trim()
		.min(1, "Address is required")
		.max(500, "Address is too long"),
	latitude: z
		.number({ message: "Latitude must be a number" })
		.min(-90, "Latitude must be between -90 and 90")
		.max(90, "Latitude must be between -90 and 90"),
	longitude: z
		.number({ message: "Longitude must be a number" })
		.min(-180, "Longitude must be between -180 and 180")
		.max(180, "Longitude must be between -180 and 180")
});

export const listSchoolsQuerySchema = z.object({
	latitude: z.coerce
		.number({ message: "Latitude must be a number" })
		.min(-90, "Latitude must be between -90 and 90")
		.max(90, "Latitude must be between -90 and 90"),
	longitude: z.coerce
		.number({ message: "Longitude must be a number" })
		.min(-180, "Longitude must be between -180 and 180")
		.max(180, "Longitude must be between -180 and 180")
});
