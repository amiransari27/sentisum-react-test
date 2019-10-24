import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class StringListPagination extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : this.props.page,
            pages : this.props.pages,
            total : this.props.total,
            onPageChange: this.props.onPageChange
        }
    }

    getLinks = () => {
        let links = []
        for(let number=1; number <= this.state.pages;number++ ){
            links.push(
                <Pagination.Item 
                    key={number} 
                    active={number === this.state.page}
                    onClick={this.handlePageChange}
                    >
                  {number}
                </Pagination.Item>,
              );
        }
        return links;
    }

    handlePageChange = (event) => {
        const tmp = parseInt(event.target.innerHTML)
        this.setState({page: tmp});
        this.state.onPageChange(tmp);
    }

    render() {
       return (
        <div>
            <Pagination size="sm">
                {this.getLinks()}
            </Pagination>
        </div>
       );
    }
}

export default StringListPagination;