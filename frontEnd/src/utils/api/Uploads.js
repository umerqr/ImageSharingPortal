import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const THIRD_INDEX = 2

const start = async (fileType, s3Key, accountId, conceptId=undefined) => {
    return await axios({
        method: `post`,
        url: `${BASE_URL}/api/${accountId}/content/start`,
        params: {
            fileType,
            s3Key,
            conceptId,
        },
    })
}

const complete = async (objKey, accountId, conceptId=undefined) => {
    return await axios({
        method: `patch`,
        url: `${BASE_URL}/api/${accountId}/content/update_status`,
        data: {
            label: conceptId ? `Concept` : objKey.split(`/`)[THIRD_INDEX] === `csv` ? `Document` : `Content`,
            s3Key: objKey,
            status: `upload complete`,
        },
    })
}

const pending = async (params, accountId) => {
    return await axios({
        method: `post`,
        url: `${BASE_URL}/api/${accountId}/content/pending`,
        params: params,
    })
}

const getContentStatus = async (accountId) => {
    return await axios({
        method: `get`,
        url: `${BASE_URL}/api/${accountId}/content/status`,
    })
}

const deleteContent = async (nodeId, accountId, label, s3Key) => {
    return await axios({
        method: `delete`,
        url: `${BASE_URL}/api/${accountId}/content/delete`,
        params: {
            nodeId: nodeId,
            nodeLabel: label,
            s3Key: s3Key,
        },
    })
}

const abortUpload = async (name, uploadId, accountId) => {
    return await axios({
        method: `post`,
        url: `${BASE_URL}/api/${accountId}/content/abort_upload`,
        params: {
            fileName: name,
            uploadId: uploadId,
        },
    })
}

const getCount = async (accountId) => {
    return await axios({
        method: `get`,
        url: `${BASE_URL}/api/${accountId}/content/status_count`,
    })
}

export default {
    abortUpload,
    start,
    complete,
    pending,
    getContentStatus,
    getCount,
    deleteContent,
}
