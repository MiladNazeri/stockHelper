import '../stylesheets/main.scss';

import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
            check check
            {this.props.children}
            </div>
        )
    }
}

export default App;