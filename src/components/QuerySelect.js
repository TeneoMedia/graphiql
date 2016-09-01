/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE-examples file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';


/**
 * ToolbarButton
 *
 * A button to use within the Toolbar.
 */
export class QuerySelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    loading: PropTypes.func,
    title: PropTypes.string,
    label: PropTypes.string,
  }

  constructor(props) {
    super(props);
    //const queries = querySource.map(q => <option key={q.queryName} value={q.query}>{q.queryName}</option>)
    this.state = { queries : [] };
  }
  
  async getS3(name){
    return fetch(`https://xuo0vu4v6d.execute-api.us-east-1.amazonaws.com/dev/internal/graphiql/queries/${name}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      return response.text();
    }).then(function (responseBody) {
      try {
        return JSON.parse(responseBody);
      } catch (error) {
        return responseBody;
      }
    });
  }
  
  getList = async() => {
    let queryList = await this.getS3('queryList.json');
    queryList.unshift(`Initial`);
  
    let queries = queryList.map(q => {
      const v = (q == 'Initial') ? 'Choose a saved query' : q;
      const display = _.startCase(v);
      
      return <option key={q} value={q}>{display}</option>
    });
    
    
    
    this.setState({queries})
    
  }
  
  makeSelection = async(e) => {
    if(e.target.value === 'Initial') return null;
    this.props.loading()
      const query = await this.getS3(e.target.value);
    this.props.onChange(query);
    this.props.loading()
    }
  
  
  componentDidMount(){
   this.getList()
  }

  render() {
    return (
       <select onChange={this.makeSelection}>{this.state.queries}</select>
    );
  }

  handleClick = e => {
    e.preventDefault();
    try {
      this.props.onClick();
      
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error });
    }
  };
}
