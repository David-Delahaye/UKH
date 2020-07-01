import React, { Component } from "react";
import { Redirect} from "react-router-dom";

class Comments extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <h1>{this.props}</h1>
        )
    }
}

export default Comments