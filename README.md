## Installing and Running Code

Start by cloning this repo and installing node-js, npm and gulp.

```sh
cd path/to/tamaki-react-boilerplate
npm install
gulp
```

> The server will be available at localhost:3000


If you want to edit the React code, you'll have to re-build the `public/js/bundle.js` file with Webpack. You'll probably want to open a new terminal tab so you can keep your server running. To rebuild with Webpack, type:

```sh
gulp watch
```

Also note that you'll need to [globally install Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) first if you haven't already