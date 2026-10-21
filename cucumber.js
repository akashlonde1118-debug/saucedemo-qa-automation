module.exports = {
  default: {
    requireModule: ['ts-node/register', 'dotenv/config'],
    require: ['support/**/*.ts', 'pages/**/*.ts', 'features/steps/**/*.ts'],
    paths: ['features/**/*.feature'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    publishQuiet: true,
    retry: 0,
    parallel: 1,
    tags: 'not @ignore'
  }
};