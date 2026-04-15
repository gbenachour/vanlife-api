import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Van } from '@app/entities';
import { hashPassword } from '@app/common/helpers';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Van)
    private readonly vansRepository: Repository<Van>,
  ) {}

  async onModuleInit() {
    const userCount = await this.usersRepository.count();

    if (userCount > 0) {
      return;
    }

    const ghazi = await this.usersRepository.save(
      this.usersRepository.create({
        name: 'Ghazi',
        email: 'ff@ff.xom',
        password: await hashPassword('1234'),
      }),
    );

    const alex = await this.usersRepository.save(
      this.usersRepository.create({
        name: 'Alex',
        email: 'host@vanlife.dev',
        password: await hashPassword('vanlife'),
      }),
    );

    const sam = await this.usersRepository.save(
      this.usersRepository.create({
        name: 'Sam',
        email: 'sam@vanlife.dev',
        password: await hashPassword('camping'),
      }),
    );

    await this.vansRepository.save([
      this.vansRepository.create({
        name: 'Modest Explorer',
        price: 60,
        description:
          'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!',
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png',
        type: 'simple',
        host: ghazi,
      }),
      this.vansRepository.create({
        name: 'Beach Bum',
        price: 80,
        description:
          "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/beach-bum.png',
        type: 'rugged',
        host: ghazi,
      }),
      this.vansRepository.create({
        name: 'Reliable Red',
        price: 100,
        description:
          "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/reliable-red.png',
        type: 'luxury',
        host: alex,
      }),
      this.vansRepository.create({
        name: 'Dreamfinder',
        price: 65,
        description:
          'Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.',
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
        type: 'simple',
        host: sam,
      }),
      this.vansRepository.create({
        name: 'The Cruiser',
        price: 120,
        description:
          'The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.',
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
        type: 'luxury',
        host: sam,
      }),
      this.vansRepository.create({
        name: 'Green Wonder',
        price: 70,
        description:
          "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
        imageUrl:
          'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
        type: 'rugged',
        host: ghazi,
      }),
    ]);
  }
}
