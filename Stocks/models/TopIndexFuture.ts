import mongoose, { Document, Schema } from 'mongoose';

export interface ITopIndexFuture extends Document {
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
    news: {
      source: string;
      timestamp: string;
      headline: string;
      highlight: boolean;
    }[];
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: { price: string; quantity: number }[];
    sellOrders: { price: string; quantity: number }[];
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
    quarterly: { quarter: string; revenue: number; profit: number; netWorth: number }[];
    yearly: { quarter: string; revenue: number; profit: number }[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const schema = new Schema<ITopIndexFuture>({
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
    news: [
      {
        source: String,
        timestamp: String,
        headline: String,
        highlight: Boolean,
      },
    ],
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
    quarterly: [
      { quarter: String, revenue: Number, profit: Number, netWorth: Number },
    ],
    yearly: [{ quarter: String, revenue: Number, profit: Number }],
  },
  about: {
    description: String,
    parentOrganisation: String,
    nseSymbol: String,
    managingDirector: String,
  },
});

// Create the model
const TopIndexFuture = mongoose.model<ITopIndexFuture>('TopIndexFuturee', schema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await TopIndexFuture.countDocuments();
    if (count > 0) {
      console.log('TopIndexFuture collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopIndexFuture[] = [
      {
        name: "NIFTY Futures",
        price: "24350.75",
        change: "+2.15",
        image: "https://example.com/images/niftyfutures.png",
        priceHistory: [
          { date: "2025-07-02", price: 24200.50 },
          { date: "2025-07-01", price: 24150.25 },
          { date: "2025-06-30", price: 24080.20 }
        ],
        details: {
          performance: {
            todaysLow: "24100.00",
            todaysHigh: "24400.00",
            low52Week: "21000.00",
            high52Week: "24500.00",
            todayCurrent: "24350.75",
            open: "24150.00",
            prevClose: "24180.30",
            volume: "3000000",
            totalTradedValue: "7305225000000",
            upperCircuit: "26598.33",
            lowerCircuit: "21762.27"
          },
          events: [
            "Index Rebalancing",
            "Futures Contract Expiry"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-07-02T10:30:00Z",
              headline: "NIFTY Futures Rally on Positive Market Sentiment",
              highlight: true
            },
            {
              source: "CNBC",
              timestamp: "2025-07-01T14:45:00Z",
              headline: "Futures Market Sees Increased Trading Activity",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 1500000,
          sellOrderQuantity: 1700000,
          buyOrders: [
            { price: "24345.50", quantity: 750000 },
            { price: "24340.25", quantity: 750000 }
          ],
          sellOrders: [
            { price: "24355.75", quantity: 850000 },
            { price: "24360.00", quantity: 850000 }
          ],
          bidTotal: 1500000,
          askTotal: 1700000
        },
        fundamentals: {
          marketCap: "3600000 Cr",
          peRatioTTM: 23.10,
          pbRatio: 3.30,
          industryPE: 24.00,
          debtToEquity: 0.18,
          roe: 16.20,
          epsTTM: 1054.32,
          dividendYield: 1.05,
          bookValue: 7386.36,
          faceValue: 100
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1600000,
              profit: 270000,
              netWorth: 3200000
            },
            {
              quarter: "Q4-2024",
              revenue: 1550000,
              profit: 260000,
              netWorth: 3100000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 6200000,
              profit: 1050000
            },
            {
              quarter: "2023",
              revenue: 5900000,
              profit: 980000
            }
          ]
        },
        about: {
          description: "NIFTY Futures represent futures contracts on the NIFTY 50 index, tracking 50 large-cap Indian companies...",
          parentOrganisation: "National Stock Exchange",
          nseSymbol: "NIFTY_FUT",
          managingDirector: "Ashish Chauhan"
        }
      } as ITopIndexFuture,
      {
        name: "BANKNIFTY Futures",
        price: "50500.40",
        change: "+3.45",
        image: "https://example.com/images/bankniftyfutures.png",
        priceHistory: [
          { date: "2025-07-02", price: 50200.75 },
          { date: "2025-07-01", price: 50000.25 },
          { date: "2025-06-30", price: 49850.50 }
        ],
        details: {
          performance: {
            todaysLow: "49800.00",
            todaysHigh: "50700.00",
            low52Week: "45000.00",
            high52Week: "52000.00",
            todayCurrent: "50500.40",
            open: "50000.00",
            prevClose: "48810.95",
            volume: "2500000",
            totalTradedValue: "126251000000",
            upperCircuit: "53692.05",
            lowerCircuit: "43929.86"
          },
          events: [
            "Banking Sector Rally",
            "Futures Contract Rollout"
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-07-02T10:15:00Z",
              headline: "BANKNIFTY Futures Surge on Banking Sector Strength",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-07-01T13:30:00Z",
              headline: "Futures Trading Boosted by Market Optimism",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 1200000,
          sellOrderQuantity: 1400000,
          buyOrders: [
            { price: "50495.50", quantity: 600000 },
            { price: "50490.25", quantity: 600000 }
          ],
          sellOrders: [
            { price: "50505.75", quantity: 700000 },
            { price: "50510.00", quantity: 700000 }
          ],
          bidTotal: 1200000,
          askTotal: 1400000
        },
        fundamentals: {
          marketCap: "2800000 Cr",
          peRatioTTM: 15.80,
          pbRatio: 2.90,
          industryPE: 16.50,
          debtToEquity: 0.95,
          roe: 18.40,
          epsTTM: 3196.20,
          dividendYield: 0.90,
          bookValue: 17413.79,
          faceValue: 100
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1300000,
              profit: 220000,
              netWorth: 2600000
            },
            {
              quarter: "Q4-2024",
              revenue: 1250000,
              profit: 210000,
              netWorth: 2500000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 5100000,
              profit: 850000
            },
            {
              quarter: "2023",
              revenue: 4800000,
              profit: 800000
            }
          ]
        },
        about: {
          description: "BANKNIFTY Futures are futures contracts on the NIFTY Bank Index, tracking major Indian banking stocks...",
          parentOrganisation: "National Stock Exchange",
          nseSymbol: "BANKNIFTY_FUT",
          managingDirector: "Ashish Chauhan"
        }
      } as ITopIndexFuture
    ];

    // Insert sample data
    await TopIndexFuture.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopIndexFuture');
  } catch (error) {
    console.error('Error inserting sample data for TopIndexFuture:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default TopIndexFuture;