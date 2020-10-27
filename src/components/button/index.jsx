import React from "react";
import './index.css'
export function Apbutton(props) {
    const {type, size, icon} = props
    console.log(type, size, icon)
    const styleStr = type + " sw-btn"
    return (
        <div className={styleStr}>
            {props.children}
        </div>
    )
}