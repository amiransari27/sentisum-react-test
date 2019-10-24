import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from "react-redux";

class Top50Strings extends Component {

    render() {

        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Top 50 Strings (in descending order of occurrences)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.top50Items.map(item =>
                                <tr key={item.id}>
                                    <td>{item.value}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    top50Items: state.strings.top50Items,
});

export default connect(mapStateToProps)(Top50Strings);