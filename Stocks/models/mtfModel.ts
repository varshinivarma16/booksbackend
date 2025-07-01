import mongoose, { Document, Schema } from 'mongoose';

interface PriceHistoryEntry {
  date: string;
  price: number;
}

interface NewsEntry {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface MarketOrder {
  price: string;
  quantity: number;
}

interface QuarterlyFinancial {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

interface YearlyFinancial {
  quarter: string;
  revenue: number;
  profit: number;
}

export interface MTFDocument extends Document {
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: PriceHistoryEntry[];
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
    news: NewsEntry[];
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: MarketOrder[];
    sellOrders: MarketOrder[];
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
    quarterly: QuarterlyFinancial[];
    yearly: YearlyFinancial[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const mtfSchema: Schema<MTFDocument> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  image: { type: String, required: true },
  __v: { type: Number, default: 0 },

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
    }]
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
  }
});

// Create the model
const MTFStock = mongoose.model<MTFDocument>('Mtfschemaa', mtfSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await MTFStock.countDocuments();
    if (count > 0) {
      console.log('MTFStock collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: MTFDocument[] = [
      {
        name: "ICICI Bank",
        price: "1150.75",
        change: "+2.15",
        image: "https://example.com/images/icicibank.png",
        priceHistory: [
          { date: "2025-06-30", price: 1140.25 },
          { date: "2025-06-29", price: 1135.50 },
          { date: "2025-06-28", price: 1128.90 }
        ],
        details: {
          performance: {
            todaysLow: "1125.00",
            todaysHigh: "1160.00",
            low52Week: "950.00",
            high52Week: "1200.00",
            todayCurrent: "1150.75",
            open: "1130.00",
            prevClose: "1126.60",
            volume: "2200000",
            totalTradedValue: "2531650000",
            upperCircuit: "1239.26",
            lowerCircuit: "1013.94"
          },
          events: [
            "Dividend Announcement",
            "Q1 FY25 Results"
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-06-30T09:30:00Z",
              headline: "ICICI Bank Reports Strong Q1 Growth",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-06-29T15:00:00 MomsZ",
              headline: "Banking Stocks Rally on Positive Sentiment",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 80000,
          sellOrderQuantity: 95000,
          buyOrders: [
            { price: "1148.50", quantity: 40000 },
            { price: "1147.25", quantity: 40000 }
          ],
          sellOrders: [
            { price: "1152.75", quantity: 50000 },
            { price: "1154.00", quantity: 45000 }
          ],
          bidTotal: 80000,
          askTotal: 95000
        },
        fundamentals: {
          marketCap: "805000 Cr",
          peRatioTTM: 18.90,
          pbRatio: 3.10,
          industryPE: 18.00,
          debtToEquity: 0.90,
          roe: 16.50,
          epsTTM: 60.85,
          dividendYield: 0.85,
          bookValue: 371.29,
          faceValue: 2
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 38000,
              profit: 11000,
              netWorth: 200000
            },
            {
              quarter: "Q4-2024",
              revenue: 36000,
              profit: 10500,
              netWorth: 195000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 145000,
              profit: 42000
            },
            {
              quarter: "2023",
              revenue: 135000,
              profit: 39000
            }
          ]
        },
        about: {
          description: "ICICI Bank is a leading private sector bank in India offering a wide range of banking products and services...",
          parentOrganisation: "ICICI Group",
          nseSymbol: "ICICIBANK",
          managingDirector: "Sandeep Bakhshi"
        }
      } as MTFDocument,
      {
        name: "Bajaj Finance",
        price: "7200.30",
        change: "-1.45",
        image: "https://example.com/images/bajajfinance.png",
        priceHistory: [
          { date: "2025-06-30", price: 7250.80 },
          { date: "2025-06-29", price: 7300.25 },
          { date: "2025-06-28", price: 7280.60 }
        ],
        details: {
          performance: {
            todaysLow: "7150.00",
            todaysHigh: "7300.00",
            low52Week: "6000.00",
            high52Week: "7800.00",
            todayCurrent: "7200.30",
            open: "7250.00",
            prevClose: "7304.75",
            volume: "900000",
            totalTradedValue: "6480270000",
            upperCircuit: "8035.23",
            lowerCircuit: "6574.28"
          },
          events: [
            "New Product Launch",
            "Q1 Results Announcement"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-06-30T10:15:00Z",
              headline: "Bajaj Finance Expands Loan Portfolio",
              highlight: true
            },
            {
              source: "Financial Express",
              timestamp: "2025-06-29T14:00:00Z",
              headline: "NBFC Stocks Under Pressure",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 55000,
          sellOrderQuantity: 70000,
          buyOrders: [
            { price: "7195.50", quantity: 25000 },
            { price: "7190.25", quantity: 30000 }
          ],
          sellOrders: [
            { price: "7205.75", quantity: 35000 },
            { price: "7210.00", quantity: 35000 }
          ],
          bidTotal: 55000,
          askTotal: 70000
        },
        fundamentals: {
          marketCap: "450000 Cr",
          peRatioTTM: 35.20,
          pbRatio: 6.50,
          industryPE: 28.50,
          debtToEquity: 3.80,
          roe: 19.75,
          epsTTM: 204.55,
          dividendYield: 0.50,
          bookValue: 1107.69,
          faceValue: 2
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 14000,
              profit: 4000,
              netWorth: 85000
            },
            {
              quarter: "Q4-2024",
              revenue: 13500,
              profit: 3800,
              netWorth: 82000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 54000,
              profit: 15000
            },
            {
              quarter: "2023",
              revenue: 50000,
              profit: 14000
            }
          ]
        },
        about: {
          description: "Bajaj Finance Limited is a leading non-banking financial company offering consumer finance and lending services...",
          parentOrganisation: "Bajaj Group",
          nseSymbol: "BAJFINANCE",
          managingDirector: "Rajeev Jain"
        }
      } as MTFDocument
    ];

    // Insert sample data
    await MTFStock.insertMany(sampleData);
    console.log('Sample data inserted successfully for MTFStock');
  } catch (error) {
    console.error('Error inserting sample data for MTFStock:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default MTFStock;