import React, { Component } from 'react';
import { Table, Badge } from 'react-bootstrap';
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
                            this.props.topFeatures.map(item =>
                                <tr key={item.id}>
                                    <td>{item.value} <Badge variant="secondary">{item.count}</Badge></td>
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
    topFeatures: state.strings.topFeatures,
});

export default connect(mapStateToProps)(Top50Strings);