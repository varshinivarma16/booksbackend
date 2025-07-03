import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITopSector extends Document {
  name: string;
  count: number;
}

const topSectorsSchema: Schema<ITopSector> = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  }
});

// Create the model
const TopSectors: Model<ITopSector> = 
  mongoose.models.TopSectors || mongoose.model<ITopSector>('TopSectors', topSectorsSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await TopSectors.countDocuments();
    if (count > 0) {
      console.log('TopSectors collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopSector[] = [
      {
        name: "Pharmaceuticals",
        count: 15
      } as ITopSector,
      {
        name: "Automobile",
        count: 12
      } as ITopSector
    ];

    // Insert sample data
    await TopSectors.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopSectors');
  } catch (error) {
    console.error('Error inserting sample data for TopSectors:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default TopSectors;