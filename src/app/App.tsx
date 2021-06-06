import React from 'react'
import {CookiesProvider} from "react-cookie";
import {Route} from './routes'

const App: React.FC = () => {
    return <CookiesProvider>
        <Route/>
    </CookiesProvider>
}

export default App;