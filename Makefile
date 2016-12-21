install-python:
	@echo "--> Installing Python dependencies"
	pip install -r requirements.txt
	@echo ""

.PHONY: install-python