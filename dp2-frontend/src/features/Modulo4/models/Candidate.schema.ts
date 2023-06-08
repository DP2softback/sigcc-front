import { z } from "zod";
import { getDefaults } from "@utils/zod";

export const CandidateContactSchema = z.object({
	names: z
		.string()
		.trim()
		.min(2, "El nombre debe tener 2 o más caracteres")
		.default(""),
	lastNames: z
		.string()
		.trim()
		.min(2, "El apellido debe tener 2 o más caracteres")
		.default(""),
	email: z
		.string()
		.email("El correo ingresado debe ser válido")
		.trim()
		.toLowerCase()
		.default(""),
	address: z.string().trim().default(""),
	country: z.string().trim().default(""),
	province: z.string().trim().default(""),
	city: z.string().trim().default(""),
	postalCode: z
		.string()
		.trim()
		.length(5, "El código postal debe tener 5 digitos")
		.default(""),
	phone: z
		.string()
		.length(9, "El número debe tener 9 digitos")
		.regex(/^[0-9]+$/, "Debe ingresar un número válido")
		.default(""),
});

export const CandidateJobSchema = z.object({
	title: z
		.string()
		.nonempty("Debe ingresar un puesto o rol laboral")
		.trim()
		.default(""),
	company: z.string().nonempty("Debe ingresar una compañía").trim().default(""),
	// startDate: z.date(),
	// endDate: z.date().optional(),
	description: z.string().default("")
});

export const CandidateInfoSchema = z.object({
	contact: CandidateContactSchema,
	jobs: z.array(CandidateJobSchema)
	// .min(1, "Debe ingresar al menos una experiencia laboral")
	.default([])
});

export const testSchema = z.object({
	email: z
		.string()
		.email("El correo ingresado debe ser válido")
		.trim()
		.toLowerCase()
		.default("")
});
export type testType = z.infer<typeof testSchema>
export const emailDefaults = getDefaults(testSchema);
export type CandidateJobForm = z.infer<typeof CandidateJobSchema>;
export type CandidateForm = z.infer<typeof CandidateInfoSchema>;
export const CandidateJobDefaults: CandidateJobForm = getDefaults(CandidateJobSchema)
export const CandidateDefaults: CandidateForm = {
	contact: getDefaults(CandidateContactSchema),
	jobs: []
}