import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity/contact.entity';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';
import { FilterModule } from '../filter/filter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, PhoneNumber]), FilterModule],
  providers: [ContactService, ContactResolver],
  exports: [ContactService],
})
export class ContactModule {}
