import React from 'react';
import {List} from 'semantic-ui-react';

const ExplanationSection = () => {
    return (
        <List bulleted>
            <List.Item>Scrapped the Wikibooks Java Programming content. Total of 103 pages have been scrapped and from that 533 documents have been stored in ElasticSearch.</List.Item>
            <List.Item>Different types of Alanyzer have used for indexing those records. Analyzer used are standard, stemmer and stop.
            <List.List>
                    <List.Item ><b>Stop Analyzer:</b> The stop analyzer is like the simple analyzer but also supports the removal of stop words.</List.Item>
                    <List.Item><b>Stemmer:</b> A filter that provides access to (almost) all of the available stemming token filters through a single unified interface.</List.Item>
                    <List.Item><b>Standard:</b> This divides the text into terms on word boundaries, as defined by the Unicode Text Segmentation algorithm. It removes most punctuation symbols. It is the best choice for most languages.</List.Item>
                </List.List>
            </List.Item>
            <List.Item>
                React web has been used to create a web application, which has two functionality.
            <List.List>
                    <List.Item>Provides the recommendation for the list of posts provided in excel</List.Item>
                    <List.Item>Facilitate the user to search for any topic related to java.</List.Item>
                </List.List>
            </List.Item>

        </List>
    );
}

export default ExplanationSection;