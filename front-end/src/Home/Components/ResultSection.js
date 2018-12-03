import React from 'react';
import { Table} from 'semantic-ui-react';
import Highlight from 'react-highlight';

const ResultSection = ({ index, object }) => {
    return (
        <Table definition  data-aos='zoom-in' data-aos-anchor-placement="top-bottom">


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
            </Table.Body>
        </Table>);
}

export default  ResultSection;