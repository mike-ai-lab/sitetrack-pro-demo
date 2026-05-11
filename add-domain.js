const { execSync } = require('child_process');

const projectId = 'prj_ZZX4nLfvwcO4QmrO5QFf7aIQzBoP';
const domain = 'sitetrack.mimevents.com';

console.log('Adding domain to project...');

try {
  // Add domain using vercel CLI
  execSync(`vercel domains add ${domain} --scope moeshks-projects`, { stdio: 'inherit' });
  console.log('Domain added successfully!');
  
  // Link domain to project
  execSync(`vercel alias set tilal-eight.vercel.app ${domain}`, { stdio: 'inherit' });
  console.log('Domain linked to project!');
} catch (error) {
  console.error('Error:', error.message);
}
