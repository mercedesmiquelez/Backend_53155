import ticketRepository  from "../persistences/mongo/repositories/ticket.repository.js";

const createTicket = async (userEmail, totalCart) => {
    const newTicket = {  //Aca tenemos el servicio que se ocupa de hacer la logica de negocio: crea el ticket, genera codigo, toma los datos que llegan por parametro y genera el ticket
        amount: totalCart,
        purchaser: userEmail, 
        code: Math.random().toString(36).substr(2, 9) //es un generador de codigo alfanumerico
    };

    return await ticketRepository.create(newTicket);
};

export default {
    createTicket,
};