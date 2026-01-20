import fs from "fs"

import { parse } from "csv-parse/sync"
import { describe, it, expect } from "vitest"

import {
	mergeLocation,
	mostConfirmedCases,
	averageRecoveryTime,
	percentages,
} from "../src/functions.js"

const PATIENT_INFO_FILE = "./data/PatientInfo.csv"

let patientCsv = fs.readFileSync(PATIENT_INFO_FILE)
let records = parse(patientCsv, {
	columns: true,
	skip_empty_lines: true,
})

const recordsCopy = parse(patientCsv, {
	columns: true,
	skip_empty_lines: true,
})

describe("mergeLocation", () => {
	it("should return the correct value", () => {
		// records is the student's answer
		mergeLocation(records)

		// recordsCopy is the standard answer
		recordsCopy.forEach((record) => {
			const { city, province, country } = record
			delete record.city
			delete record.province
			delete record.country

			if (!city || city === "etc") {
				record.location = `${province}, ${country}`
			} else {
				record.location = `${city}, ${province}, ${country}`
			}
		})

		expect(records).toEqual(recordsCopy)
	})
})

patientCsv = fs.readFileSync(PATIENT_INFO_FILE)
records = parse(patientCsv, {
	columns: true,
	skip_empty_lines: true,
})

describe("mostConfirmedCases", () => {
	it("should return the correct value", () => {
		expect(mostConfirmedCases(records)).toBe("20s")
	})
})

patientCsv = fs.readFileSync(PATIENT_INFO_FILE)
records = parse(patientCsv, {
	columns: true,
	skip_empty_lines: true,
})

describe("averageRecoveryTime", () => {
	it("should return the correct value", () => {
		expect(averageRecoveryTime(records)).toBe(13)
	})
})

patientCsv = fs.readFileSync(PATIENT_INFO_FILE)
records = parse(patientCsv, {
	columns: true,
	skip_empty_lines: true,
})

describe("percentages", () => {
	it("should return the correct value", () => {
		const answer = {
			male_released: 14,
			female_released: 14,
			male_isolated: 83,
			female_isolated: 84,
			female_deceased: 0,
			male_deceased: 2,
		}
		expect(percentages(records)).toEqual(answer)
	})
})
