module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: "/__tests__/.*.test.(js|ts|tsx)?$",
    testEnvironment: 'node'
};