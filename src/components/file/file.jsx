import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

import axiosBackend from '../../__data__/axios'

const useStyles = makeStyles((theme) => ({
    
}))

const File = ({ fileData, root }) => {
    const classes = useStyles()
    const { name } = fileData

    const handleFileOnClick = (e) => {
        // e.preventDefault()
        axiosBackend
            .get(`/file/${name}`)
            .then((response) => {
                const file = new Blob(
                    [response.data],
                    { type: 'text/plain;charset=utf-8' }
                )
                const fileURL = URL.createObjectURL(file)
                window.open(fileURL)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    console.log('name', name)
    return (
        // <a
        //     href={`.\\src\\__data__\\files\\${name}`}
        //     //onClick={handleFileOnClick}
        //     download
        // >
        //     {name}
        // </a>
        <Typography
            variant="body2"
            className={classes.file}
            onClick={handleFileOnClick}
        >
            {name}
        </Typography>
    )
}

File.propTypes = {
    fileData: PropTypes.object.isRequired,
    root: PropTypes.string.isRequired,
}

export default File
