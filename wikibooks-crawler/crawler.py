import requests;
from bs4 import BeautifulSoup;
import re;
import json


baseurl = "https://en.wikibooks.org"
url = "https://en.wikibooks.org/wiki/Java_Programming";
page = requests.get(url)
# print(page.text)
content = BeautifulSoup(page.content, "html.parser")
bodyContent = content.find('div', id="mw-content-text");
all_links = bodyContent.find_all('a', href = re.compile(r'.wiki/Java_Programming.'));
count = 0;
for a in all_links:
    count += 1
    #print ("Found the URL:", a['href'])

print(count);

all_relevant_url = [a['href'] for a in all_links];
print(all_relevant_url);

# new_url = baseurl + '/wiki/Java_Programming/API/java.lang.String';
AllDocuments = [];
countOfDocuments = 0;


for link in all_relevant_url:
    new_url = baseurl + link;
    if(link == '/wiki/Java_Programming/Print_version'):
        continue;
    page1 = requests.get(new_url)
    # print(page.text)
    content1 = BeautifulSoup(page1.content, "html.parser")
    bodyContent1 = content1.find('div', id="mw-content-text");
    flag = False;
    document = {};
    heading = content1.find('h1').text;
    code = [];
    content = [];
    print("Processing link " + new_url);

    for child in bodyContent1.findChildren():

        if(child.name == 'h2' or child.name == 'h3' or child.name == 'h4'):
            if flag == False:
                #print("----------------------------------------------------------")
                #print("Save old results..........................................")
                document['heading'] = heading;
                document['code'] = list(code);
                document['content'] = list(content);
                document['link'] = new_url
                #print(document)
                countOfDocuments += 1;
                AllDocuments.append(dict(document));
                document = {};
                code = [];
                content = [];

            flag = True;
            heading = child.text
            #print(child.text)
        if(child.name == 'p'):
            flag = False;
            content.append(child.text);
            #print(child.text)
        if(child.name == 'pre'):
            flag = False;
            code.append((child.text));
            #print(child.text)
        else:
            continue

with open('outputfile', 'w+') as fout:
    json.dump(AllDocuments, fout)
print("Number of all documents = " + str(countOfDocuments));



