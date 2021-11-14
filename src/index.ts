import './unhandled-error-handling'
import log from './log'
import envVar from './env'
import { SetDatapoint } from './localapiclient'

log.info('App started')
;(async () => {
  const sysap = '00000000-0000-0000-0000-000000000000'
  const deviceid = 'ABB700D5D898'
  const channel = 'ch0006'
  const datapoint = 'idp0000'
  await SetDatapoint(
    {
      baseUrl: String(envVar('LOCALAPI_BASEURL')),
      user: String(envVar('LOCALAPI_USERNAME')),
      password: String(envVar('LOCALAPI_PASSWORD')),
    },
    { sysapUUID: sysap, deviceId: deviceid, channel, datapoint },
    '0',
  )
})()
