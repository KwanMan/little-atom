BIN = ./node_modules/.bin

.PHONY: lint test test-watch

lint:
	$(BIN)/standard
	$(BIN)/standard5

test: lint
	$(BIN)/jest

test-watch:
	$(BIN)/jest --watchAll
