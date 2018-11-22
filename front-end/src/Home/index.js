import React, { Component } from 'react';
import { Button, Grid, Segment, Table, Image, Divider, Input, Form, Header, Loader, Icon, Label, List } from 'semantic-ui-react';
import elasticsearch from 'elasticsearch';
import posts from './post.json';
import Highlight from 'react-highlight';
import AOS from 'aos';


const buttons = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5", "Post 6", "Post 7", "Post 8", "Post 9", "Post 10"];
let isScrolling;
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


export default class extends Component {
    constructor(props) {
        console.log(posts);
        super(props);
        this.state = {
            queryNumber: '',
            result_sources: [],
            queryContent: '',
            queryType: '',
            queryCode: '',
            code: '',
            content: '',
            link: '',
            loading: true,
            searchContent: '',
            customSearch: false,
            explanationFlag: false
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }
    componentDidMount() {
        AOS.init({delay:500});
        this.handleClick(0);
    }


    handleChange = (event) => {
        this.setState({ searchContent: event.target.value, customSearch: true });

        clearTimeout(isScrolling);
        let that = this;
        isScrolling = setTimeout(function () {
            that.handleFormSubmit();
        }, 1000);

    }
    async handleFormSubmit() {

        console.log("Searching......." + this.state.searchContent);
        let queryToSearch = this.state.searchContent
        this.setState({ loading: true, customSearch: false });
        this.setState({ queryContent: queryToSearch, queryType: "Custom search", queryCode: "", queryNumber: "" });
        try {
            const response = await client.search({
                index: 'java_content',
                body: {
                    from: 0,
                    size: 10,
                    query: {
                        query_string: {
                            fields: ["heading", "content", "link"],
                            //query: "for(int i = 0; i<n; i++)}",
                            query: queryToSearch,


                        }
                    },
                }
            });

            console.log(response);
            console.log(response.hits.hits);
            let result_sources = response.hits.hits.map((obj) => obj._source);
            console.log(result_sources);
            this.setState({ result_sources, loading: false });
        }
        catch (e) {
            console.log(e)
        }

    }



    async handleClick(text) {
        console.log(text);
        this.setState({ loading: true, customSearch: false });
        console.log(posts[text].type);
        this.setState({ queryContent: posts[text].text, queryType: posts[text].type, queryCode: posts[text].code, queryNumber: text + 1 });
        client.ping({
            requestTimeout: 30000,
        }, function (error) {
            if (error) {
                console.error('elasticsearch cluster is down!');
            } else {
                console.log('All is well');
            }
        });
        let contentToQuery = posts[text].text.replace(/[^a-zA-Z ]/g, " ");
        let codeToQuery = posts[text].code.replace(/[^a-zA-Z ]/g, " ");
        let queryFinalText = contentToQuery + " " + codeToQuery;
        try {
            const response = await client.search({
                index: 'java_content',
                body: {
                    from: 0,
                    size: 10,
                    query: {
                        query_string: {
                            fields: ["heading", "content", "link"],
                            //query: "for(int i = 0; i<n; i++)}",
                            query: queryFinalText,


                        }
                    },
                }
            });

            console.log(response);
            console.log(response.hits.hits);
            let result_sources = response.hits.hits.map((obj) => obj._source);
            console.log(result_sources);
            this.setState({ result_sources, loading: false });
        }
        catch (e) {
            console.log(e)
        }




    }

    render() {
        return (
            <div style={{ margin: '5px' }}>


                <Segment textAlign='center' style={{}} vertical>

                    <Header as='h2' icon size="medium">
                        <Icon name='find' />
                        Content-based Recommendation
                        <Header.Subheader> Content-based recommender via an web app by
recommending similarity-based Java programming wikibooks content.</Header.Subheader>
                    </Header>
                    <br />
                    <Button.Group style={{ margin: '5px' }}>
                        <Button positive={!this.state.explanationFlag} onClick={() => { this.setState({ explanationFlag: false }) }}>Home</Button>
                        <Button.Or />
                        <Button positive={this.state.explanationFlag} onClick={() => { this.setState({ explanationFlag: true }) }}>Explaination</Button>
                    </Button.Group>

                    {!this.state.explanationFlag && <Form onSubmit={this.handleFormSubmit}>
                        <Input value={this.state.searchContent} size="medium" style={{ width: "40%" }} onChange={this.handleChange} placeholder='Either Search or click on post for recommendation....' />

                    </Form>}



                </Segment>
                {!this.state.explanationFlag &&
                    <div className="fixedContainer">
                        {buttons.map((text, index) => {
                            return (<Grid.Row key={index} onClick={() => this.handleClick(index)}><center><Button style={{ margin: '1em' }} primary> {text} </Button></center></Grid.Row>)
                        })}
                    </div>
                }
                {!this.state.explanationFlag && !this.state.customSearch &&
                    <Grid style={{ paddingLeft: '10%' }}
                    >

                        <Grid.Column width={16}>
                            <br />
                            <Label>
                                Searched Post
                                <Label.Detail>{this.state.queryNumber}</Label.Detail>
                            </Label>
                            <br />
                            <Segment>
                                <Table definition>


                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Type</Table.Cell>
                                            <Table.Cell>{this.state.queryType}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Content</Table.Cell>
                                            <Table.Cell>{this.state.queryContent}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Code</Table.Cell>
                                            <Table.Cell>{this.state.queryCode}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Segment>
                            <Divider horizontal>*****</Divider>
                            <Label color="green" >
                                Recommendation Results:
                            </Label>
                            <Segment loading={this.state.loading}>
                                {this.state.loading && <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />}
                                {!this.state.loading && this.state.result_sources.length === 0 && <p> No results </p>}
                                {!this.state.loading && this.state.result_sources.map((object, index) => {
                                    return (
                                        //JSON.stringify(object)
                                        <Table definition key={index} data-aos='fade-up' data-aos-anchor-placement="top-bottom">


                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell colSpan="2"><center>Result #{index + 1}</center></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Heading</Table.Cell>
                                                    <Table.Cell>{object.heading[object.heading.length - 1] === ']' ? object.heading.substr(0, object.heading.length - 6) : object.heading}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Relevant link</Table.Cell>
                                                    <Table.Cell><a href={object.link}>{object.link}</a></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Content</Table.Cell>
                                                    <Table.Cell>{object.content.map((content, index) => { return (<p key={index}>{content}</p>) })}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Code</Table.Cell>
                                                    {/* <Table.Cell>{object.code.map((code, index) => {return (<pre key={index}>{code}</pre>)})}</Table.Cell> */}
                                                    <Table.Cell>{object.code.map((code, index) => { return (<Highlight className="Java" key={index}>{code}</Highlight>) })}</Table.Cell>
                                                </Table.Row>
                                                {/*
                                            <Table.Row>
                                                <Table.Cell>Content</Table.Cell>
                                                <Table.Cell>{this.state.queryContent}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Code</Table.Cell>
                                                <Table.Cell>{this.state.queryCode}</Table.Cell>
                                            </Table.Row> */}
                                            </Table.Body>
                                        </Table>
                                    );
                                })}
                            </Segment>

                        </Grid.Column>
                    </Grid>}
                {this.state.customSearch && this.state.searchContent !== '' &&
                    <Grid style={{ padding: '10%' }}>
                        <Header as='h2' icon textAlign='center'>
                            <Loader active size="huge" inline />
                            <Header.Content></Header.Content> <Header.Subheader>You are Searching for <b>{this.state.searchContent}</b></Header.Subheader>
                        </Header>
                    </Grid>}
                {this.state.explanationFlag &&
                    <Segment style={{ marginLeft: "20%", marginRight: "20%" }}>

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
                    
    
                </Segment>
                }



            </div>
        );
    }
}