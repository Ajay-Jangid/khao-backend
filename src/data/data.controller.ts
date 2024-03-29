import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) { }

    @Get('/getRestaurantsList')
    async getRestaurantsList() {
        return await this.dataService.getRestaurantsList();
    }

    @Get('/getRestaurantMenu/:id')
    async getRestaurantMenu(@Param('id') resId: any) {
        return await this.dataService.getRestaurantMenu(+resId);
    }

}
