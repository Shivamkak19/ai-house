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

        reveal1: './reveal.js.files/dist/theme/white.css',
        reveal2: './reveal.js.files/dist/reveal.css',
        reveal3: './reveal.js.files/dist/reveal.js',
        reveal4: './reveal.js.files/plugin/highlight/highlight.js',
        reveal5: './reveal.js.files/plugin/highlight/monokai.css',

        reveal6: './reveal.js.files/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot',
        reveal7: './reveal.js.files/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot?#iefix',
        reveal8: './reveal.js.files/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.woff',
        reveal9: './reveal.js.files/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.ttf',


      }
    },
    outDir: 'dist'
  },
  // // Copy reveal.js-master folder after build
  // plugins: [
  //   {
  //     name: 'copy-revealjs',
  //     async writeBundle() {
  //       const revealPath = path.resolve(__dirname, 'reveal.js-master');
  //       const distPath = path.resolve(__dirname, 'dist', 'reveal.js-master');
  //       await fs.copy(revealPath, distPath);
  //     }
  //   }
  // ]
};


// const path = require('path');
// const fs = require('fs-extra');
// const https = require('https');

// module.exports = {
//   build: {
//     rollupOptions: {
//       input: {
//         main: './index.html',
//         aitt: './Framework/aitt.html',
//         resources: './Framework/resources.html',
//         home: './Framework/home.html',
//       }
//     },
//     outDir: 'dist'
//   },
//   // Trigger Vercel build hook after build
//   plugins: [
//     {
//       name: 'trigger-build-hook',
//       async writeBundle() {
//         const url = 'https://api.vercel.com/v1/integrations/deploy/prj_zJEuhEq7J5y3AyYbIA00SaMoBAKi/hvMn5WKSeQ';
//         const options = {
//           hostname: 'api.vercel.com',
//           path: url,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         };
//         const req = https.request(options, res => {
//           console.log(`statusCode: ${res.statusCode}`);
//           res.on('data', d => {
//             process.stdout.write(d);
//           });
//         });
//         req.on('error', error => {
//           console.error(error);
//         });
//         req.end();
//       }
//     }
//   ]
// };