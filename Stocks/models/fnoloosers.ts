import mongoose, { Document, Schema } from 'mongoose';

interface PricePoint {
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

export interface IFNOLooser extends Document {
  name: string;
  icon: string;
  price: string;
  change: string;
  volume: string;
  priceHistory: PricePoint[];
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

const FNOloosersSchema = new Schema<IFNOLooser>({
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
const FNOLoosers = mongoose.model<IFNOLooser>('FNOlooserss', FNOloosersSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await FNOLoosers.countDocuments();
    if (count > 0) {
      console.log('Collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IFNOLooser[] = [
      {
        name: "Reliance Industries",
        icon: "https://example.com/icons/reliance.png",
        price: "3050.25",
        change: "-2.35",
        volume: "1500000",
        priceHistory: [
          { date: "2025-06-30", price: 3100.50 },
          { date: "2025-06-29", price: 3080.25 },
          { date: "2025-06-28", price: 3120.75 }
        ],
        details: {
          performance: {
            todaysLow: "3020.00",
            todaysHigh: "3100.00",
            low52Week: "2500.00",
            high52Week: "3300.00",
            todayCurrent: "3050.25",
            open: "3080.00",
            prevClose: "3122.60",
            volume: "1500000",
            totalTradedValue: "4578750000",
            upperCircuit: "3434.85",
            lowerCircuit: "2810.35"
          },
          events: [
            "Q1 Results Announced",
            "Dividend Declaration"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-06-30T10:30:00Z",
              headline: "Reliance Industries Q1 Results Show Strong Growth",
              highlight: true
            },
            {
              source: "CNBC",
              timestamp: "2025-06-29T15:45:00Z",
              headline: "Reliance Shares Dip Amid Market Volatility",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 50000,
          sellOrderQuantity: 75000,
          buyOrders: [
            { price: "3045.50", quantity: 20000 },
            { price: "3040.25", quantity: 30000 }
          ],
          sellOrders: [
            { price: "3055.75", quantity: 40000 },
            { price: "3060.00", quantity: 35000 }
          ],
          bidTotal: 50000,
          askTotal: 75000
        },
        fundamentals: {
          marketCap: "2050000 Cr",
          peRatioTTM: 28.45,
          pbRatio: 2.35,
          industryPE: 25.60,
          debtToEquity: 0.45,
          roe: 8.95,
          epsTTM: 107.25,
          dividendYield: 0.35,
          bookValue: 1298.50,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 235000,
              profit: 18000,
              netWorth: 850000
            },
            {
              quarter: "Q4-2024",
              revenue: 228000,
              profit: 17500,
              netWorth: 830000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 900000,
              profit: 70000
            },
            {
              quarter: "2023",
              revenue: 850000,
              profit: 65000
            }
          ]
        },
        about: {
          description: "Reliance Industries Limited is an Indian multinational conglomerate company...",
          parentOrganisation: "Reliance Group",
          nseSymbol: "RELIANCE",
          managingDirector: "Mukesh Ambani"
        }
      } as IFNOLooser
    ];

    // Insert sample data
    await FNOLoosers.insertMany(sampleData);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default FNOLoosers;