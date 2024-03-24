build:
	sudo docker build -t ya_gpt:elis1 .
run:
	sudo docker run -d -v db_yandex_gpt:/app/db --name ya_gpt ya_gpt:elis1
run-dev:
	sudo docker run -d -v "/mnt/b0a9b562-6454-495e-bc7a-6014e3ade56a/github/ya_gpt_obsidian:/app" -v /app/node_modules -v db_ya_gpt:/app/db --name ya_gpt ya_gpt:elis1
stop:
	sudo docker stop ya_gpt
start:
	sudo docker start ya_gpt