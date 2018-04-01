/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class HotKey extends Component {    
    constructor(props) {       
        super(props);        
        this.state = {
            root: null,
            hotkeys: []
        }
        
        this.hotKeyClicked.bind(this);
        
        //Wait for entire window to load first before looking for hotkeys
        window.addEventListener('load', () => this.addRootListener());
        
    }
    
    addRootListener(){
        this.state.root.addEventListener('keydown', (e) => {
            
        });
    }
    
    dblkeydown = (keyCode, callback) => {
        console.log(keyCode);
    }
    
    componentDidMount(){      
        console.log('mounted!');
        this.setState({
           root: ReactDOM.findDOMNode(this) 
        });
        console.log(this.refs.hotKeyCommand);
        this.refs.hotKeyCommand.addEventListener('input', (event) => {
            let query = `[hot-key="${event.data.toUpperCase()}"`;
            let button = this.state.root.querySelector(query);
            
            if(button) {
                button.click();
                this.refs.hotKeyCommand.blur();
            }
        });
    }
    
    hotKeyClicked(){
        console.log('clicked');
    }

    render() {
        return(
            <div id="hotkeys">
                <input ref="hotKeyCommand" onBlur={this.hotKeyClicked}/>
                {this.props.children}
            </div>
        );
    }
}

export default HotKey;

