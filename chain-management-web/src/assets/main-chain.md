# 跨链功能说明及API接口
更新时间 2021-4-14 17:15:01

本文将阐述跨链功能的技术实现及使用方法。

### 目录
***
### 1.功能说明
### 2.快速开始
### 3.API文档
***

## 1.功能说明
本功能的时序图如下图所示。

![测试](./1.jpg)

### 1.1 跨链功能时序图
```
1.应用A将业务数据写入子链A

2.子链A返回txHashA

3.应用A调用接口将业务数据的hash及txHash写入主链

4.应用B通过WebSocket订阅业务数据变化，当有业务新增或变动的时候，主链推送变化给应用B

5.应用B处理业务，并将处理结果写入子链B

6.子链B返回txHashB

7.应用B调用接口将处理结果数据的Hash及txHashB写入主链
```

### 1.2 跨链数据交互时序图
从1.1中可以看到，业务数据本身是存储在应用子链上的，当需要获取业务数据时，我们通过如下流程获取
```
1.应用收到通知，有一个新的业务变动，于是以这次业务变动对应的主链交易Hash为参数，请求主链获取业务数据

2.主链通过主链交易hash找到对应的子链的交易hash、对应上链应用的数据获取API地址，朝数据上链方(图中假设为应用B)请求数据

3.应用B通过交易hash查询子链B，获取写入的业务数据

4.子链B返回业务数据给应用B

5.应用B返回业务数据给主链

6.主链返回业务数据给应用A
```

## 2.快速开始

### 2.1 创建跨链通道
跨链通道对应主链上的一个智能合约，创建跨链通道即在主链上部署一个智能合约。您和您的业务关联方的上链数据都会记录在此合约中。

### 2.2 添加跨链通道成员
在跨链通道列表中，选择对应的跨链通道，点击“成员”按钮，即可添加成员。添加成员的三个参数含义如下。
```
成员名称：成员的名称备注
成员账号：成员在平台的登录账号
获取数据URL：成员应该提供一个接口，用于主链去获取业务数据。
```

### 2.3 创建交易
我们以图书借还业务来描述整个交易流程。
应用调用API，针对某个具体的业务，创建一个交易，开始一个业务流程。

此处业务是图书借还，那么创建一个交易，借走一本书。

### 2.4 监听交易
应用B通过WebSocket订阅跨链通道事件。即图书馆收到借书事件

### 2.5 获取业务数据
应用B通过事件在主链的交易hash，调用接口查询业务数据。即查询谁借走了书，借走了哪本书，预期什么时候归还。

### 2.6 更新业务数据
应用B获取到业务数据后，对业务数据进行处理，将处理结果写入子链B。随后将子链的交易Hash和业务处理结果数据hash写入主链

## 3.API文档
### 3.1 登录

**请求**

url: /user/loginApi

method: POST

header:
```
    Content-Type:application/json
```

body:

| 名称        | 类型     | 是否必选 | 示例值      | 描述               |
| --------- | ------ | ---- | -------- | ---------------- |
| nick_name | string | 是    | test     | 账号名 IID公钥加密      |
| pwd       | string | 是    | password | 账号密码 IID公钥加密     |
| iid       | String | 是    | iid      | IID  用于校验第三方用户身份 |

返回**

```
{
    "success": true,
    "msg": "登录成功",
    "data": "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJpc3MiOiJxdWFsaXR5Y2hhaW4iLCJhdWQiOiJ7XCJ1Y29kZVwiOlwiXCIsXCJ1aWRcIjpcIjIwMjEwNDEyMTU0NzM3MzM3NDUxMjc0XCIsXCJ1bmFtZVwiOlwibHl4NDEyXCJ9Iiwic3ViIjoib3QiLCJuYmYiOjE2MTgzODMwMjksImlhdCI6MTYxODM4MzAyOSwiZXhwIjoxNjE4Mzk3NDI5fQ.4pPbARDVKfO6P2S_IapIIN2uciqFusbLGfQreQo6Ne8"
}
```
其中data中的串为token，后续请求都需要添加到header中

### 3.2 创建交易

**请求**

url: /crossChannel/createBusiness

method: POST

header:
```
    Content-Type:application/json
    Authorization: {{token}}
```

body:

| 名称         | 类型      | 是否必选 | 示例值  | 描述     |
| ---------- | ------- | ---- | ---- | ------ |
| channel_id | integer | 是    | 1    | 跨链通道id |
|  data_hash  | string  |  是  | e10adc3949ba59abbe56e057f20f883e  |写入子链的业务数据hash。业务数据要求必须为json格式，data_hash为业务数据转json字符串之后的32位md5值
|  tx_hash_on_sub_chain  | string  |  是  | password  |业务数据写入子链的交易hash|

**返回**
```
{
    "success": true,
    "msg": "创建成功",
    "data": {}
}
```

### 3.3 更新交易

**请求**

url: /crossChannel/updateBusiness

method: POST

header:
```
    Content-Type:application/json
    Authorization: {{token}}
```

body:

| 名称          | 类型      | 是否必选 | 示例值  | 描述     |
| ----------- | ------- | ---- | ---- | ------ |
| channel_id  | integer | 是    | 1    | 跨链通道id |
| business_id | integer | 是    | 1    | 交易id   |
|  data_hash  | string  |  是  | e10adc3949ba59abbe56e057f20f883e  |写入子链的业务数据hash。业务数据要求必须为json格式，data_hash为业务数据转json字符串之后的32位md5值
|  tx_hash_on_sub_chain  | string  |  是  | password  |业务数据写入子链的交易hash|

**返回**
```
{
    "success": true,
    "msg": "创建成功",
    "data": {}
}
```

### 3.4 通过WebSocket监听交易

#### 3.4.1 建立连接
```
url: /wsCrossChannel/{nickname}/{password}
请将账号名与密码置于连接请求url中
```

#### 3.4.2 心跳保持
默认心跳超时为90s，请定时发送心跳消息"ping"到服务器

#### 3.4.3 事件消息
当用户所在的跨链通道有新的消息时，服务器会下发如下消息

| 名称                   | 类型      | 是否必选 | 示例值  | 描述              |
| -------------------- | ------- | ---- | ---- | --------------- |
| tx_hash_of_main      | string  | 是    |      | 主链交易hash        |
| contract_address     | string  | 是    |      | 跨链通道合约地址        |
| business_id          | integer | 是    |      | 交易ID，业务流程唯一标识   |
| operator             | string  | 是    |      | 操作者在主链的账户地址     |
| data_hash            | string  | 是    |      | 业务数据hash        |
| tx_hash_on_sub_chain | string  | 是    |      | 业务数据写入子链的交易hash |
| event_time           | string  | 是    |      | 事件时间            |

消息示例
```
{
    "business_id": 2,
    "data_hash": "data_hash-2021-4-15 10:53:22",
    "tx_hash_of_main": "0x44ab44c09c67ff1275e301e6aca60658e2b8715475f28048f1f03f272aca41fe",
    "tx_hash_on_sub_chain": "data_hash-2021年4月15日10:53:27",
    "contract_address": "0xaf54b8a3732c90b81efe38e017bd270d66ed521e",
    "operator": "0x6ad72c5ef13b7d32abeb5f3cd8e2ba20fabd8f09",
    "event_time": "2021-04-15 10:53:45"
}
```

### 3.5 获取交易数据
**请求**

url: /crossChannel/getBusinessData

method: POST

header:
```
    Content-Type:application/json
    Authorization: {{token}}
```

body:

| 名称              | 类型     | 是否必选 | 示例值  | 描述       |
| --------------- | ------ | ---- | ---- | -------- |
| tx_hash_of_main | string | 是    |      | 主链交易hash |

**返回**
```
{
    "success": true,
    "msg": "获取成功",
    "data": {
        "business_data":{businessData}
    }
}
```

### 3.6 获取子链数据接口
您应当提供一个接口, 供主链调用，获取给定子链交易hash所存储的业务数据

**请求**

url: 创建跨链通道或者添加跨链通道成员时所填写的url地址

method: POST

header:
```
    Content-Type:application/json
```

body:

| 名称      | 类型     | 是否必选 | 示例值  | 描述     |
| ------- | ------ | ---- | ---- | ------ |
| tx_hash | string | 是    |      | 交易hash |

**返回**
```
{
    "success": true,
    "msg": "获取成功",
    "data": {
        "business_data":{businessData}
    }
}
```
