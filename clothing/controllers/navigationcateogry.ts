import { Request, Response } from 'express';
import { CategoryModel, DressModel, DressDetailsModel } from '../../clothing/models/navigationcateogry';
import mongoose from 'mongoose';

class CategoryController {
  // ✅ GET all categories
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryModel.find();
      if (!categories.length) {
        res.status(404).json({ error: 'No categories found' });
        return;
      }
      res.status(200).json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'An unexpected error occurred while fetching categories' });
    }
  }

  // ✅ GET category by name with dresses
  static async getCategoryByNameWithCommonDresses(req: Request, res: Response): Promise<void> {
    try {
      const { gender, categoryName } = req.params;

      if (!gender || (gender !== 'men' && gender !== 'women')) {
        res.status(400).json({ error: 'Please provide a valid gender (men or women)' });
        return;
      }

      if (!categoryName) {
        res.status(400).json({ error: 'Category name is required' });
        return;
      }

      const category = await CategoryModel.findOne({
        name: { $regex: `^${categoryName}$`, $options: 'i' },
        gender
      }).populate('dresses');

      if (!category) {
        res.status(404).json({ error: 'Category not found for the specified gender and name' });
        return;
      }

      res.status(200).json({
        categoryName: category.name,
        dresses: category.dresses
      });
    } catch (err) {
      console.error('Error fetching category by name:', err);
      res.status(500).json({ error: 'An unexpected error occurred while fetching category data' });
    }
  }

  // ✅ POST a new category
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, gender } = req.body;

      if (!name || !gender) {
        res.status(400).json({ error: 'Both name and gender are required' });
        return;
      }

      if (gender !== 'men' && gender !== 'women') {
        res.status(400).json({ error: 'Gender must be either men or women' });
        return;
      }

      const existing = await CategoryModel.findOne({ name, gender });
      if (existing) {
        res.status(409).json({ error: `Category '${name}' already exists for ${gender}` });
        return;
      }

      const newCategory = new CategoryModel({ name, gender, dresses: [] });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (err) {
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'An unexpected error occurred while creating the category' });
    }
  }

  // ✅ POST dresses (with category linkage + productCategory + dress details)
  static async createDress(req: Request, res: Response): Promise<void> {
    try {
      const dressesData = req.body;

      if (!Array.isArray(dressesData)) {
        res.status(400).json({ error: 'Input must be an array of dress objects' });
        return;
      }

      if (dressesData.length === 0) {
        res.status(400).json({ error: 'At least one dress object is required' });
        return;
      }

      const savedDresses = [];

      for (const dress of dressesData) {
        const { name, image, price, colors, about, gender, isCommon, categoryName, productCategory, fit, materials, care, details, reviews, mainImages, sizeOptions, modelInfo, priceCurrency } = dress;

        if (!name || !image || !price || !colors || !about || !gender || !productCategory) {
          res.status(400).json({
            error: 'All fields (name, image, price, colors, about, gender, productCategory) are required for each dress'
          });
          return;
        }

        if (gender !== 'men' && gender !== 'women') {
          res.status(400).json({ error: 'Gender must be either men or women for each dress' });
          return;
        }

        const newDress = new DressModel({
          name,
          image,
          price,
          colors,
          about,
          gender,
          isCommon: isCommon || false,
          productCategory
        });

        const savedDress = await newDress.save();
        savedDresses.push(savedDress);

        if (categoryName && !isCommon) {
          const category = await CategoryModel.findOne({
            name: { $regex: `^${categoryName}$`, $options: 'i' },
            gender
          });

          if (!category) {
            res.status(400).json({ error: `Category '${categoryName}' not found for gender ${gender}` });
            return;
          }

          category.dresses.push(savedDress._id);
          await category.save();
        }

        // Create dress details
        const newDressDetails = new DressDetailsModel({
          dressId: savedDress._id,
          fit,
          materials,
          care,
          details,
          reviews,
          mainImages,
          sizeOptions,
          modelInfo,
          priceCurrency
        });

        await newDressDetails.save();
      }

      res.status(201).json(savedDresses);
    } catch (err) {
      console.error('Error creating dresses:', err);
      res.status(500).json({ error: 'An unexpected error occurred while creating dresses' });
    }
  }

  // ✅ GET dress details by dress ID
  static async getDressDetailsById(req: Request, res: Response): Promise<void> {
    try {
      const { dressId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(dressId)) {
        res.status(400).json({ error: 'Invalid dress ID format' });
        return;
      }

      const dressDetails = await DressDetailsModel.findOne({ dressId }).populate('dressId');

      if (!dressDetails) {
        res.status(404).json({ error: 'Dress details not found' });
        return;
      }

      res.status(200).json(dressDetails);
    } catch (err) {
      console.error('Error fetching dress details:', err);
      res.status(500).json({ error: 'An unexpected error occurred while fetching dress details' });
    }
  }

  // ✅ DELETE all categories
  static async deleteAllCategories(req: Request, res: Response): Promise<void> {
    try {
      await CategoryModel.deleteMany({});
      res.status(200).json({ message: 'All categories deleted successfully' });
    } catch (err) {
      console.error('Error deleting categories:', err);
      res.status(500).json({ error: 'An unexpected error occurred while deleting categories' });
    }
  }

  // ✅ DELETE all dresses
  static async deleteAllDresses(req: Request, res: Response): Promise<void> {
    try {
      await DressModel.deleteMany({});
      await DressDetailsModel.deleteMany({}); // Delete associated dress details
      await CategoryModel.updateMany({}, { $set: { dresses: [] } });
      res.status(200).json({ message: 'All dresses deleted successfully' });
    } catch (err) {
      console.error('Error deleting dresses:', err);
      res.status(500).json({ error: 'An unexpected error occurred while deleting dresses' });
    }
  }
}

export default CategoryController;