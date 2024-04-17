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

    @Get('/getDishes')
    async getDishes() {
        return await this.dataService.getDishes();
    }

    @Get('/getDish/:collection_id/:tags')
    async getDish(@Param('collection_id') collection_id: any, @Param('tags') tags: any) {
        console.log(collection_id, tags)
        return await this.dataService.getDish(collection_id, tags);
    }

    @Post('/getUpdatedRestaurantsList')
    async getUpdatedRestaurantsList(@Body() body: any) {
        console.log(body.nextOffset)
        return await this.dataService.getUpdatedRestaurantsList(body);
    }
}
