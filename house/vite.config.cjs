// module.exports = {
//     build: {
//       rollupOptions: {
//         input: {
//           main: './index.html',
//           aitt: './Framework/aitt.html',
//           resources: './Framework/resources.html',
//           home: './Framework/home.html'

//         }
//       }
//     }
//   }


//   import { defineConfig } from 'vite';
// import copy from 'rollup-plugin-copy';

// module.exports = defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: './index.html',
//         aitt: './Framework/aitt.html',
//         resources: './Framework/resources.html',
//         home: './Framework/home.html'
//       },
//       plugins: [
//         copy({
//           targets: [
//             { src: './reveal.js-master/**/*', dest: 'dist' },
//           ],
//           // Other options...
//         }),
//       ],
//     }
//   }
// });

const copy = require('rollup-plugin-copy');

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        aitt: './Framework/aitt.html',
        resources: './Framework/resources.html',
        home: './Framework/home.html'
      },
      plugins: [
        copy({
          targets: [
            { src: 'reveal.js-master/**/*', dest: 'dist' },
          ],
          // Other options...
        }),
      ],
    },
  },
};

