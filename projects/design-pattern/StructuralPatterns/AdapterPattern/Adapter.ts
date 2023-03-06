/**
 * 适配器模式
 * 优点：1.通过引入适配器类来重用现有的适配者类，无需修改旧代码逻辑 2.将实现封装在了适配器里，调用者无需关心内部实现 3.可拓展性高
 * 缺点：增加了代码复杂度，需要额外定义一系列的类和接口。如果涉及改动不多时完全可以直接修改旧逻辑
 */

interface Logger {
  info(message: string): Promise<void>
}

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>
}

class FileLogger implements Logger {
  public async info(message: string): Promise<void> {
    console.info(message)
    console.info('This Message was saved with FileLogger')
  }
}

class AliLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message, type)
    console.info('This Message was saved with AliLogger')
  }
}

class CloudLoggerAdapter implements Logger {
  protected cloudLogger: CloudLogger

  constructor(cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info')
  }
}

class NotificationService {
  protected logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  public async send(message: string): Promise<void> {
    await this.logger.info(`Notification sended: ${message}`)
  }
}

/**
 * 最开始使用FileLogger进行日志发送，但后来需要使用AliLogger来发送，两个实例的方法名和入参都不相同
 * 为了不修改旧代码逻辑，可以使用适配器模式
 */
(async () => {
  const fileLogger = new FileLogger()
  const notificationService = new NotificationService(fileLogger)
  await notificationService.send('can not read property of undefined')
})();

(async () => {
  const aliLogger = new AliLogger()
  const cloudLoggerAdapter = new CloudLoggerAdapter(aliLogger)
  const notificationService = new NotificationService(cloudLoggerAdapter)
  await notificationService.send('can not read property of undefined')
})()

/***************************************************************************/

const sumV1 = (num1: number, num2: number) => {
  console.log(num1 + num2)
}

const sumV2 = (arr: number[]) => {
  console.log(arr.reduce((prev, curr) => {
    return prev + curr
  }))
}

const sumAdapter = (...args: any[]) => {
  if (Object.prototype.toString.call(args[0]) === '[object Number]')
    return sumV1(args[0], args[1])
  else if (Object.prototype.toString.call(args[0]) === '[object Array]')
    return sumV2(args[0])
  else
    throw new Error('unexpected parameters')
}

sumAdapter(1, 2)
sumAdapter([1, 2, 3])
