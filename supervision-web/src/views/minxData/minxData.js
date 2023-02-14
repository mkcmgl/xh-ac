export const minxData = {
    data() {
        return {
            industryTypeList: [
                { lable: '农、林、牧、渔业', value: 'A' },
                { lable: '采矿业', value: 'B' },
                { lable: '制造业', value: 'C' },
                { lable: '电力、热力、燃气及水生产和供应业', value: 'D' },
                { lable: '建筑业', value: 'E' },
                { lable: '批发和零售业', value: 'F' },
                { lable: '交通运输、仓储和邮政业', value: 'G' },
                { lable: '住宿和餐饮业住宿和餐饮业', value: 'H' },
                { lable: '信息传输、软件和信息技术服务业', value: 'I' },
                { lable: '金融业', value: 'J' },
                { lable: '房地产业', value: 'K' },
                { lable: '租赁和商务服务业', value: 'L' },
                { lable: '科学研究和技术服务业', value: 'M' },
                { lable: '水利、环境和公共设施管理业', value: 'N' },
                { lable: '居民服务、修理和其他服务业', value: 'O' },
                { lable: '教育', value: 'P' },
                { lable: '卫生和社会工作', value: 'Q' },
                { lable: '文化、体育和娱乐业', value: 'R' },
                { lable: '公共管理、社会保障和社会组织', value: 'S' },
                { lable: '国际组织', value: 'Y' },
            ],
            chainArchType: [
                { lable: 'BIF-CORE', value: '10000' },
                { lable: 'Fabric', value: '10001' },
                { lable: 'Ethereum', value: '10002' },
                { lable: 'BubiChain', value: '10003' },
                { lable: 'Quorum', value: '10004' },
                { lable: 'Xuperchain', value: '10005' },
                { lable: 'cita', value: '10006' },
                { lable: 'FISCO', value: '10007' },
                { lable: '其他', value: '10008' },
            ],
            //应用方向
            applicationDirection: [
                { lable: '互联网', value: '互联网' },
                { lable: '教育', value: '教育' },
                { lable: '养老', value: '养老' },
            ],
            //节点类型
            nodeType: [
                { lable: '业务节点', value: '0' },
            ],
            //服务器类型:
            serverType: [
                { lable: '自建服务器', value: '0' },
                { lable: '云服务', value: '1' },
            ],
            //云类型
            cloudType: [
                { lable: '非公有云', value: '0' },
                { lable: '阿里云', value: '1' },
                { lable: '百度云', value: '2' },
                { lable: '金山云', value: '3' },
                { lable: '华为云', value: '4' },
                { lable: '亚马逊云', value: '5' },
                { lable: '微软云', value: '6' },
                { lable: '腾讯云', value: '7' },
                { lable: '京东云', value: '8' },
                { lable: '物理机', value: '9' },
                { lable: '其他云', value: '100' },
            ],
            authType:[
                {text:'企业用户',value:102},
                {text:'个人用户',value:101}
            ],
            //合约版本
            contractType:[
                {
                    lable:'普通合约',
                    value:'0'
                },
                {
                    lable:'主子链管理系统合约',
                    value:'1'
                },
                {
                    lable:'DPOS系统合约',
                    value:'2'
                },
                {
                    lable:'部署系统合约',
                    value:'3'
                },{
                    lable:'认证系统合约',
                    value:'4'
                }
                ,{
                    lable:'隐私保护系统合约',
                    value:'5'
                },
                {
                    lable:'跨链系统合约',
                    value:'6'
                },
                {
                    lable:'BID注册合约',
                    value:'7'
                }
            ],
        }
    }
}