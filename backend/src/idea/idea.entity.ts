import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('idea')
export class IdeaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: '' })
    businessIdea: string;

    @Column({ default: '' })
    usp: string;

    @Column({ default: '' })
    customers: string;

    @Column({ default: '' })
    businessModel: string;

    @Column({ default: '' })
    competitors: string;

    @Column({ default: '' })
    team: string;

    @Column({ default: '' })
    marketBarriers: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @ManyToOne(type => UserEntity, user => user.ideas)
    user: UserEntity;
}