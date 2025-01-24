import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XataClient } from '../xata';

@Injectable()
export class XataService {
    private readonly XATA_CLIENT;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.XATA_CLIENT = new XataClient({
            apiKey: configService.get('XATA_API_KEY'),
            branch: configService.get('XATA_BRANCH')
        })
    }

    public getXataClient() {
        return this.XATA_CLIENT;
    }
}
