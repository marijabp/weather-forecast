import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class LocationName extends Component {
    render(){
        return(
            <div>
                <TextField
                    id="standard-textarea"
                    label={this.props.children}
                    margin="normal"
                >
                    
                    </TextField>

            </div>
        );
    }

}

export default LocationName;