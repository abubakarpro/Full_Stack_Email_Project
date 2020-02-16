import React, { Component } from 'react'
import requireAuth from "../hoc/requireAuth";


class Composed extends Component {
    state = {  }
    render() { 
        return (  
            <React.Fragment>
                <div>Composed</div>
            </React.Fragment>
        );
    }
}
 
export default requireAuth(Composed);