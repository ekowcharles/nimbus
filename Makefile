default: run

run:
	npm start

build:
	PUBLIC_URL=https://nimbus.ovsprint.com npm run build

test:
	npm test

deploy:
	netlify deploy

all:
	npm i webpack webpack-cli html-webpack-plugin html-loader prop-types --save-dev
	npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
	npm i sass-loader node-sass css-loader style-loader url-loader file-loader --save-dev
	PUBLIC_URL=https://nimbus.ovsprint.com npm run build