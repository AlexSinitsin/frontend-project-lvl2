install: install-deps

install-deps:
	npm ci

test:
	node --experimental-vm-modules node_modules/.bin/jest

edit:
	npx prettier -w .

lint:
	npx eslint .

publish:
	npm publish