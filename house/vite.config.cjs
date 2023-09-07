// module.exports = {
//   build: {
//     rollupOptions: {
//       input: {
//         main: './index.html',
//         aitt: './Framework/aitt.html',
//         resources: './Framework/resources.html',
//         home: './Framework/home.html',
//       }
//     }
//   }
// }

const path = require('path');
const { defineConfig } = require('vite');
const { copy } = require('fs-extra');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        aitt: './Framework/aitt.html',
        resources: './Framework/resources.html',
        team: './Framework/team.html',
        home: './Framework/home.html',
        emailfeed: './Framework/emailfeed.json',
        contact: './Framework/contact.js'
      },
    },
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'copy-revealjs',
      async writeBundle() {
        const revealPath = path.resolve(__dirname, 'node_modules', 'reveal.js');
        const distPath = path.resolve(__dirname, 'dist', 'reveal.js');
        await copy(revealPath, distPath);
      },
    },
  ],
});