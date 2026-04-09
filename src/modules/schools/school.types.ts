export interface School {
	id: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface AddSchoolInput {
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface SchoolWithDistance extends School {
	distanceKm: number;
}
