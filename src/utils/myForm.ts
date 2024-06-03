// 生成随机的十六进制颜色码
export const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 不需要传递参数的接口函数
export const getSelectData = () => {
    return new Promise((resolve, reject) => {
        resolve([
            { la: '采购', va: 'buy' },
            { la: '敲代码', va: 'code' },
            { la: '做PTT', va: 'ppt' },
        ])
    })
}

export const getSelectData2 = () => {
    return new Promise((resolve, reject) => {
        resolve([
            { label: '采购', value: 'buy' },
            { label: '敲代码', value: 'code' },
            { label: '做PTT', value: 'ppt' },
        ])
    })
}

export const getSelectData3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { label: '考公', value: '考公' },
                { label: '考研', value: '考研' },
                { label: '出国留学', value: '出国留学' },
                { label: '出门打工', value: '出门打工' },
            ])
        }, 500);
    })
}

// 需要传递参数的接口函数
export const getSelectDataNeedParams = (type: string) => {
    return new Promise((resolve, reject) => {
        const Dict: { [key: string]: { label: string; value: string; }[] } = {
            'car': [
                { label: '奔驰', value: 'benchi' },
                { label: '宝马', value: 'baoma' },
                { label: '奥迪', value: 'aodi' },
            ],
            'food': [
                { label: '沙县小吃', value: 'shaxian' },
                { label: '兰州拉面', value: 'lanzhou' },
                { label: '云南过桥米线', value: 'yunnan' },
            ],
        }
        resolve(Dict[type])
    })
}