import React from 'react';
import PropTypes from 'prop-types';

import {
    TSearch,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Department extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    handleSearch(query, callback) {
        if (query.id > 0 || (query.name && query.name.length > 2)) {
            post({
                url: '/rest/pol/departments',
                data: query,
                success: (response) => {
                    if (this.mounted) {
                        callback(response);
                    }
                }
            });
        } else {
            callback([]);
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TSearch
                style={style}
                layout={this.props.layout}
                name={this.props.name}
                label={this.props.label}
                value={this.props.value}
                showIcon={this.props.showIcon}
                placeholder={this.props.placeholder}
                keyField={'id'}
                valueField={'name'}
                empty={{id: -1, name: '---'}}
                clickable={'edit'}
                onSearch={this.handleSearch}
                onChange={this.handleChange} />

        );

    }

}

Department.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.string,
    value: PropTypes.any,
    showIcon: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

Department.defaultProps = {
    showIcon: false
};

export default Department;
