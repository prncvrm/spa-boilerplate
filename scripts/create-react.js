'use strict';
// Do this as the first thing so that any code reading it knows the right env.

const fs = require('fs-extra');
const path = require('path');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';


process.on('unhandledRejection', err => {
    throw err;
});

const validateAppName = () => {
    const appName = process.argv[2]
    if (!appName) {
        throw new Error("Invalid App name.. enter a app name")
    }
    const appPath = path.join(process.cwd(), 'packages', appName)
    process.env.PROJECT_PATH = appPath;
    // if (fs.existsSync(appPath)) {
    //     throw new Error('App with Name exists', appName)
    // }
    
}

validateAppName()
copyTemplate()

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.

// editing package.json file
const editJsonFile = require("edit-json-file");
const webpack = require("./webpack-config.js");
let file = editJsonFile(process.env.PROJECT_PACKAGE);
file.set("name", `@singlespa/${process.argv[2]}`);
file.set("scripts.watch:portal", `webpack-dev-server --port ${process.argv[3]}`);
file.save()


// //creating webpack.config.js file

fs.writeFile(path.join(process.env.PROJECT_PATH,"webpack.config.js"), webpack.config(process.argv[2]), err => {
  if (err) {
    throw err;
  }
});

// const chalk = require('react-dev-utils/chalk');
// const webpack = require('webpack');
// const bfj = require('bfj');
// const configFactory = require('./config/webpack.config');
// const paths = require('./config/paths');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
// const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
// const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
// const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
// const printBuildError = require('react-dev-utils/printBuildError');

// const measureFileSizesBeforeBuild =
//   FileSizeReporter.measureFileSizesBeforeBuild;
// const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
// const useYarn = fs.existsSync(paths.yarnLockFile);

// // These sizes are pretty large. We'll warn for bundles exceeding them.
// const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
// const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// const isInteractive = process.stdout.isTTY;

// // // Warn and crash if required files are missing
// if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
//   process.exit(1);
// }

// // // Process CLI arguments
// const argv = process.argv.slice(2);
// const writeStatsJson = argv.indexOf('--stats') !== -1;

// // // Generate configuration
// const config = configFactory('production');

// // // We require that you explicitly set browsers and do not fall back to
// // // browserslist defaults.
// const { checkBrowsers } = require('react-dev-utils/browsersHelper');
// checkBrowsers(paths.appPath, isInteractive)
//   .then(() => {
// //     // First, read the current file sizes in build directory.
// //     // This lets us display how much they changed later.
//     return measureFileSizesBeforeBuild(paths.appBuild);
//   })
//   .then(previousFileSizes => {
//     // Remove all content but keep the directory so that
//     // if you're in it, you don't end up in Trash
//     fs.emptyDirSync(paths.appBuild);
//     // Merge with the public folder
//     copyPublicFolder();
//     // Start the webpack build
//     return build(previousFileSizes);
//   })
//   .then(
//     ({ stats, previousFileSizes, warnings }) => {
//       if (warnings.length) {
//         console.log(chalk.yellow('Compiled with warnings.\n'));
//         console.log(warnings.join('\n\n'));
//         console.log(
//           '\nSearch for the ' +
//             chalk.underline(chalk.yellow('keywords')) +
//             ' to learn more about each warning.'
//         );
//         console.log(
//           'To ignore, add ' +
//             chalk.cyan('// eslint-disable-next-line') +
//             ' to the line before.\n'
//         );
//       } else {
//         console.log(chalk.green('Compiled successfully.\n'));
//       }

//       console.log('File sizes after gzip:\n');
//       printFileSizesAfterBuild(
//         stats,
//         previousFileSizes,
//         paths.appBuild,
//         WARN_AFTER_BUNDLE_GZIP_SIZE,
//         WARN_AFTER_CHUNK_GZIP_SIZE
//       );
//       console.log();

//       const appPackage = require(paths.appPackageJson);
//       const publicUrl = paths.publicUrl;
//       const publicPath = config.output.publicPath;
//       const buildFolder = path.relative(process.cwd(), paths.appBuild);
//       printHostingInstructions(
//         appPackage,
//         publicUrl,
//         publicPath,
//         buildFolder,
//         useYarn
//       );
//     },
//     err => {
//       console.log(chalk.red('Failed to compile.\n'));
//       printBuildError(err);
//       process.exit(1);
//     }
//   )
//   .then(() => {
//     if (paths.postbuild) {
//       const fn = require(paths.postbuild)
//       if (typeof fn === 'function') {
//         fn(paths.appBuild)
//       }
//     }
//   })
//   .catch(err => {
//     if (err && err.message) {
//       console.log(err.message);
//     }
//     process.exit(1);
//   });

// // Create the production build and print the deployment instructions.
// function build(previousFileSizes) {
//   console.log('Creating an optimized production build...');

//   let compiler = webpack(config);
//   return new Promise((resolve, reject) => {
//     compiler.run((err, stats) => {
//       let messages;
//       if (err) {
//         if (!err.message) {
//           return reject(err);
//         }
//         messages = formatWebpackMessages({
//           errors: [err.message],
//           warnings: [],
//         });
//       } else {
//         messages = formatWebpackMessages(
//           stats.toJson({ all: false, warnings: true, errors: true })
//         );
//       }
//       if (messages.errors.length) {
// //         // Only keep the first error. Others are often indicative
// //         // of the same problem, but confuse the reader with noise.
//         if (messages.errors.length > 1) {
//           messages.errors.length = 1;
//         }
//         return reject(new Error(messages.errors.join('\n\n')));
//       }
//       if (
//         process.env.CI &&
//         (typeof process.env.CI !== 'string' ||
//           process.env.CI.toLowerCase() !== 'false') &&
//         messages.warnings.length
//       ) {
//         console.log(
//           chalk.yellow(
//             '\nTreating warnings as errors because process.env.CI = true.\n' +
//               'Most CI servers set it automatically.\n'
//           )
//         );
//         return reject(new Error(messages.warnings.join('\n\n')));
//       }

//       const resolveArgs = {
//         stats,
//         previousFileSizes,
//         warnings: messages.warnings,
//       };
//       if (writeStatsJson) {
//         return bfj
//           .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
//           .then(() => resolve(resolveArgs))
//           .catch(error => reject(new Error(error)));
//       }

//       return resolve(resolveArgs);
//     });
//   });
// }


function createDir(){
    if (!fs.existsSync(process.env.PROJECT_PATH)){
        fs.mkdirSync(process.env.PROJECT_PATH)
    }
}
function copyTemplate() {
    const source = path.join(process.cwd(), "templates", 'react');
    createDir();
    fs.copySync(source, process.env.PROJECT_PATH);
    process.env.PROJECT_PACKAGE = path.join(process.env.PROJECT_PATH, 'package.json');
}