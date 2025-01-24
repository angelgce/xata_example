import { Global, Module } from '@nestjs/common';
import { XataService } from './xata.service';

@Global()
@Module({
  providers: [XataService],
  exports: [XataService],
})
export class XataModule { }
