import http from '../request';

export function getTableData(data: object) {
    return http({
        method: "get",
        url: "/getTableData",
        data,
        headers: {
            kkk: 123,
            uuu: 456,
            userId: 123456789
        }
    })
}

export function getTotalCount(data: object) {
    return http({
        method: "get",
        url: "/getTotalCount",
        data
    })
}