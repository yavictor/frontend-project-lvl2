install:
	npm install

help:
	bin/gendiff.js -h

run:
	bin/gendiff.js __fixtures__/before.json __fixtures__/after.json

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npx -n --experimental-vm-modules jest --watch

.PHONY: test
	