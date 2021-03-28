import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import { renderFiles } from '../../../utils'
import axiosBackend from '../../../__data__/axios'

const useStyles = makeStyles((theme) => ({
    container: {
        width: '50%',
        padding: theme.spacing(4),
        '& > *': {
            marginBottom: theme.spacing(2)
        }
    }
}))

const Content = ({ user, list }) => {
    const classes = useStyles()
    const [updateList, update] = useState()
    const [filesList, setList] = useState(list)
    const [inputValue, setValue] = useState('')

    const handleInputOnChange = (e) => {
        setValue({
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axiosBackend.get('/list').then((response) => {
            setList(response.data.list)
        })
    }, [updateList])

    const handleAddDirrClick = () => {
        axiosBackend.post('/mkdir', { dirPath: inputValue.new }).then((response) => {
            setValue('')
        })
    }

    const handleRemoveDirrClick = () => {
        axiosBackend.post('/rmdir', { dirPath: inputValue.remove }).then((response) => {
            console.log('response', response)
            setValue('')
        })
    }

    const handleFileUpload = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.addEventListener('load', (event) => {
            const base64Data = event.target.result
            const rawBase64Data = base64Data.slice(base64Data.indexOf(',') + 1)
            const reqData = {
                name: file.name,
                contentType: file.type,
                data: rawBase64Data
            }
            axiosBackend.post('/send', { data: reqData, addPath: inputValue.add }).then((response) => {
                update(response.data.message)
            })
        })
    }

    return (
        <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
        >
            <ul>
                {filesList.map((file) => <li>{renderFiles(file, '/')}</li>)}
            </ul>
            <input
                type="text"
                name="add"
                placeholder="Путь добавления файла"
                onChange={handleInputOnChange}
                value={inputValue.add || ''}
            />
            <input
                type="file"
                onChange={handleFileUpload}
            />
            {user === 'admin' &&
                <>
                    <input
                        type="text"
                        name="new"
                        placeholder="Новая директория"
                        onChange={handleInputOnChange}
                        value={inputValue.new || ''}
                    />
                    <Button
                        onClick={handleAddDirrClick}
                        variant="contained"
                        color="primary"
                    >
                        Добавить дирректорию
                    </Button>
                    <input
                        type="text"
                        name="remove"
                        placeholder="Удалить директорию"
                        onChange={handleInputOnChange}
                        value={inputValue.remove || ''}
                    />
                    <Button
                        onClick={handleRemoveDirrClick}
                        variant="contained"
                        color="secondary"
                    >
                        Удалить дирректорию
                    </Button>
                </>
                }
            <Button
                component={RouterLink}
                variant="contained"
                color="primary"
                to="/auth"
            >
                Выйти
            </Button>
        </Box>
    )
}

Content.propTypes = {
    user: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
}

export default Content
