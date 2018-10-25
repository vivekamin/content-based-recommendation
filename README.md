How to run the project:

    •	There are two different folders for the assignment:
        o	wikibook-crawler
        o	front-end


    •	For Crawling open Wikibook-crawler folder in PyCharm and follow below steps:
        o	Install dependencies stated in `requirements.txt`, if using PyCharm it will automatically suggest that. If not install using pip. Dependencies are:
            	beautifulsoup4
            	elasticsearch
            	requests
        o	Run `crawler.py ` to crawl all documents of Wikibooks regarding Java Programming. This will generate a text file named as `outputfile` containing all documents.
        o	Run `elastic-connector.py` to load all documents in elasticsearch for indexing purpose.
    •	For Web-App, be in `front-end` folder:
        o	If using docker,
            	Run `npm install`
            	Run `cd ..`
            	Run `docker-compose up -d`, this command will automatically setup elasticsearch, kibana and web-app.
            	Open `http://localhost:3000`
        o	If not using Docker,
            	Run `npm install`
            	Install elasticsearch, do require changes in elasticsearch.yml file.
            	Run `npm start`
            	Open `http://localhost:3000`
    •	Video link: https://www.youtube.com/watch?v=0SYtXPSKjvQ
