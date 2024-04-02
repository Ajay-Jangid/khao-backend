import { Injectable } from '@nestjs/common';
const axios = require('axios');

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

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

    async getUpdatedRestaurantsList(pageOffSet: any, collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: any) {
        try {
            let data = JSON.stringify({
                "lat": 12.9351929,
                "lng": 77.62448069999999,
                "nextOffset": pageOffSet,
                "widgetOffset": {
                    "NewListingView_category_bar_chicletranking_TwoRows": "",
                    "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
                    "Restaurant_Group_WebView_SEO_PB_Theme": "",
                    "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": collectionV5RestaurantListWidget_SimRestoRelevance_food_seo,
                    "inlineFacetFilter": "",
                    "restaurantCountWidget": ""
                },
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

    async getDishes() {
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
        const title = response.data?.data?.cards[0]?.card?.card.header?.title;
        const dishes = response.data?.data?.cards[0]?.card?.card?.imageGridCards?.info

        return { title, dishes };

    }

    async getDish(collection_id: any, tags: any) {
        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&collection=${collection_id}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
        console.log(url)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&collection=${collection_id}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Cookie': '__SW=yl-lW2O1loTpY8JGoacJPWeCwx1i1Ai3; _device_id=aeecf0c3-0df8-6863-ab40-d8c95880154d; _gcl_au=1.1.2128778639.1710072491; fontsLoaded=1; deviceId=s%3Aaeecf0c3-0df8-6863-ab40-d8c95880154d.S3ggfZuO%2FNtksac7Lh5wx5z9OdBoxJCgIpVHetkP9P0; tid=s%3A7a86fb6f-d6db-436c-aa1d-9dd5313d0a9b.SJDSIQ5ItXA9QUky1apBLFpTZQ7iWVGujlZ%2F%2B1CK%2Bas; versionCode=1200; platform=web; subplatform=dweb; statusBarHeight=0; bottomOffset=0; genieWebTrackEnabled=false; lat=s%3A12.9351929.%2FwNm%2FuLGNV%2FkCedY%2Bj%2FS%2FMR0CyGclYirVI8wSIiV%2FVU; lng=s%3A77.62448069999999.sg5g0rSDGOZVjWR1cWwP%2B1p%2B4XL9q2fWa5TH%2B303v74; address=s%3AKoramangala%2C%20Bengaluru%2C%20Karnataka%2C%20India.hrKIXqikaYjouKM41IYMWGzp6SNqfUb%2BoGBvaoCQBd0; addressId=s%3A.4Wx2Am9WLolnmzVcU32g6YaFDw0QbIBFRj2nkO7P25s; webBottomBarHeight=0; _ga_8N8XRG907L=GS1.1.1710833835.2.0.1710833835.0.0.0; _swuid=aeecf0c3-0df8-6863-ab40-d8c95880154d; _ga_X3K3CELKLV=GS1.1.1711792559.7.1.1711792672.0.0.0; _guest_tid=ca27434d-3655-4b8a-9d29-b63c47ffc9bb; _sid=d1m8b0d8-7e3d-40b1-ba73-38dcf6147ced; _gid=GA1.2.1551262927.1712034088; dadl=true; userLocation={%22lat%22:12.9351929%2C%22lng%22:77.62448069999999%2C%22address%22:%22Koramangala%2C%20Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga=GA1.2.747188687.1710072492; _gat_UA-53591212-4=1; _ga_34JYJ0BCRN=GS1.1.1712034088.52.1.1712034587.0.0.0; _ga_4BQKMMC7Y9=GS1.2.1712034116.21.1.1712034587.27.0.0'
            }
        };

        const response = await axios.request(config);

        return response.data;

    }
}
