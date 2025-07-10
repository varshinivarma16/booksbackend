import { Request, Response } from 'express';
import { Ticket } from '../../Education/models/helpsupport';
import mongoose from 'mongoose';

// Create a new ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketData = req.body;
    const ticket = new Ticket({
      ...ticketData,
      responses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await ticket.save();
    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

// Get all tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

// Get a specific ticket by ID
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
};

// Update ticket status
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const { status, assignedTo } = req.body;

    const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const update: any = { updatedAt: new Date().toISOString() };
    if (status) update.status = status;
    if (assignedTo) update.assignedTo = assignedTo;

    const ticket = await Ticket.findByIdAndUpdate(ticketId, update, { new: true });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    res.status(200).json({ message: 'Ticket status updated', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket status', error });
  }
};

// Add a response to a ticket
export const addResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const { message, sender, senderName } = req.body;

    if (!message || !sender || !senderName) {
      res.status(400).json({ message: 'Message, sender, and senderName are required' });
      return;
    }

    const validSenders = ['student', 'admin'];
    if (!validSenders.includes(sender)) {
      res.status(400).json({ message: 'Invalid sender' });
      return;
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    ticket.responses.push({
      id: new mongoose.Types.ObjectId().toString(),
      message,
      sender,
      senderName,
      timestamp: new Date().toISOString(),
    });
    ticket.updatedAt = new Date().toISOString();
    await ticket.save();

    res.status(201).json({ message: 'Response added successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error adding response', error });
  }
};