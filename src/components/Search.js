import React, { Component } from 'react';
import { fetchStrings } from '../store/actions/stringsActions';
import { connect } from "react-redux";
import { InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            terms: 'safe'
        }

    }
    componentDidMount() {
        this.fetchStrings(this.state.terms);
    }

    fetchStrings = terms => {
        this.props.dispatch(
            fetchStrings(terms)
        );
    }

    handleOnChange = (e) => {
        this.setState({
            terms: e.target.value
        })
    }

    render() {
        return (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Terms"
                        aria-label="Terms"
                        aria-describedby="basic-addon2"
                        value={this.state.terms}
                        onChange={this.handleOnChange}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => this.fetchStrings(this.state.terms)}>
                            Search {this.props.loading && <Spinner animation="border" size="sm" />}
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <h4>Total - {this.props.sentences.length}</h4>
            </>
        );
    }
}



const mapStateToProps = state => ({
    top50Items: state.strings.top50Items,
    sentences: state.strings.sentences,
    loading: state.strings.loading
});


export default connect(mapStateToProps)(Search);
