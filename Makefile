default: run

run:
	npm start

build:
	PUBLIC_URL=https://nimbus.netlify.com npm run build

test:
	npm test

deploy:
	netlify deploy

setup:
	npm i webpack webpack-cli html-webpack-plugin html-loader prop-types --save-dev
	npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
	npm i sass-loader node-sass css-loader style-loader url-loader --save-dev

all:
	npm i webpack webpack-cli html-webpack-plugin html-loader prop-types --save-dev
	npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
	npm i sass-loader node-sass css-loader style-loader url-loader file-loader --save-dev
	npm run build