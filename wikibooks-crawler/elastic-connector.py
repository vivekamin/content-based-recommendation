import json;
from elasticsearch import Elasticsearch


def create_index(elastic_object, index_name):
    created_index = 'NotCreated'
    body = {
        "settings": {
            "analysis": {
                "analyzer": {
                    "rebuilt_standard": {
                        "tokenizer": "standard",
                        "filter": [
                            "standard",
                            "lowercase",
                            "stemmer",
                            "stop"
                        ]
                    }
                }
            },

        },

        "mappings": {
            "_doc": {
                "properties": {
                    "heading": {
                        "type": "text",
                        "analyzer": "rebuilt_standard"
                    },
                    "code": {
                        "type": "text",
                        "analyzer": "rebuilt_standard"
                    },
                    "content": {
                        "type": "text",
                        "analyzer": "rebuilt_standard"
                    },
                    "link": {
                        "type": "text",
                        "analyzer": "rebuilt_standard"
                    }
                }
            }

        }
    }

    try:
        if elastic_object.indices.exists(index=index_name):
            elastic_object.indices.delete(index=index_name, )
        elastic_object.indices.create(index=index_name, body=body);
        created_index = index_name

    except Exception as ex:
        print("Error in creating Index", ex)

    finally:
        return created_index


def connect_elasticsearch():
    _es = None
    _es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    if _es.ping():
        print('Connected Successfully')
    else:
        print('Not able to connect to elastic-search!')
    return _es


def store_record(elastic_object, index_name, record):
    try:
        outcome = elastic_object.index(index=index_name, doc_type='_doc', body=record)
        # print(outcome)
    except Exception as ex:
        print('Error in indexing data')
        print(str(ex))


with open('outputfile', 'r') as fout:
    allDocuments = json.load(fout);
# pprint(allDocuments[202]);
# result = allDocuments[202];


# creating elasticsearch connection object
es = connect_elasticsearch();

# creating a new index
index_name = create_index(es, "java_content");

# storing documents in index
if (index_name != "NotCreated"):
    print("Newly created index is", index_name)
    print("Storing documents to ", index_name)
    for document in allDocuments:
        store_record(es, index_name, document);
    print('Data indexed successfully');
else:
    print("Not able to store docs because index creation failed")


