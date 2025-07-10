import { Router } from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  addResponse,
} from '../../Education/controllers/helpsupport';

const router = Router();

// Create a new ticket
router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/:ticketId', getTicketById);
router.patch('/:ticketId/status', updateTicketStatus);
router.post('/:ticketId/responses', addResponse);

export default router;