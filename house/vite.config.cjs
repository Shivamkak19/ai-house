const path = require('path');
const fs = require('fs-extra');

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        aitt: './Framework/aitt.html',
        resources: './Framework/resources.html',
        home: './Framework/home.html',
      }
    },
    outDir: 'dist'
  },
  // Copy reveal.js-master folder after build
  plugins: [
    {
      name: 'copy-revealjs',
      async writeBundle() {
        const revealPath = path.resolve(__dirname, 'reveal.js-master');
        const distPath = path.resolve(__dirname, 'dist', 'reveal.js-master');
        await fs.copy(revealPath, distPath);
      }
    }
  ]
};