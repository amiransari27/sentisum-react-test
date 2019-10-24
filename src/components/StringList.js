import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from "react-redux";
import { getStringsChunk } from '../store/actions/stringsActions';
import StringListPagination from './StringListPagination';


class StringList extends Component {
    constructor(props) {
        super(props)

    }

    getStringsChunk = (page) => {
        this.props.dispatch(
            getStringsChunk(page)
        );
    }

    render() {
        return (
            <div>
                <Table striped bordered hover  size="sm">
                    <thead>
                        <tr>
                            <th>Strings Pagination, maximum of 1000 
                            {
                                !(this.props.loading) 
                                && ` (Page ${this.props.page} of ${this.props.pages})`
                            }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.map(item =>
                                <tr key={item.id}>
                                    <td>{item.value}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                {
                    !(this.props.loading) &&
                    <StringListPagination
                        page={this.props.page}
                        pages={this.props.pages}
                        total={this.props.total}
                        onPageChange={this.getStringsChunk}

                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.strings.items,
    page: state.strings.page,
    pages: state.strings.pages,
    total: state.strings.total,
    loading: state.strings.loading,
    error: state.strings.error
});

export default connect(mapStateToProps)(StringList);
