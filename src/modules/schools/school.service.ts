import { haversineDistanceKm } from "../../shared/utils/geo";
import { createSchool, getAllSchools } from "./school.repository";
import { AddSchoolInput, School, SchoolWithDistance } from "./school.types";

export const addSchool = async (input: AddSchoolInput): Promise<School> => {
	return createSchool(input);
};

export const listSchoolsSortedByDistance = async (
	userLatitude: number,
	userLongitude: number
): Promise<SchoolWithDistance[]> => {
	const schools = await getAllSchools();

	const schoolsWithDistance = schools.map((school) => ({
		...school,
		distanceKm: haversineDistanceKm(
			userLatitude,
			userLongitude,
			school.latitude,
			school.longitude
		)
	}));

	return schoolsWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
};
