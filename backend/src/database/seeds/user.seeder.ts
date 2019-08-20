import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { UserEntity } from '../../user/user.entity';


export class UserSeeder implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(UserEntity)().seedMany(10);
    }

}