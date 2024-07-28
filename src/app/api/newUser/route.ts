import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		// server side validation
		//check if email is already exist
		const existingUserByEmail = await db.patient.findUnique({
			where: {
				email: body.data.email,
			},
		});

		if (existingUserByEmail) {
			return NextResponse.json(
				{ message: "User with this email is already exist", user: null },
				{ status: 409 }
			);
		}

		//check if phone number is already exist
		const existingUserByPhone = await db.patient.findFirst({
			where: {
				phone: body.data.phone,
			},
		});

		if (existingUserByPhone) {
			return NextResponse.json(
				{ message: "User with this phone number is already exist", user: null },
				{ status: 409 }
			);
		}

		const userData = body.data;

		const newUser = await db.patient.create({
			data: {
				email: userData.email,
				name: userData.name.toLowerCase(),
				phone: userData.phone,
				birthDate: userData.birthDate,
				gender: userData.gender,
				address: userData.address,
				jop: userData.occupation,
				emergencyName: userData.emergencyContactName,
				emergencyPhone: userData.emergencyContactNumber,
				insuranceProvider: userData.insuranceProvider,
				insurancePolicyNumber: userData.insurancePolicyNumber,
				Allergies: userData.allergies,
				currentMedication: userData.currentMedication,
				familyMedicalHistory: userData.familyMedicalHistory,
				pastMedicalHistory: userData.pastMedicalHistory,

				//TODO: add the policies
			},
		});

		return NextResponse.json(
			{
				message: " user created successfully",
				user: {
					id: newUser.id,
					name: newUser.name,
					email: newUser.email,
					phone: newUser.phone,
				},
			},
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{ message: "Something went wrong: Try again later" },
			{ status: 500 }
		);
	}
}
