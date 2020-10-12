install:
	npm install

help:
	bin/gendiff.js -h

run:
	bin/gendiff.js __fixtures__/before.json __fixtures__/after.json

lint:
	npx eslint .

test:
	npm test

	