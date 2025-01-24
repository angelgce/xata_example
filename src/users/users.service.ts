import { Injectable } from '@nestjs/common';
import { XataService } from 'src/xata/xata.service';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    constructor(
        private readonly xataService: XataService,
        private readonly redisService: RedisService
    ) { }

    // await get(UsersService).createUser('angel8@example.com', 'Angel Chavez 8', 'Chavez 8')
    async createUser(email: string, name: string, lastname: string) {
        return await this.xataService.getXataClient().db.users.create({
            papa: 'papa',
            email,
            name,
            lastname,
        });
    }

    // await get(UsersService).getUser()
    async getUser(size: number = 5) {
        const cachedUsers = await this.redisService.get<any>('users');
        if (cachedUsers) {
            console.log('Users cached');
            return cachedUsers;
        }

        const users = await this.xataService.getXataClient().db.users
            .select(["xata_id", "email", "name"])
            .getPaginated({
                pagination: {
                    size,
                },
            });

        await this.redisService.set('users', users);
        console.log('Users not cached');
        return users;
    }

    async getUserHttp() {
        const xata = this.xataService.getXataClient();
        return await xata.sql<any>`SELECT * FROM users WHERE name != '' `;
    }

    // await get(UsersService).createUserAndWebsiteTransaction({ email: 'angel9@example.com', name: 'Angel Chavez 9', lastname: 'Chavez 9' }, { url: 'https://example.com', userId: '123' })
    async createUserAndWebsiteTransaction(user: User, website: Website) {
        try {
            const id = uuidv4();
            const xata = this.xataService.getXataClient();
            return await xata.transactions.run([
                {
                    insert: {
                        table: 'users',
                        record: {
                            xata_id: id,
                            ...user,
                        },
                        createOnly: true
                    }
                },
                {
                    insert: {
                        table: 'websites',
                        record: {
                            ...website,
                            userId: id
                        },
                        createOnly: true
                    }
                }
            ]);
        } catch (error) {
            console.log('error', error);
        }
    }
}

export interface User {
    xata_id?: string;
    email: string;
    name: string;
    lastname: string;
}

export interface Website {
    url: string;
    userId: string;
}
