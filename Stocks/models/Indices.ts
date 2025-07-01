import mongoose, { Document, Schema } from 'mongoose';

export interface IIndex extends Document {
  name: string;
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
    quarterly: {
      quarter: string;
      revenue: number;
      profit: number;
      netWorth: number;
    }[];
    yearly: {
      quarter: string;
      revenue: number;
      profit: number;
    }[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const IndexSchema: Schema = new Schema<IIndex>({
  name: { type: String, required: true },
  priceHistory: [
    {
      date: String,
      price: Number,
    },
  ],
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
const IndexModel = mongoose.model<IIndex>('Indexx', IndexSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await IndexModel.countDocuments();
    if (count > 0) {
      console.log('Index collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IIndex[] = [
      {
        name: "NIFTY 50",
        priceHistory: [
          { date: "2025-06-30", price: 24150.75 },
          { date: "2025-06-29", price: 24080.20 },
          { date: "2025-06-28", price: 24220.50 }
        ],
        details: {
          performance: {
            todaysLow: "24050.00",
            todaysHigh: "24250.00",
            low52Week: "21000.00",
            high52Week: "24500.00",
            todayCurrent: "24150.75",
            open: "24100.00",
            prevClose: "24180.30",
            volume: "250000000",
            totalTradedValue: "6037687500000",
            upperCircuit: "26598.33",
            lowerCircuit: "21762.27"
          },
          events: [
            "Index Rebalancing",
            "Quarterly Results Impact"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-06-30T12:00:00Z",
              headline: "NIFTY 50 Hits Record High Amid Strong Q1 Results",
              highlight: true
            },
            {
              source: "CNBC",
              timestamp: "2025-06-29T15:00:00Z",
              headline: "Market Volatility Affects NIFTY 50 Performance",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 1000000,
          sellOrderQuantity: 1200000,
          buyOrders: [
            { price: "24145.50", quantity: 500000 },
            { price: "24140.25", quantity: 500000 }
          ],
          sellOrders: [
            { price: "24155.75", quantity: 600000 },
            { price: "24160.00", quantity: 600000 }
          ],
          bidTotal: 1000000,
          askTotal: 1200000
        },
        fundamentals: {
          marketCap: "3500000 Cr",
          peRatioTTM: 22.50,
          pbRatio: 3.10,
          industryPE: 23.00,
          debtToEquity: 0.20,
          roe: 15.75,
          epsTTM: 1072.50,
          dividendYield: 1.10,
          bookValue: 7800.00,
          faceValue: 100
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1500000,
              profit: 250000,
              netWorth: 3000000
            },
            {
              quarter: "Q4-2024",
              revenue: 1450000,
              profit: 240000,
              netWorth: 2900000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 5800000,
              profit: 950000
            },
            {
              quarter: "2023",
              revenue: 5500000,
              profit: 900000
            }
          ]
        },
        about: {
          description: "The NIFTY 50 is a benchmark Indian stock market index representing 50 large-cap companies...",
          parentOrganisation: "National Stock Exchange",
          nseSymbol: "NIFTY",
          managingDirector: "Ashish Chauhan"
        }
      } as IIndex,
      {
        name: "SENSEX",
        priceHistory: [
          { date: "2025-06-30", price: 79500.25 },
          { date: "2025-06-29", price: 79250.80 },
          { date: "2025-06-28", price: 79750.60 }
        ],
        details: {
          performance: {
            todaysLow: "79000.00",
            todaysHigh: "79800.00",
            low52Week: "70000.00",
            high52Week: "81000.00",
            todayCurrent: "79500.25",
            open: "79300.00",
            prevClose: "79450.75",
            volume: "180000000",
            totalTradedValue: "1431004500000",
            upperCircuit: "87395.83",
            lowerCircuit: "71505.68"
          },
          events: [
            "Annual Index Review",
            "Market Rally Update"
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-06-30T11:30:00Z",
              headline: "SENSEX Surges Past 79,000 Mark",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-06-29T14:45:00Z",
              headline: "SENSEX Faces Resistance at 80,000",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 800000,
          sellOrderQuantity: 900000,
          buyOrders: [
            { price: "79490.50", quantity: 400000 },
            { price: "79485.25", quantity: 400000 }
          ],
          sellOrders: [
            { price: "79505.75", quantity: 450000 },
            { price: "79510.00", quantity: 450000 }
          ],
          bidTotal: 800000,
          askTotal: 900000
        },
        fundamentals: {
          marketCap: "4200000 Cr",
          peRatioTTM: 23.75,
          pbRatio: 3.50,
          industryPE: 24.00,
          debtToEquity: 0.15,
          roe: 16.25,
          epsTTM: 3347.50,
          dividendYield: 1.00,
          bookValue: 22714.29,
          faceValue: 100
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1800000,
              profit: 300000,
              netWorth: 3600000
            },
            {
              quarter: "Q4-2024",
              revenue: 1750000,
              profit: 290000,
              netWorth: 3500000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 7000000,
              profit: 1150000
            },
            {
              quarter: "2023",
              revenue: 6600000,
              profit: 1080000
            }
          ]
        },
        about: {
          description: "The SENSEX is a free-float market-weighted stock market index of 30 well-established companies...",
          parentOrganisation: "Bombay Stock Exchange",
          nseSymbol: "SENSEX",
          managingDirector: "Sundararaman Ramamurthy"
        }
      } as IIndex
    ];

    // Insert sample data
    await IndexModel.insertMany(sampleData);
    console.log('Sample data inserted successfully for Index');
  } catch (error) {
    console.error('Error inserting sample data for Index:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default IndexModel;