ghpages.publish(
  'out', // Directory containing the exported static files
  {
    branch: 'gh-pages', // Deploy to the gh-pages branch
    repo: 'https://github.com/hjoseph777/lab6-form-validationa.git', // Your GitHub repository URL
    message: 'Auto-generated commit [ci skip]', // Commit message
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
      return;
    }
    console.log('Deployment complete!');
  }
);
