#!/usr/bin/env node

const chalk = require("chalk");

console.log(chalk`
{bold Not recording videos} of Cypress test suits. It seems to trigger test fails.

If you want to put the recording back, add {bold --config video=true} flag at the end of the npm task {bold cy:run:travis}
`);
