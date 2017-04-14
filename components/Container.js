import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader'
import { query, store } from './state'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Container extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
                    
        }
    }

    

    componentDidMount() {
        
    }

  render() {
    
    return (
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h3>耳朵去旅行</h3>
                    </div>
                    <hr />
                    <MuiThemeProvider>
                    {this.props.children } 
                    </MuiThemeProvider>
                </div>
    )
  }
}


