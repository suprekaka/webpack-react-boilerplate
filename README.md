# webpack-react-boilerplate
A boilerplate for quickly start up a react project which with build using webpack-2.

- Enable tree-shaking
- ESLint with airbnb spec

## Build Command
### `npm run build:prod`
For production.

- Uglify code
- Minify code
- Output bundle to `./dist` directory.

### `npm run build:dev`
For development.

- Watching source code changes
- Generate source-map
- Output bundle to `./dist` directory.

### `npm run build:hmr`
For development with react-hot-loader.

- Start up webpack-dev-server
- Hot module replace
- Watching source code changes
- Generate source-map
- Output bundle to RAM.
