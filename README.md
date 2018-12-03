# Content Based Recommendation

<kbd>
  <img src="https://user-images.githubusercontent.com/25477734/48756252-9cb0ae00-ec55-11e8-96e7-4a8fe43504e2.png">
</kbd>


## Project Description
#### Implemented a content-based recommender via an web app by recommending similarity-based Java programming wikibooks content to Stackoverflow.com data set.

The system consist of three different stages

  - Content Collection: Crawling and Processing wikibooks content for Java Programming using Python,BeautifulSoup.
  - Content Indexing: Indexing the processed data using `elasticsearch`.
  - Web app: A web platform for end-user to explore the system

## How to run the project:

   - Two different folders:
        - wikibook-crawler
        - front-end

   -  Setup Elasticsearch before crawling and indexing documents using Docker or manually installing it.

   - **Setup Elasticsearch, Kibana, web-app using Docker**, be in `front-end` folder:
        - If using docker,
            - Run `npm install`
            - Run `cd ..`
            - Run `docker-compose up -d`, this command will automatically setup elasticsearch, kibana and web-app.
           
        - If not using Docker,
            - Run `npm install`
            - Install elasticsearch, do require changes in elasticsearch.yml file.
            - Run `npm start`

   - For Crawling open Wikibook-crawler folder in PyCharm and follow below steps:
        - Install dependencies stated in `requirements.txt`, if using PyCharm it will automatically suggest that. If not install using pip. Dependencies are:
            - beautifulsoup4
            - elasticsearch
            - requests
        - Run `crawler.py ` to crawl all documents of Wikibooks regarding Java Programming. This will generate a text file named as `outputfile` containing all documents.
        - Run `elastic-connector.py` to load all documents in elasticsearch for indexing purpose.
    
   - Open `http://localhost:3000`
   - Video link: https://www.youtube.com/watch?v=0SYtXPSKjvQ
