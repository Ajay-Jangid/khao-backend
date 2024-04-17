import { Body, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class DatabaseService {
    static dbConnection: any;

    public constructor() {
        if (!DatabaseService.dbConnection) {
            this.init()
        }
    }

    public async init() {
        const uri = "mongodb+srv://admin:admin%401234@fooddb.bxyrbho.mongodb.net/";

        try {
            let client = await MongoClient.connect(uri)
            DatabaseService.dbConnection = client.db('Food');
            console.log('[DB Connected]')
        } catch (err) {
            console.log('Mongodb Error : ', err)
        }
    }

    public async getUsers() {
        let users = await DatabaseService.dbConnection.collection('Users').find({}).toArray();
        return users;
    }

    public async createUser(body: any) {
        try {
            console.log(body.email)
            let alreadyPresent = await DatabaseService.dbConnection.collection('Users').find({ "email": body.email }).toArray();
            console.log(alreadyPresent)
            if (alreadyPresent.length > 0) {
                return {
                    message: "Already present in database",
                    statusCode: '409'
                }
            }
            const hashedPassword = await bcrypt.hash(body.password, 12);
            let user = await DatabaseService.dbConnection.collection('Users').insertOne({
                ...body,
                password: hashedPassword
            });

            const token = jwt.sign({ _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }, 'secretket123', {
                expiresIn: '90d'
            })

            return {
                status: 'success',
                statusCode: '201',
                message: "User registered Successfully",
                token
            };
        } catch (err) {
            console.log(err)
        }

    }

    public async removeUser(email: any) {
        try {
            let user = await DatabaseService.dbConnection.collection('Users').find({ "email": email }).toArray();
            console.log(user)
            if (user.length === 0) {
                return {
                    message: 'User not present in database',
                    statusCode: '404'
                }
            }
            let removed = await DatabaseService.dbConnection.collection('Users').deleteOne({ "_id": user[0]._id });
            return removed;
        } catch (err) {
            console.log(err)
        }
    }


    public async loginUser(body: any) {
        try {
            let user = await DatabaseService.dbConnection.collection('Users').find({ "email": body.email }).toArray();
            console.log(user)
            if (user.length === 0) {
                return {
                    message: 'User not found in database!',
                    statusCode: '404'
                }
            }

            const isPasswordValid = await bcrypt.compare(body.password, user[0].password);
            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return {
                    statusCode: '401',
                    message: "Wrong Credentials"
                };
            }

            const token = jwt.sign({ id: user[0]._id, email: user[0].email, firstName: user[0].firstName, lastName: user[0].lastName }, 'secretkey123', {
                expiresIn: body.rememberMe ? '30d' : '2h'
            })

            return {
                statusCode: '200',
                status: "Success",
                token,
                message: "Logged In"
            }

        } catch (err) {
            console.log(err)
        }
    }

    public async verifyToken({ token }) {
        try {
            const decoded = jwt.verify(token, 'secretkey123');
            return decoded;
        } catch (err) {
            return null;
        }
    }
}
