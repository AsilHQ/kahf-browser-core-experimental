init:
	npm run sync --init

build:
	npm run build -- Debug

launch:
	../out/Debug/brave.exe

.PHONY: init build launch
