install:
	install-deps

help:
	bin/gendiff -h

run-flat:
	bin/gendiff before.json after.json

run-nested:
	bin/gendiff beforeNested.json afterNested.json

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
