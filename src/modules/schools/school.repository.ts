import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbPool } from "../../config/db";
import { AddSchoolInput, School } from "./school.types";

interface SchoolRow extends RowDataPacket {
	id: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

export const createSchool = async (input: AddSchoolInput): Promise<School> => {
	const [result] = await dbPool.execute<ResultSetHeader>(
		`INSERT INTO schools (name, address, latitude, longitude)
		 VALUES (?, ?, ?, ?)`,
		[input.name, input.address, input.latitude, input.longitude]
	);

	return {
		id: result.insertId,
		name: input.name,
		address: input.address,
		latitude: input.latitude,
		longitude: input.longitude
	};
};

export const getAllSchools = async (): Promise<School[]> => {
	const [rows] = await dbPool.query<SchoolRow[]>(
		"SELECT id, name, address, latitude, longitude FROM schools"
	);

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		address: row.address,
		latitude: row.latitude,
		longitude: row.longitude
	}));
};
