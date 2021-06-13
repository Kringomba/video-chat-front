import React from "react";
import {BrowserRouter as Router, Route as ReactRoute, Switch} from "react-router-dom";
import {Welcome} from './welcome'
import {Call} from './call'
import {PopupContextLayout} from "../shared";


export const Route: React.FC = () => {
    return <Router>
        <Switch>
            <ReactRoute path='/call/:id'>
                <Call/>
            </ReactRoute>
            <ReactRoute path='/'>
                <PopupContextLayout>
                    <Welcome/>
                </PopupContextLayout>
            </ReactRoute>
        </Switch>
    </Router>
}

export {Welcome, Call}