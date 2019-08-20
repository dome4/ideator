import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { UserEntity } from '../../user/user.entity';

define(UserEntity, (faker: typeof Faker, settings: { role: string }) => {

    // create a new imaginary user
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const username = faker.internet.userName(firstName, lastName);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.bio = faker.lorem.sentence();
    user.image = faker.image.imageUrl();
    user.password = '12345';
    return user;
});