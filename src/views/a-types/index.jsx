import React from "react";
import { Nav } from './../../components/nav'
export class Protypes extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}