const ghpages = require('gh-pages');
const fs = require('fs');
const path = require('path');

// Create .nojekyll file in the out directory to prevent GitHub Pages from ignoring files that begin with an underscore
const nojekyllPath = path.join(process.cwd(), 'out', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');

ghpages.publish(
  'out', // Directory containing the exported static files
  {
    branch: 'gh-pages', // Deploy to the gh-pages branch
    repo: 'https://github.com/hjoseph777/lab6-form-validationa.git', // Your GitHub repository URL
    message: 'Auto-generated commit [ci skip]', // Commit message
    dotfiles: true, // Include dotfiles like .nojekyll
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
      return;
    }
    console.log('Deployment complete!');
  }
);

