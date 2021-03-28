import React from 'react'

import Dirr from '../components/dirr/dirr'
import File from '../components/file/file'

export const renderFiles = (file, root) => {
    return file.type === 'd' ? <Dirr dirrData={file} root={root} /> : <File fileData={file} root={root} />
}
