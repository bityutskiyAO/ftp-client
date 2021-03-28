import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { useFormik, Form } from 'formik'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router'

import axiosBackend from '../../__data__/axios'

const useStyles = makeStyles((theme) => ({
    paper: {
        maxHeight: 484,
        maxWidth: 592,
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: theme.spacing(4)
    },
    typographyDescription: {
        margin: theme.spacing(1, 0, 3)
    },
    form: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textFieldPassword: {
        margin: theme.spacing(6.5, 0, 8)
    },
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.GRAY.gray0
    }
}))

const Auth = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validateOnChange: true,
        onSubmit: (values) => {
            axiosBackend.post('/auth', values).then((response) => {
                console.log(response.data)
                history.push(`/main/${values.login}`, response.data.list)
            }).catch((error) => {
                console.error('ERROR: ', error.data)
            })
        }
    })
    return (
        <Box
            className={classes.container}
        >
            <Paper
                elevation={25}
                className={classes.paper}
            >
                <Typography
                    variant="h3"
                >
                    Авторизация на файловом сервере
                </Typography>
                <form
                    onSubmit={formik.handleSubmit}
                    className={classes.form}
                >
                    <TextField
                        fullWidth
                        id="login"
                        name="login"
                        placeholder="Логин"
                        variant="outlined"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        placeholder="Введите пароль"
                        type="password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={classes.textFieldPassword}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        Подтвердить
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}

Auth.propTypes = {

}

export default Auth
