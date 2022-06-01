.PHONY: all
TESTS = tests/index.js

all:
	@npm install

test: all
	@mkdir -p tests/infected
	@mkdir -p tests/bad_scan_dir
	@touch tests/clamscan-log
	@./node_modules/.bin/mocha --exit --trace-warnings --trace-deprecation --retries 0 --full-trace --timeout 5000 --check-leaks --reporter spec $(TESTS)

clean:
	rm -rf node_modules
