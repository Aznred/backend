import { test, describe } from "node:test";
import { strict as assert } from "node:assert";
import { assertBasicStructures, assertResult, getRandomInt } from "./HelperFunctions.js"

import { main, permittedInputSystems, permittedOutputSystems} from "../main.js";

console.log("-----------------------------");
console.log("STARTING TIME COMPLEXITY TESTS!!!");
console.log("If this test fails, your code has most likely time complexity in O(n^3) or worse!");
console.log("-----------------------------");


/*test("TIME COMPLEXITY TEST ! Creating "+dtoIn.count+" records ! ", {timeout: 3000},  () => {
	
	for(let inputIndex = 0;inputIndex<permittedInputSystems().length;inputIndex++){
	const inputNumberSystem = permittedInputSystems()[inputIndex];
	for(let outputIndex = 0;outputIndex<permittedOutputSystems().length;outputIndex++){
		const outputNumberSystem = permittedOutputSystems()[outputIndex];
		for(let i = 0;i<2000;i++){
			const inputDecimal = getRandomInt(Number.MAX_SAFE_INTEGER-1000000)+1000000;
			const input = inputDecimal.toString(inputNumberSystem);
			const output = main(input, inputNumberSystem, outputNumberSystem);

			test('Testing random input '+input + " inputSystem "+inputNumberSystem+ " outputSystem "+outputNumberSystem+ " generated result "+output, () => {
				assertResult(input, inputNumberSystem, output, outputNumberSystem);
			});
		}
	}
}
	
});*/
