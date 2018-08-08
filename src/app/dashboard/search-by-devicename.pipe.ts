import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchByName' })
export class SearchByNamePipe implements PipeTransform {
    transform(devices, searchText: string) {
        console.log('Inside search', devices)
        return devices.filter(device => device.deviceInfo.deviceName.indexOf(searchText) !== -1);
    }
}