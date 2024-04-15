# Widget Project Setup
---
## Run installs
### Initialize package.json

```bash
npm init
```

### Install TypeScript

```bash
npm install typescript --save-dev
```

### Install webpack, webpack-cli, and ts-loader
WebPack Documentation
https://www.npmjs.com/package/webpack?authuser=0
https://webpack.js.org/concepts/

WebPack CLI Documentation
https://www.npmjs.com/package/webpack-cli?authuser=0

TS-Loader Documentation
https://www.npmjs.com/package/ts-loader/v/4.4.2

```
npm install --save-dev webpack webpack-cli ts-loader
```

### Setup tsconfig
```bash
tsc --init
```

### Inside of tsconfig
Ensure that you have these configuration settings enabled

```
/* Modules */
    "module": "Node16"
    "moduleResolution": "Node16"

/* JavaScript Support */
    "allowJs": true

/* Emit */
    "outDir": "./dist"

/* Type Checking */
    "strict": true, 
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedParameters": true, 
    "noImplicitReturns": true,
    "noImplicitOverride": true, 
```

## Create new file in root directory called webpack.config.js
#### Paste the following code inside the file

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Create new src driectory, with an index.ts inside
#### Current File Structure

```
dist
    - index.html
src
    - index.ts
package.json
tsconfig.json
webpack.config.js
```

### Run npx webpack to create bundle.js
Bundles and builds bundle.js file within dist directory

```bash
npx webpack
```

### Add bundle.js to index.html as a script at the bottom of body element

```html
<body>
    <h1>Hello World!</h1>
    <script src="bundle.js"></script>
</body>
```

### Install liveserver
This package will prevent us from having to run ```npx webpack``` to rebundle every time we make changes to our project

Live-server Documentation
https://www.npmjs.com/package/live-server?authuser=0

```bash
npm install live-server
```

### Install npm-run-all
npm-run-all Documentation
https://www.npmjs.com/package/npm-run-all?authuser=0

```bash
npm install npm-run-all --save-dev
```

### Add custom scripts to package.json


```javascript
"scripts": {
    "start": "npm run bundle && npm-run-all --parallel watch serve",
    "bundle": "webpack",
    "watch": "webpack --watch",
    "serve": "cd dist && live-server"
  }
```

### Add mode: 'none' to webpack.config.js file
This bypasses a 'mode' option has not been set error

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

# Structural setup complete!
---
#### Make a .gitignore file
```
node_modules/
__pycache__/
.vscode/
```

## Start your application

```bash
npm run start
```

# Your project is ready to go!