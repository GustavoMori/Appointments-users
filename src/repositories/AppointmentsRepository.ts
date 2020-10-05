import { EntityRepository, Repository} from 'typeorm'
import Appointment from '../models/Appointment';

// Repositorios devem fazer as operações em cima dos dados da aplicação
// São os métodos por trás da contrução do object, ou seja, o que ele poderá fazer
// ex: criar, ler, deletar, editar
// DTO === Data Transfer Object

@EntityRepository(Appointment) //Model como parametro \/ esse também é model, no caso como parametro de uma tipagem
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    })

    // const findAppointment = this.appointments.find(appointment => 
    //   isEqual(date, appointment.date),
    // );
      return findAppointment || null;
  }
}
// findByDate(date).then(response => )
export default AppointmentsRepository