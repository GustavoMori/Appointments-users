import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
/** 
 * Responsabilidade de APENAS criação de agendamentos
 * Sempre vai ter apenas 1 método (geralmente é execute ou run)
 * O services Não possui acesso direto ao dados da request nem da response
*/

/**
 * Princípios da aplicação:
 * Dependecy Inversion (SOLID)
 */

 interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // constructor(appointmentsRepository: AppointmentsRepository){
  //   this.appointmentsRepository = appointmentsRepository
  // }
  
  public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
  
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
  
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService