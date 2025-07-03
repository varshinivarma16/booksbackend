import mongoose, { Document, Schema } from 'mongoose';

export interface ITopGainer extends Document {
  category: 'large' | 'mid' | 'small';
  categoryId?: mongoose.Types.ObjectId;
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
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
    news: Array<{
      source: string;
      timestamp: string;
      headline: string;
      highlight: boolean;
    }>;
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: Array<{ price: string; quantity: number }>;
    sellOrders: Array<{ price: string; quantity: number }>;
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
    quarterly: Array<{
      quarter: string;
      revenue: number;
      profit: number;
      netWorth: number;
    }>;
    yearly: Array<{
      quarter: string;
      revenue: number;
      profit: number;
    }>;
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const TopGainersSchema: Schema = new Schema({
  category: {
    type: String,
    enum: ['large', 'mid', 'small'],
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  image: { type: String, required: true },
  __v: { type: Number, default: 0 },

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
      {
        quarter: String,
        revenue: Number,
        profit: Number,
        netWorth: Number,
      },
    ],
    yearly: [
      {
        quarter: String,
        revenue: Number,
        profit: Number,
      },
    ],
  },

  about: {
    description: String,
    parentOrganisation: String,
    nseSymbol: String,
    managingDirector: String,
  },
});

// Create the model
const TopGainers = mongoose.model<ITopGainer>('TopGainerss', TopGainersSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await TopGainers.countDocuments();
    if (count > 0) {
      console.log('TopGainers collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopGainer[] = [
      {
        category: 'large',
        name: "Tata Consultancy Services",
        price: "4100.25",
        change: "+4.75",
        image: "https://example.com/images/tcs.png",
        priceHistory: [
          { date: "2025-07-02", price: 4050.50 },
          { date: "2025-07-01", price: 4000.75 },
          { date: "2025-06-30", price: 3950.20 }
        ],
        details: {
          performance: {
            todaysLow: "4000.00",
            todaysHigh: "4120.00",
            low52Week: "3500.00",
            high52Week: "4200.00",
            todayCurrent: "4100.25",
            open: "4020.00",
            prevClose: "3905.50",
            volume: "3200000",
            totalTradedValue: "13120800000",
            upperCircuit: "4296.05",
            lowerCircuit: "3514.95"
          },
          events: [
            "Q1 Results Announcement",
            "New Client Acquisition"
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-07-02T09:30:00Z",
              headline: "TCS Shares Soar After Strong Q1 Results",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-07-01T15:00:00Z",
              headline: "IT Sector Gains Momentum with TCS Leading",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 100000,
          sellOrderQuantity: 120000,
          buyOrders: [
            { price: "4098.50", quantity: 50000 },
            { price: "4097.25", quantity: 50000 }
          ],
          sellOrders: [
            { price: "4102.75", quantity: 60000 },
            { price: "4105.00", quantity: 60000 }
          ],
          bidTotal: 100000,
          askTotal: 120000
        },
        fundamentals: {
          marketCap: "1480000 Cr",
          peRatioTTM: 32.50,
          pbRatio: 14.20,
          industryPE: 30.00,
          debtToEquity: 0.05,
          roe: 44.10,
          epsTTM: 126.15,
          dividendYield: 1.20,
          bookValue: 288.73,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 62000,
              profit: 12000,
              netWorth: 110000
            },
            {
              quarter: "Q4-2024",
              revenue: 60000,
              profit: 11500,
              netWorth: 108000
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
              profit: 43000
            }
          ]
        },
        about: {
          description: "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions...",
          parentOrganisation: "Tata Group",
          nseSymbol: "TCS",
          managingDirector: "K Krithivasan"
        }
      } as ITopGainer,
      {
        category: 'mid',
        name: "Dixon Technologies",
        price: "9200.80",
        change: "+6.30",
        image: "https://example.com/images/dixon.png",
        priceHistory: [
          { date: "2025-07-02", price: 9000.25 },
          { date: "2025-07-01", price: 8800.50 },
          { date: "2025-06-30", price: 8650.75 }
        ],
        details: {
          performance: {
            todaysLow: "8900.00",
            todaysHigh: "9250.00",
            low52Week: "7000.00",
            high52Week: "9500.00",
            todayCurrent: "9200.80",
            open: "9000.00",
            prevClose: "8654.50",
            volume: "1500000",
            totalTradedValue: "13801200000",
            upperCircuit: "9519.95",
            lowerCircuit: "7789.05"
          },
          events: [
            "New Manufacturing Facility",
            "Q1 Earnings Report"
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-07-02T10:00:00Z",
              headline: "Dixon Tech Gains on New Facility Announcement",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-07-01T14:30:00Z",
              headline: "Electronics Stocks Rally Amid Demand Surge",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 60000,
          sellOrderQuantity: 75000,
          buyOrders: [
            { price: "9195.50", quantity: 30000 },
            { price: "9190.25", quantity: 30000 }
          ],
          sellOrders: [
            { price: "9205.75", quantity: 40000 },
            { price: "9210.00", quantity: 35000 }
          ],
          bidTotal: 60000,
          askTotal: 75000
        },
        fundamentals: {
          marketCap: "55000 Cr",
          peRatioTTM: 62.40,
          pbRatio: 22.50,
          industryPE: 45.00,
          debtToEquity: 0.25,
          roe: 36.20,
          epsTTM: 147.44,
          dividendYield: 0.30,
          bookValue: 409.78,
          faceValue: 2
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 8500,
              profit: 900,
              netWorth: 12000
            },
            {
              quarter: "Q4-2024",
              revenue: 8000,
              profit: 850,
              netWorth: 11500
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 32000,
              profit: 3400
            },
            {
              quarter: "2023",
              revenue: 29000,
              profit: 3100
            }
          ]
        },
        about: {
          description: "Dixon Technologies is a leading electronics manufacturing services company in India...",
          parentOrganisation: "Dixon Technologies (India) Limited",
          nseSymbol: "DIXON",
          managingDirector: "Atul B. Lall"
        }
      } as ITopGainer
    ];

    // Insert sample data
    await TopGainers.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopGainers');
  } catch (error) {
    console.error('Error inserting sample data for TopGainers:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default TopGainers;