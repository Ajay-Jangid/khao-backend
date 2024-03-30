import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Post('/getUpdatedRestaurantsList')
    async getUpdatedRestaurantsList(@Body() body: any) {
        return await this.dataService.getUpdatedRestaurantsList(body);
    }
}
