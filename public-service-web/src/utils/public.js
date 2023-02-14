import Vue from "vue"
import { getToken } from '@/utils/auth';
import axios from 'axios';
export function changeTypeName(item) {
    let typeNumberList = item.typeId.split(',')
    let typeName = ''
    typeNumberList.map(item => {
        switch (item) {
            case '1':
                typeName = typeName + '数字化资产  '
                break;
            case '2':
                typeName = typeName + '供应链管理  '
                break;
            case '3':
                typeName = typeName + '供应链金融  '
                break;
            case '4':
                typeName = typeName + '电子政务  '
                break;
            case '5':
                typeName = typeName + '防伪朔源  '
                break;
            case '6':
                typeName = typeName + '采购招标  '
                break;
            case '7':
                typeName = typeName + '公益慈善  '
                break;
            case '8':
                typeName = typeName + '版权保护  '
                break;
            case '9':
                typeName = typeName + '电子存证  '
                break;
            case '10':
                typeName = typeName + '工具  '
                break;
            case '11':
                typeName = typeName + '医疗健康  '
                break;
            case '12':
                typeName = typeName + '其他  '
                break;
        }
    })
    return typeName
}


//获取图标
export function loadFile(data) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: process.env.VUE_APP_BASE_API + 'publicService/v1/getIconOrImage',
            responseType: 'blob',
            data,
            headers: {
                Accept: 'application/octet-stream',
                Authorization: 'Bearer ' + getToken(),   // 获取token
            },
        }).then(res => {
            let blob = new Blob([res.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            resolve(imageUrl)
        }).catch(err => {
            reject(error)
        })
    })

}
//判断文件类型
export function judgeType(type) {
    let flag = false
    if (type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png') {
        flag = true
    }
    return flag
}