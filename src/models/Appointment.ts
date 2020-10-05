// Responsabilidade dos formatos dos dados
// Model é a representação de como um dado é salvo/composto na aplicação
import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './Users';

@Entity('appointments') // nome da tabela @XXXX é sintaxe de Decorators
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id'})
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
// Omit é uma função que recebe 2 parametros,
// 1º tipo da variável (no caso eh um tipo Appointment)
// 2º variável no qual eu desejo omitir