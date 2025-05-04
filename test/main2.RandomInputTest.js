import { test, describe } from "node:test";
import { strict as assert } from "node:assert";
import { assertBasicStructures, assertResult, getRandomInt } from "./HelperFunctions.js"

import { main, permittedInputSystems, permittedOutputSystems} from "../main.js";


console.log("-----------------------------");
console.log("STARTING RANDOM INPUT TESTS!!!");
console.log("-----------------------------");
test('Testing random input structure ', () => {
	assertBasicStructures("0", permittedInputSystems(), permittedOutputSystems());
});

for(let inputIndex = 0;inputIndex<permittedInputSystems().length;inputIndex++){
	const inputNumberSystem = permittedInputSystems()[inputIndex];
	for(let outputIndex = 0;outputIndex<permittedOutputSystems().length;outputIndex++){
		const outputNumberSystem = permittedOutputSystems()[outputIndex];
		for(let i = 0;i<100;i++){
			const inputDecimal = getRandomInt(9999999);
			const input = inputDecimal.toString(inputNumberSystem);
			const output = main(input, inputNumberSystem, outputNumberSystem);

			test('Testing random input '+input + " inputSystem "+inputNumberSystem+ " outputSystem "+outputNumberSystem+ " generated result "+output, () => {
				assertResult(input, inputNumberSystem, output, outputNumberSystem);
			});
		}
	}
}





