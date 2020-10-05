import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// analisando e limpando a data recebida:
// parseISO recebe uma string (que na verdade é uma data) e converte para o tipo date
// StartOfHour coloca min/s/milisegundos como 0 para arredondar a hora

// Verificando se a data já existe
// isEqual verifica se duas datas estão iguais, e retorna true/false

/**
 * Separations of Concerns (SoC)
 * Separação de preocupações
 * 
 * DTO - Data Transfer Object
 */


// Regra de negócio => todo codigo que tem q alterar por implementação
// de novas features... etc 

/** 
 * Se tiver mais função que isso, deve-se abstrair o código!
 * FUNÇÂO DE UMA ROTA: 
 * 1º Receber a requisição
 * 2º chamar outro arquivo para tratar a resposta
 * 3º devolver a resposta
 */ 

 /**
  * SOLID
  * Single responsability principle
  * O
  * L
  * I
  * Dependecy Inversion
  */

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({ 
    date: parsedDate, 
    provider_id
  });
  
  return response.json(appointment);

});

export default appointmentsRouter;