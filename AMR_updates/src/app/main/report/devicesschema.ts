export interface Devices {
    _id: string,
    utilityData: {
        lastunits: number,
        currentUnits: number,
        lastUpdate: string
    },
    deviceInfo: {
        serialNum: string,
        deviceName: string,
        deviceMake: string
    },
    __v: number
}

export interface MonthlyData {
    _id: string,
    name : string,
    value : number,
    dateTo : string,
}