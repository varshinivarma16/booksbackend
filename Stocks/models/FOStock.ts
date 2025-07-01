import mongoose, { Document, Schema } from 'mongoose';

interface PriceHistory {
  date: string;
  price: number;
}

interface NewsItem {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface Order {
  price: string;
  quantity: number;
}

interface QuarterlyReport {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

interface YearlyReport {
  quarter: string;
  revenue: number;
  profit: number;
}

export interface IFOStock extends Document {
  name: string;
  icon: string;
  price: string;
  change: string;
  volume: string;
  priceHistory: PriceHistory[];
  details: {
    performance: {
      todaysLow: string;
      todaysHigh: string;
      low52Week: string;
      high52Week: string;
      todayCurrent: string;
      open: string;
      prevClose: string;
      volume: string;
      totalTradedValue: string;
      upperCircuit: string;
      lowerCircuit: string;
    };
    events: string[];
    news: NewsItem[];
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: Order[];
    sellOrders: Order[];
    bidTotal: number;
    askTotal: number;
  };
  fundamentals: {
    marketCap: string;
    peRatioTTM: number;
    pbRatio: number;
    industryPE: number;
    debtToEquity: number;
    roe: number;
    epsTTM: number;
    dividendYield: number;
    bookValue: number;
    faceValue: number;
  };
  financials: {
    quarterly: QuarterlyReport[];
    yearly: YearlyReport[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const FOStockSchema = new Schema<IFOStock>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  volume: { type: String, required: true },
  priceHistory: [{
    date: String,
    price: Number,
  }],
  details: {
    performance: {
      todaysLow: String,
      todaysHigh: String,
      low52Week: String,
      high52Week: String,
      todayCurrent: String,
      open: String,
      prevClose: String,
      volume: String,
      totalTradedValue: String,
      upperCircuit: String,
      lowerCircuit: String,
    },
    events: [String],
    news: [{
      source: String,
      timestamp: String,
      headline: String,
      highlight: Boolean,
    }],
  },
  marketDepth: {
    buyOrderQuantity: Number,
    sellOrderQuantity: Number,
    buyOrders: [{ price: String, quantity: Number }],
    sellOrders: [{ price: String, quantity: Number }],
    bidTotal: Number,
    askTotal: Number,
  },
  fundamentals: {
    marketCap: String,
    peRatioTTM: Number,
    pbRatio: Number,
    industryPE: Number,
    debtToEquity: Number,
    roe: Number,
    epsTTM: Number,
    dividendYield: Number,
    bookValue: Number,
    faceValue: Number,
  },
  financials: {
    quarterly: [{
      quarter: String,
      revenue: Number,
      profit: Number,
      netWorth: Number,
    }],
    yearly: [{
      quarter: String,
      revenue: Number,
      profit: Number,
    }],
  },
  about: {
    description: String,
    parentOrganisation: String,
    nseSymbol: String,
    managingDirector: String,
  },
});

// Create the model
const FOStock = mongoose.model<IFOStock>('FOStockk', FOStockSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await FOStock.countDocuments();
    if (count > 0) {
      console.log('FOStock collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IFOStock[] = [
      {
        name: "Tata Consultancy Services",
        icon: "https://example.com/icons/tcs.png",
        price: "4200.75",
        change: "-1.85",
        volume: "1200000",
        priceHistory: [
          { date: "2025-06-30", price: 4250.30 },
          { date: "2025-06-29", price: 4220.10 },
          { date: "2025-06-28", price: 4280.50 }
        ],
        details: {
          performance: {
            todaysLow: "4180.00",
            todaysHigh: "4260.00",
            low52Week: "3500.00",
            high52Week: "4500.00",
            todayCurrent: "4200.75",
            open: "4230.00",
            prevClose: "4278.60",
            volume: "1200000",
            totalTradedValue: "5040900000",
            upperCircuit: "4706.45",
            lowerCircuit: "3850.75"
          },
          events: [
            "Q1 FY25 Results",
            "Annual General Meeting"
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-06-30T09:15:00Z",
              headline: "TCS Reports Robust Q1 Growth in IT Services",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-06-29T14:20:00Z",
              headline: "TCS Shares Face Selling Pressure",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 60000,
          sellOrderQuantity: 80000,
          buyOrders: [
            { price: "4195.25", quantity: 25000 },
            { price: "4190.50", quantity: 35000 }
          ],
          sellOrders: [
            { price: "4205.75", quantity: 45000 },
            { price: "4210.00", quantity: 35000 }
          ],
          bidTotal: 60000,
          askTotal: 80000
        },
        fundamentals: {
          marketCap: "1520000 Cr",
          peRatioTTM: 32.15,
          pbRatio: 4.25,
          industryPE: 30.80,
          debtToEquity: 0.10,
          roe: 45.60,
          epsTTM: 130.75,
          dividendYield: 1.25,
          bookValue: 988.25,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 62000,
              profit: 12000,
              netWorth: 95000
            },
            {
              quarter: "Q4-2024",
              revenue: 60000,
              profit: 11500,
              netWorth: 92000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 240000,
              profit: 46000
            },
            {
              quarter: "2023",
              revenue: 225000,
              profit: 42000
            }
          ]
        },
        about: {
          description: "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions...",
          parentOrganisation: "Tata Group",
          nseSymbol: "TCS",
          managingDirector: "K Krithivasan"
        }
      } as IFOStock
    ];

    // Insert sample data
    await FOStock.insertMany(sampleData);
    console.log('Sample data inserted successfully for FOStock');
  } catch (error) {
    console.error('Error inserting sample data for FOStock:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default FOStock;