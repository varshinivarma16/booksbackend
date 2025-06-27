import { Request, Response } from 'express';
import { BmiPlan } from '../../fitness/models/bmi'; // adjust path if needed

// Helper to calculate BMI
const calculateBMI = (weight: number, height: number): number => {
  const hMeters = height / 100;
  return parseFloat((weight / (hMeters * hMeters)).toFixed(1));
};

// Determine BMI category
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.0) return 'Normal';
  if (bmi < 29.0) return 'Overweight';
  return 'Obese';
};

// Plan structure
type Plan = {
  calorieTarget: number;
  foodPlan: {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    items: string[];
  }[];
};

// Get plan based on BMI category
const getPlanByBMICategory = (category: string): Plan | undefined => {
  switch (category) {
    case 'Underweight':
      return {
        calorieTarget: 2600,
        foodPlan: [
          { type: 'breakfast', items: ['Peanut butter toast', 'Banana smoothie', 'Boiled eggs'] },
          { type: 'lunch', items: ['Rice with lentils', 'Grilled chicken', 'Fruit salad'] },
          { type: 'dinner', items: ['Pasta with cheese', 'Baked salmon', 'Milkshake'] },
          { type: 'snacks', items: ['Nuts', 'Granola bars', 'Greek yogurt'] }
        ]
      };
    case 'Normal':
      return {
        calorieTarget: 2100,
        foodPlan: [
          { type: 'breakfast', items: ['Oatmeal with fruits', 'Boiled egg', 'Green tea'] },
          { type: 'lunch', items: ['Grilled chicken with quinoa', 'Mixed veggies'] },
          { type: 'dinner', items: ['Brown rice, dal, salad'] },
          { type: 'snacks', items: ['Fruit bowl', 'Nuts'] }
        ]
      };
    case 'Overweight':
      return {
        calorieTarget: 1700,
        foodPlan: [
          { type: 'breakfast', items: ['Egg whites', 'Oatmeal', 'Black coffee'] },
          { type: 'lunch', items: ['Grilled fish', 'Steamed broccoli', 'Soup'] },
          { type: 'dinner', items: ['Cauliflower rice', 'Grilled tofu'] },
          { type: 'snacks', items: ['Carrots', 'Low-fat yogurt'] }
        ]
      };
    case 'Obese':
      return {
        calorieTarget: 1400,
        foodPlan: [
          { type: 'breakfast', items: ['Egg white omelet', 'Green tea'] },
          { type: 'lunch', items: ['Vegetable soup', 'Salad'] },
          { type: 'dinner', items: ['Grilled veggies', 'Lettuce wrap with turkey'] },
          { type: 'snacks', items: ['Cucumber sticks', 'Almonds (5-6)'] }
        ]
      };
    default:
      return undefined;
  }
};

// ✅ POST - create BMI plan
export const generateBmiPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { height, weight, age, gender, activityLevel } = req.body;

    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const plan = getPlanByBMICategory(bmiCategory);

    if (!plan) {
      res.status(400).json({ message: 'Invalid BMI category. Cannot generate plan.' });
      return;
    }

    const saved = await BmiPlan.create({
      height,
      weight,
      age,
      gender,
      activityLevel,
      bmi,
      bmiCategory,
      calorieTarget: plan.calorieTarget,
      foodPlan: plan.foodPlan,
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate plan', error });
  }
};

// ✅ GET - all BMI plans
export const getAllBmiPlans = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Exclude foodPlan using projection
   const plans = await BmiPlan.find({}, { foodPlan: 0 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans', error });
  }
};

export const getBmiFoodPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const plan = await BmiPlan.findById(id).select('foodPlan');

    if (!plan) {
      res.status(404).json({ message: 'Plan not found' });
      return;
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food plan', error });
  }
};


// ✅ PUT - update plan by ID
export const updateBmiPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await BmiPlan.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      res.status(404).json({ message: 'Plan not found' });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update plan', error });
  }
};

// ✅ DELETE - delete plan by ID
export const deleteBmiPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await BmiPlan.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Plan not found' });
      return;
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete plan', error });
  }
};
