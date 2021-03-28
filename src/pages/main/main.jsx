import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, useLocation } from 'react-router'

import Content from './content/content'
import UserContent from './user-content/user-content'

const Main = (props) => {
    const match = useRouteMatch()
    const location = useLocation()

    return (
        <Content
            user={match.params.login}
            list={location.state}
        />
    )
}

Main.propTypes = {
    
}

export default Main
