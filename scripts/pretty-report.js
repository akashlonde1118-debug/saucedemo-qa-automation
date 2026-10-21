const fs = require('node:fs');
const path = require('node:path');
const reporter = require('multiple-cucumber-html-reporter');

const reportJson = path.resolve('reports/cucumber-report.json');
if (!fs.existsSync(reportJson)) {
  console.error('No Cucumber JSON report found. Run npm test first.');
  process.exit(1);
}
reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: process.env.BROWSER || 'chromium',
    platform: process.platform,
    device: 'Local machine'
  },
  customData: {
    title: 'QA Automation Take-Home',
    data: [
      { label: 'Framework', value: 'Cucumber + Playwright + TypeScript' },
      { label: 'Target', value: process.env.BASE_URL || 'https://www.saucedemo.com' }
    ]
  }
});