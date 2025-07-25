import { Request, Response } from 'express';
import FNOLooser, { IFNOLooser } from '../models/fnoloosers';

// Add single or multiple top stocks
export const addTopStocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Partial<IFNOLooser>[] = Array.isArray(req.body) ? req.body : [req.body];
    const result = await FNOLooser.insertMany(data);
    res.status(201).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// Get all top stocks (only selected fields)
export const getTopStocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await FNOLooser.find({}, 'name price change icon volume');
    res.status(200).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// Get top stock by ID (excluding selected fields)
export const getTopStockById = async (req: Request, res: Response): Promise<void> => {
  try {
    const stock = await FNOLooser.findById(req.params.id).select('-__v');
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(stock);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// Update top stock by ID
export const updateTopStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await FNOLooser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// Delete top stock by ID
export const deleteTopStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await FNOLooser.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// Update stock by name
export const updateStockByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await FNOLooser.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
