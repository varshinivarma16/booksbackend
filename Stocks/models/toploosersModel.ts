import mongoose, { Document, Schema } from 'mongoose';

interface Order {
  price: string;
  quantity: number;
}

interface NewsItem {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface FinancialQuarter {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

export interface ITopLoser extends Document {
  category: 'large' | 'mid' | 'small';
  categoryId?: mongoose.Types.ObjectId;
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: { date: string; price: number }[];
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
    quarterly: FinancialQuarter[];
    yearly: FinancialQuarter[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const TopLosersSchema = new Schema<ITopLoser>({
  category: { type: String, enum: ['large', 'mid', 'small'], required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },

  name: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  image: { type: String, required: true },

  priceHistory: [{ date: String, price: Number }],

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
const TopLosers = mongoose.model<ITopLoser>('TopLoserss', TopLosersSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await TopLosers.countDocuments();
    if (count > 0) {
      console.log('TopLosers collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopLoser[] = [
      {
        category: 'large',
        name: "Bharti Airtel",
        price: "1350.20",
        change: "-5.10",
        image: "https://example.com/images/airtel.png",
        priceHistory: [
          { date: "2025-07-02", price: 1400.75 },
          { date: "2025-07-01", price: 1420.50 },
          { date: "2025-06-30", price: 1435.25 }
        ],
        details: {
          performance: {
            todaysLow: "1340.00",
            todaysHigh: "1410.00",
            low52Week: "1200.00",
            high52Week: "1500.00",
            todayCurrent: "1350.20",
            open: "1400.00",
            prevClose: "1420.30",
            volume: "2800000",
            totalTradedValue: "3780560000",
            upperCircuit: "1562.33",
            lowerCircuit: "1278.27"
          },
          events: [
            "Regulatory Challenges",
            "Q1 Results Update"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-07-02T10:15:00Z",
              headline: "Bharti Airtel Slips on Regulatory Concerns",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-07-01T14:00:00Z",
              headline: "Telecom Stocks Face Selling Pressure",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 80000,
          sellOrderQuantity: 100000,
          buyOrders: [
            { price: "1348.50", quantity: 40000 },
            { price: "1347.25", quantity: 40000 }
          ],
          sellOrders: [
            { price: "1352.75", quantity: 50000 },
            { price: "1355.00", quantity: 50000 }
          ],
          bidTotal: 80000,
          askTotal: 100000
        },
        fundamentals: {
          marketCap: "820000 Cr",
          peRatioTTM: 70.50,
          pbRatio: 8.10,
          industryPE: 65.00,
          debtToEquity: 1.90,
          roe: 11.50,
          epsTTM: 19.15,
          dividendYield: 0.55,
          bookValue: 166.69,
          faceValue: 5
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 38000,
              profit: 2100,
              netWorth: 95000
            },
            {
              quarter: "Q4-2024",
              revenue: 37000,
              profit: 2000,
              netWorth: 93000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 150000,
              profit: 8200
            },
            {
              quarter: "2023",
              revenue: 140000,
              profit: 7600
            }
          ]
        },
        about: {
          description: "Bharti Airtel is a leading telecommunications company providing mobile, broadband, and digital TV services...",
          parentOrganisation: "Bharti Enterprises",
          nseSymbol: "BHARTIARTL",
          managingDirector: "Gopal Vittal"
        }
      } as ITopLoser,
      {
        category: 'small',
        name: "Suzlon Energy",
        price: "52.30",
        change: "-7.25",
        image: "https://example.com/images/suzlon.png",
        priceHistory: [
          { date: "2025-07-02", price: 56.50 },
          { date: "2025-07-01", price: 58.20 },
          { date: "2025-06-30", price: 59.75 }
        ],
        details: {
          performance: {
            todaysLow: "51.80",
            todaysHigh: "57.00",
            low52Week: "45.00",
            high52Week: "65.00",
            todayCurrent: "52.30",
            open: "56.00",
            prevClose: "56.40",
            volume: "5000000",
            totalTradedValue: "261500000",
            upperCircuit: "62.04",
            lowerCircuit: "50.76"
          },
          events: [
            "Debt Restructuring Concerns",
            "Project Delay Announcement"
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-07-02T09:45:00Z",
              headline: "Suzlon Energy Falls on Project Delay News",
              highlight: true
            },
            {
              source: "Financial Express",
              timestamp: "2025-07-01T13:15:00Z",
              headline: "Small-Cap Stocks Under Pressure",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 200000,
          sellOrderQuantity: 250000,
          buyOrders: [
            { price: "52.10", quantity: 100000 },
            { price: "52.00", quantity: 100000 }
          ],
          sellOrders: [
            { price: "52.50", quantity: 125000 },
            { price: "52.60", quantity: 125000 }
          ],
          bidTotal: 200000,
          askTotal: 250000
        },
        fundamentals: {
          marketCap: "7100 Cr",
          peRatioTTM: 45.20,
          pbRatio: 15.30,
          industryPE: 40.00,
          debtToEquity: 0.40,
          roe: 33.80,
          epsTTM: 1.16,
          dividendYield: 0.00,
          bookValue: 3.42,
          faceValue: 2
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 2000,
              profit: 150,
              netWorth: 1800
            },
            {
              quarter: "Q4-2024",
              revenue: 1900,
              profit: 140,
              netWorth: 1750
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 7800,
              profit: 580
            },
            {
              quarter: "2023",
              revenue: 7200,
              profit: 530
            }
          ]
        },
        about: {
          description: "Suzlon Energy is a leading renewable energy solutions provider specializing in wind energy...",
          parentOrganisation: "Suzlon Group",
          nseSymbol: "SUZLON",
          managingDirector: "J.P. Chalasani"
        }
      } as ITopLoser
    ];

    // Insert sample data
    await TopLosers.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopLosers');
  } catch (error) {
    console.error('Error inserting sample data for TopLosers:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default TopLosers;