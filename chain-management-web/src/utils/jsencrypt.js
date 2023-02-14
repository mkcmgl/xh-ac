import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDpNzL35EmZO0Iy4m9soGS205uT\n' +
  'hJrx6L5sul+xthDf+K4DbaXda+wVBWQmNSgFhILcme6czWSex6uHZqkpsDgk4Whf\n' +
  'STFB98WY7M26DkoTBqQDu6xvHX1VCz3LFUr8q186dKp3QOpXYtp/4K+bYnkQkk8o\n' +
  'dutT8RzoFJmVTMzxTwIDAQAB'

const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOk3MvfkSZk7QjLi\n' +
  'b2ygZLbTm5OEmvHovmy6X7G2EN/4rgNtpd1r7BUFZCY1KAWEgtyZ7pzNZJ7Hq4dm\n' +
  'qSmwOCThaF9JMUH3xZjszboOShMGpAO7rG8dfVULPcsVSvyrXzp0qndA6ldi2n/g\n' +
  'r5tieRCSTyh261PxHOgUmZVMzPFPAgMBAAECgYAXkly0cX5+3l5yhjB86jlDwV+Y\n' +
  'KW7/xGZ61tuVOrG58YilEBATsTTLayAUPIsvA5W2dliHwLrK0aOkq9utOwJxhm64\n' +
  'zroVavhqB8vLlWsvwyE8CTz1wqcUJoOYkNRZkIn0pJAuIlcVfzGQzoRw3tr4rGWv\n' +
  'hE0Bg7r1ijRRqjK2AQJBAPof+8GssH+QSIISHC6rnDUm5i3WSnwt9Mmk7ayzBChi\n' +
  'koYGkJa8mJ6Nc05fJc1z2loid4xyo+F74zGfj18z5ccCQQDusYn3VC0Zru/x7ZKy\n' +
  'N53XA/MZ2yDvWGNw6UlzOZQmGOZxi65L/JeRUp1DlICVzKZ5yKzR3xw+wqukwofX\n' +
  'Kvg5AkBpUUxFSXxrygnt0shREmtMqhtjk4Z7cTJQMYTuIdaPVqoRivQYtEKjCDZT\n' +
  '+pZFQxHewAKMfbzpdau9Ok05LfYDAkEAu8Ma1Vz48UgkZbnNeLW5SudHdyJhwQVV\n' +
  'i/9nEOXNPT6/H7iSDiIPlHhZT0zk7XGDzy7li14nWNNHtB52PvMFOQJAYuBqHwOq\n' +
  'plVxEi9BNs5HrIoTQTI5XRKe0RphhUxNco+dClgMtK66774rv8YDnOrjf4e5ak3V\n' +
  'MBq9ckhosp1LJA=='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

