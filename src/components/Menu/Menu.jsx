import React, { Component } from 'react';
import DepartureBlock from '../DepartureBlock';
import DestinationBlock from '../DestinationBlock';

const styles = {
    menu: {
        backgroundcolor: "yellow",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },

}

class Menu extends Component{

    render(){
        return(
            <div style={styles.menu}> 
                <div>
                    <DepartureBlock></DepartureBlock>
                </div>
                <div>
                    <DestinationBlock></DestinationBlock>
                 </div>
            </div>
        );
    }
}

export default Menu;