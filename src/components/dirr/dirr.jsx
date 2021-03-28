import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

import File from '../file/file'
import axiosBackend from '../../__data__/axios'

const useStyles = makeStyles((theme) => ({

}))

const renderFiles = (file, root) => {
    return file.type === 'd' ? <Dirr
        dirrData={file}
        root={root}
    /> : <File fileData={file} root={root} />
}

const Dirr = ({ dirrData, root }) => {
    const classes = useStyles()
    const { name } = dirrData
    const [isCollapse, toggleCollapse] = useState(false)
    const [filesList, setList] = useState([])

    const handleDirrOnClick = () => {
        toggleCollapse(!isCollapse)
        axiosBackend.get(`/list?root=${name}`).then((response) => {
            setList(response.data.list)
        })
    }

    return (
        <Typography
            variant="body2"
            className={classes.file}
            onClick={handleDirrOnClick}
        >
            {name}
            {isCollapse && filesList && filesList.length > 0 &&
                <ul>
                    {filesList?.map((file) => <li key={file.name}>{renderFiles(file)}</li>)}
                </ul>
            }
        </Typography>
    )
}

Dirr.propTypes = {
    dirrData: PropTypes.object.isRequired,
    root: PropTypes.string.isRequired,
}

export default Dirr
