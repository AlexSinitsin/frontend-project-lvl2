install: install-deps

install-deps:
	npm ci

test:
	node --experimental-vm-modules node_modules/.bin/jest

lint:
	npx eslint .

publish:
	npm publish