const fs = require('fs')
const path = require('path')
const { Readable } = require('stream');

const router = require('express').Router()

const { connect, ftpClient } = require('../ftp')

const getList = (res, root = '/') => {
    return ftpClient.list(root, (err, list) => {
        res.json({
            list
        })
    })
}

router
    .post('/auth', (req, res) => {
        const { login, password } = req.body
        try {
            connect(login, password)
            console.log('ftpClient', ftpClient)
            ftpClient.list((err, list) => {
                if (err) {
                    res.json({
                        code: 2,
                        message: 'Error getting data',
                        error: err
                    })
                    return
                }
                res.json({
                    message: 'Connection success',
                    code: 1,
                    list
                })
            })
        } catch (e) {
            console.error('Connection FTP error', e)
            res.json({
                message: 'Connection failed',
                error: e
            })
        }
    })
    .get('/file/:name', (req, res) => {
        const { name } = req.params
        try {
            ftpClient.get(name, (err, stream) => {
                if (err) throw err
                stream.once('close', () => { ftpClient.end() })
                stream.pipe(res)
            })
        } catch (e) {
            console.error('Getting file error', e)
        }
    })
    .post('/mkdir', (req, res) => {
        const { dirPath } = req.body
        ftpClient.mkdir(dirPath, false, () => {
            getList(res)
        })
    })
    .post('/rmdir', (req, res) => {
        const { dirPath } = req.body
        console.log('dirPath', dirPath)
        ftpClient.rmdir(dirPath, true, () => {
            getList(res)
        })
    })
    .post('/send', (req, res) => {
        const { data: { name, contentType, data }, addPath } = req.body
        const buffer = Buffer.from(data, 'base64')
        const readableInstanceStream = new Readable({
            read() {
                this.push(buffer)
                this.push(null)
            }
        })
        try {
            ftpClient.put(readableInstanceStream, `${addPath}/${name}`, (err) => {
                console.error('Sending file error: ', err)
                res.json({
                    message: 'file upload'
                })
            })
        } catch (e) {
            console.error('Sending file error: ', e)
        }
    })
    .get('/list', (req, res) => {
        const { root } = req.query
        getList(res, root)
    })

module.exports = router
