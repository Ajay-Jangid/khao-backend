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
        console.log(collection_id,tags)
        return await this.dataService.getDish(collection_id, tags);
    }

    @Get('/getUpdatedRestaurantsList/:pageOffSet/:collectionV5RestaurantListWidget_SimRestoRelevance_food_seo')
    async getUpdatedRestaurantsList(@Param('pageOffSet') pageOffSet: any, @Param('collectionV5RestaurantListWidget_SimRestoRelevance_food_seo') collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: any) {
        return await this.dataService.getUpdatedRestaurantsList(pageOffSet, collectionV5RestaurantListWidget_SimRestoRelevance_food_seo);
    }
}
