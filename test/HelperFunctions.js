import { test, describe } from "node:test";
import { strict as assert } from "node:assert";

//Tolerance for min and maximum of birthdate in years
const DATE_TOLERACE = 1/12;

// true = person age must be in <age.min, age.max> interval, 
// false = person age must be in <age.min, age.max + 1 year) interval
const USE_CLOSED_INTERVAL_FOR_DATE = true;

//Maximal number of names/surnames (male+female together)
const MAXIMUM_NAMES = 50;
//Minimal number of names/surnames (male+female together)
const MINIMUM_NAMES = 8;

// true = we require only one from names/chartData in dtoOut - it is not necessary to have both
// false = both names and chartData are required
const AT_LEAST_ONE_OUTPUT = true;

// if we require data about first name counts ("charts") to be sorted
// true = data must be sorted descendingly
// false = we do not expect any sorting
const REQUIRE_CHARTS_SORTED = true;
/**
 *
 * @param outputNumber
 * @param inputSystems
 * @param outputSystems
 */
export function assertBasicStructures(outputNumber, inputSystems, outputSystems) {
	
	//permittedInputSystems()
	assert(Array.isArray(inputSystems), 'Testing that permittedInputSystems() is an array');
	assert(inputSystems.length >= 0, 'Testing basic input - permittedInputSystems() count of '+inputSystems.length +'is greatern than 0.');
	for(let i =0;i<inputSystems.length;i++){
		const numberSystem = inputSystems[i];
		
		assert(Number.isInteger(numberSystem), 'Testing basic data - testing that permittedInputSystems()['+i+'] ('+numberSystem+') is integer number');
		assert(numberSystem>=0, 'Testing basic data - testing that permittedInputSystems()['+i+'] ('+numberSystem+') is greater than 0.');
	}
	
	//permittedOutputSystems()
	assert(Array.isArray(outputSystems), 'Testing that permittedOutputSystems() is an array');
	assert(outputSystems.length >= 0, 'Testing basic input - permittedOutputSystems() count of '+outputSystems.length +'is greatern than 0.');
	for(let i =0;i<outputSystems.length;i++){
		const numberSystem = outputSystems[i];
		
		assert(Number.isInteger(numberSystem), 'Testing basic data - testing that permittedOutputSystems()['+i+'] ('+numberSystem+') is integer number');
		assert(numberSystem>=0, 'Testing basic data - testing that permittedOutputSystems()['+i+'] ('+numberSystem+') is greater than 0.');
	}
	
	//at least 1 system is different
	assert(inputSystems.length >=1 || outputSystems.length >=1 || inputSystems[0]!==outputSystems[0], 'Testing basic data - testing that permittedOutputSystems() and permittedInputSystems have different numerical systems.');
	

	//dtoOut properties
	assert(isString(outputNumber), 'Testing that output is string');
}

/**
 * @param input
 * @param inputSystem
 * @param output
 * @param outputSystem
 */
export function assertResult(input, inputSystem, output, outputSystem) {
	
	let decimalNumber = Number.parseInt(input, inputSystem);
	let expectedOutput = decimalNumber.toString(outputSystem);
	
	assert(output.toUpperCase() === expectedOutput.toUpperCase(), 'Testing input '+input+' , expecting '+expectedOutput+', but got '+output+'!');
}



/**
 *
 * @param max
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function isString(value) {
	return typeof value === 'string' || value instanceof String;
}