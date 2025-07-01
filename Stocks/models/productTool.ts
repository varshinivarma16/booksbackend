import mongoose, { Document, Schema } from 'mongoose';

export interface ProductToolDocument extends Document {
  name: string;
  icon: string;
}

const productToolSchema: Schema<ProductToolDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

// Create the model
const ProductTool = mongoose.model<ProductToolDocument>('ProductTools', productToolSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await ProductTool.countDocuments();
    if (count > 0) {
      console.log('ProductTools collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ProductToolDocument[] = [
      {
        name: "Stock Screener",
        icon: "https://example.com/icons/stockscreener.png"
      } as ProductToolDocument,
      {
        name: "Portfolio Tracker",
        icon: "https://example.com/icons/portfoliotracker.png"
      } as ProductToolDocument
    ];

    // Insert sample data
    await ProductTool.insertMany(sampleData);
    console.log('Sample data inserted successfully for ProductTools');
  } catch (error) {
    console.error('Error inserting sample data for ProductTools:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default ProductTool;