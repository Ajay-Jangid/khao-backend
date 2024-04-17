import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {

    constructor(private databaseService: DatabaseService) { }

    @Post()
    getUsers() {
        return this.databaseService.getUsers();
    }

    @Post('/create/user')
    async createUser(@Body() body: any, @Res() res: any, @Req() req: any) {
        console.log(body.email)
        const result = await this.databaseService.createUser(body);
        res.status(result['statusCode']).json(result)
    }

    @Post('/remove/user')
    removeUser(@Body() body: any) {
        return this.databaseService.removeUser(body.email);
    }

    @Post('/login/user')
    async loginUser(@Body() body: any, @Res() res) {
        let result = await this.databaseService.loginUser(body);
        res.status(result.statusCode).json(result)
    }

    @Post('/verify/token')
    async verifyToken(@Body() body: any, @Res() res) {
        console.log(body)
        let result = await this.databaseService.verifyToken(body);
        console.log(result)
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(404).json(false)
        }
    }
}
