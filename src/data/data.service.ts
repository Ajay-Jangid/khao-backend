import { Injectable } from '@nestjs/common';
const axios = require('axios');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

@Injectable()
export class DataService {

    async getRestaurantsList() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Cookie': '__SW=3SBBDKYRxgTMmaD--G-yBkSeRj57YXDj; _device_id=3b7753f0-55b0-0681-f706-f65c83e4a177; _guest_tid=cb7241ad-c107-49bd-8590-77263fe6263e; _is_logged_in=; _sid=cz6abb77-21a2-48f1-9361-6466c85161c0'
            }
        };

        const response = await axios.request(config);
        const nextPageOffSet = response.data?.data?.pageOffset
        const restaurants = response.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants

        return { pageOffSet: nextPageOffSet, restaurants };

    }

    async getRestaurantMenu(resId) {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=' + resId,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Cookie': '__SW=3SBBDKYRxgTMmaD--G-yBkSeRj57YXDj; _device_id=3b7753f0-55b0-0681-f706-f65c83e4a177; _guest_tid=cb7241ad-c107-49bd-8590-77263fe6263e; _is_logged_in=; _sid=cz6abb77-21a2-48f1-9361-6466c85161c0'
            },
            data: data
        };

        const response = await axios.request(config);

        return response.data;

    }

    async getUpdatedRestaurantsList(pageOffSet: any) {
        try {
            let data = JSON.stringify({
                "lat": 12.9351929,
                "lng": 77.62448069999999,
                "nextOffset": pageOffSet.nextOffset,
                "widgetOffset": pageOffSet.widgetOffset,
                "filters": {},
                "seoParams": {
                    "seoUrl": "https://www.swiggy.com/",
                    "pageType": "FOOD_HOMEPAGE",
                    "apiName": "FoodHomePage"
                },
                "page_type": "DESKTOP_WEB_LISTING",
                "_csrf": "kroaj3xk3ceD-J6S2H2j2hh9vrVRI2Bn3hllGW_A"
            });
            // let data = JSON.stringify({
            //     "lat": 12.9351929,
            //     "lng": 77.62448069999999,
            //     "nextOffset": "COVCELQ4KIDYy9jR45uIOTCnEzgD",
            //     "widgetOffset": {
            //         "NewListingView_category_bar_chicletranking_TwoRows": "",
            //         "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
            //         "Restaurant_Group_WebView_SEO_PB_Theme": "",
            //         "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": "25",
            //         "inlineFacetFilter": "",
            //         "restaurantCountWidget": ""
            //     },
            //     "filters": {},
            //     "seoParams": {
            //         "seoUrl": "https://www.swiggy.com/",
            //         "pageType": "FOOD_HOMEPAGE",
            //         "apiName": "FoodHomePage"
            //     },
            //     "page_type": "DESKTOP_WEB_LISTING",
            //     "_csrf": "kroaj3xk3ceD-J6S2H2j2hh9vrVRI2Bn3hllGW_A"
            // });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://www.swiggy.com/dapi/restaurants/list/update',
                headers: {
                    // 'Cookie': ' __SW=6mrQYxn1T-Hhv2lHd9JPZKSuQFb9-mrj; _device_id=3b7753f0-55b0-0681-f706-f65c83e4a177; fontsLoaded=1; _gcl_au=1.1.720432226.1711452382; _swuid=3b7753f0-55b0-0681-f706-f65c83e4a177; _guest_tid=7b53deb3-6218-4fce-86c7-6bbf8a842187; _sid=cz54b2e2-9789-4bf9-b1a9-690d26af60a6; _gid=GA1.2.408453080.1711711846; dadl=true; AMP_TOKEN=%24NOT_FOUND; _ga_X3K3CELKLV=GS1.1.1711711859.2.1.1711712189.0.0.0; userLocation={%22lat%22:12.9351929%2C%22lng%22:77.62448069999999%2C%22address%22:%22Koramangala%2C%20Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga=GA1.2.1925400972.1711452382; _gat_0=1; _ga_34JYJ0BCRN=GS1.1.1711711845.2.1.1711712311.0.0.0; _device_id=3b7753f0-55b0-0681-f706-f65c83e4a177',
                    'Cookie': '__SW=6mrQYxn1T-Hhv2lHd9JPZKSuQFb9-mrj; _device_id=3b7753f0-55b0-0681-f706-f65c83e4a177; fontsLoaded=1; _gcl_au=1.1.720432226.1711452382; _swuid=3b7753f0-55b0-0681-f706-f65c83e4a177; _guest_tid=7b53deb3-6218-4fce-86c7-6bbf8a842187; _sid=cz54b2e2-9789-4bf9-b1a9-690d26af60a6; _gid=GA1.2.408453080.1711711846; dadl=true; AMP_TOKEN=%24NOT_FOUND; _ga_X3K3CELKLV=GS1.1.1711716998.3.1.1711717202.0.0.0; userLocation={%22lat%22:12.9351929%2C%22lng%22:77.62448069999999%2C%22address%22:%22Koramangala%2C%20Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga_34JYJ0BCRN=GS1.1.1711716989.3.1.1711718418.0.0.0; _ga=GA1.1.1925400972.1711452382',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                    // 'Access-Control-Request-Headers': 'Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            const response = await axios.request(config);
            const nextPageOffSet = response.data?.data?.pageOffset
            return { pageOffSet: nextPageOffSet, restaurants: response.data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants }

        } catch (err) {
            console.log(err)
        }
    }
}
