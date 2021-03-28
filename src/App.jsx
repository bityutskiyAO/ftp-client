import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router'
import { ThemeProvider } from '@material-ui/core/styles'

import { Auth, Main } from './pages'
import { theme } from './utils/styles'

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route
                        path="/auth"
                        exact
                        component={Auth}
                    />
                    <Route
                        path="/main/:login"
                        exact
                        component={Main}
                    />
                    <Redirect
                        to="/auth"
                    />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>

    )
}

export default App
