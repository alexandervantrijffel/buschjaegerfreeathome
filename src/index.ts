import './unhandled-error-handling'
import { Command } from 'commander'
import log from './log'
import envVar from './env'
import { ListDevices, SetDatapoint, MapChannels } from './localapiclient'

const program = new Command()

const sysap = '00000000-0000-0000-0000-000000000000'
const conn = {
  baseUrl: String(envVar('LOCALAPI_BASEURL')),
  user: String(envVar('LOCALAPI_USERNAME')),
  password: String(envVar('LOCALAPI_PASSWORD')),
}
program
  .command('devices')
  .description('list Busch Jaeger devices')
  .option('-s, --search <search>', 'search filter')
  .action(async (options) => {
    const devices = await ListDevices(conn, options.search)
    if (!devices?.length) {
      log.info('No devices found')
      return
    }
    log.debug('Devices', { devices: MapChannels(devices) })
  })

const datapoint = program.command('datapoint')

datapoint
  .command('set')
  .description('Set datapoint value')
  .action(async () => {
    const deviceid = 'ABB700D5D898'
    const channel = 'ch0006'
    const datapoint = 'idp0000'
    await SetDatapoint(conn, { sysapUUID: sysap, deviceId: deviceid, channel, datapoint }, '0')
  })
program.parse()
