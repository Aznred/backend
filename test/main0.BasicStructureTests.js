import { test, describe } from "node:test";
import { strict as assert } from "node:assert";
import { assertBasicStructures, assertResult } from "./HelperFunctions.js"

import { main, permittedInputSystems, permittedOutputSystems} from "../main.js";


console.log("-----------------------------");
console.log("STARTING BASIC STRUCTURE TESTS!!!");
console.log("-----------------------------");

const input = "0";
const inputSystem = permittedInputSystems()[0];
const outputSystem = permittedOutputSystems()[permittedOutputSystems().length-1];

test('Testing basic structure of input and output ', () => {
	assertBasicStructures(input, permittedInputSystems(), permittedOutputSystems());
});
let output = main(input, inputSystem, outputSystem);

test('Testing result', () => {
	assertResult(input, inputSystem, output, outputSystem);
});