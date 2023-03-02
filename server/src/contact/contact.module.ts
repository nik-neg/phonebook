import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity/contact.entity';
import { PhoneNumber } from './entities/phone-number.entity/phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, PhoneNumber])],
  providers: [ContactService, ContactResolver],
  exports: [ContactService],
})
export class ContactModule {}
