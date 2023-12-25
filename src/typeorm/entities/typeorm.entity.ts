import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity() // 使用@Entity()装饰器来标识一个类为实体类
export class Typeorm {
  // 使用@PrimaryGeneratedColumn()装饰器来标识一个属性为主键，并且会自动创建一个自增的主键。
  // 其内部可以传入一个参数，这个参数可以是一个字符串，也可以是一个对象。
  // 如果为字符串，则代表数据库表中的字段名称；如果为对象，则可以指定字段名称和字段类型等该字段的详细信息。
  // 如果想使用非自增的主键，可以使用@PrimaryColumn()装饰器
  @PrimaryGeneratedColumn('increment')
  use_id: number;

  // 使用@Column()装饰器来标识一个属性为数据库表的一个字段。
  // 其内部可以传入一个参数，这个参数可以是一个字符串，也可以是一个对象。
  // 如果为字符串，则代表该字段的简单类型；如果为对象，则可以指定字段名称和字段类型等该字段的详细信息。
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '用户名',
    enum: ['admin', 'user'],
    default: 'user',
  })
  user_name: string;

  @Column()
  user_password: string;

  @Column()
  user_age: number;

  // 使用@CreateDateColumn()装饰器来标识一个属性为创建时间。
  // 其内部可以传入一个参数，这个参数是一个对象。
  // 当该条记录创建成功后，该字段的值为创建时的时间。
  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  create_time: Date;

  @Column({
    type: 'enum',
    enum: ['hana', 'non_hana'],
    default: 'hana',
  })
  non_hana: number;

  /* ----------几个特殊列的使用---------- */
  // 1. simple-array
  // simple-array类型的字段会将数组转换为以逗号分隔的字符串，然后存入数据库中。
  // 当从数据库中取出该字段时，会使用split(',')将字符串转换为数组。
  @Column('simple-array')
  simple_array: string[];

  // 2. simple-json
  // simple-json类型的字段会将JSON对象使用JSON.stringfy()转换为字符串，然后存入数据库中。
  // 当从数据库中取出该字段时，会使用JSON.parse()将字符串转换为JSON对象。
  // 所以给这个字段定义类型的时候可以直接定义一个对象。
  @Column('simple-json')
  simple_json: { name: string; age: number };
}
