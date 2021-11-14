import { Readable } from 'stream'
import axios, { AxiosResponse } from 'axios'
import log from './log'

export interface SysApConnection {
  baseUrl: string
  user: string
  password: string
}

const authHeader = (conn: SysApConnection) => `Basic ${Buffer.from(`${conn.user}:${conn.password}`).toString('base64')}`

export interface DatapointRequest {
  sysapUUID: string
  deviceId: string
  channel: string
  datapoint: string
}

export const SetDatapoint = async (
  conn: SysApConnection,
  request: DatapointRequest,
  value: string | Buffer | ArrayBuffer | Readable,
) => {
  const requestUrl = `${conn.baseUrl}/fhapi/v1/api/rest/datapoint/${request.sysapUUID}/${request.deviceId}.${request.channel}.${request.datapoint}`

  log.debug(`Setting datapoint`, {
    device: request.deviceId,
    channel: request.channel,
    datapoint: request.datapoint,
    value,
  })
  const response = await axios
    .put(requestUrl, value, {
      headers: {
        Authorization: authHeader(conn),
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error) => {
      log.error(`Request failed`, { error })
    })

  log.debug('Response', { response })
}
