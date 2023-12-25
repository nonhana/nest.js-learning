import { PartialType } from '@nestjs/swagger';
import { CreateTypeormDto } from './create-typeorm.dto';

export class UpdateTypeormDto extends PartialType(CreateTypeormDto) {}
