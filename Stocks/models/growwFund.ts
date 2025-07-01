import mongoose, { Document, Schema } from 'mongoose';

export interface IGrowwFund extends Document {
  name: string;
  date?: string;
  tag?: string;
  badge?: boolean;
  return?: string;
  age?: string;
  priceHistory?: { date: string; price: number }[];
  details?: {
    performance: {
      todaysLow?: string;
      todaysHigh?: string;
      low52Week?: string;
      high52Week?: string;
      todayCurrent?: string;
      open?: string;
      prevClose?: string;
      volume?: string;
      totalTradedValue?: string;
      upperCircuit?: string;
      lowerCircuit?: string;
    };
    events?: string[];
    news?: {
      source: string;
      timestamp: string;
      headline: string;
      highlight: boolean;
    }[];
  };
  marketDepth?: {
    buyOrderQuantity?: number;
    sellOrderQuantity?: number;
    buyOrders?: { price: string; quantity: number }[];
    sellOrders?: { price: string; quantity: number }[];
    bidTotal?: number;
    askTotal?: number;
  };
  fundamentals?: {
    marketCap?: string;
    peRatioTTM?: number;
    pbRatio?: number;
    industryPE?: number;
    debtToEquity?: number;
    roe?: number;
    epsTTM?: number;
    dividendYield?: number;
    bookValue?: number;
    faceValue?: number;
  };
  financials?: {
    quarterly?: {
      quarter: string;
      revenue: number;
      profit: number;
      netWorth: number;
    }[];
    yearly?: {
      quarter: string;
      revenue: number;
      profit: number;
    }[];
  };
  about?: {
    description?: string;
    parentOrganisation?: string;
    nseSymbol?: string;
    managingDirector?: string;
  };
}

const GrowwFundSchema = new Schema<IGrowwFund>({
  name: { type: String, required: true },
  date: String,
  tag: String,
  badge: Boolean,
  return: String,
  age: String,
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
const GrowwFund = mongoose.model<IGrowwFund>('GrowwFundd', GrowwFundSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await GrowwFund.countDocuments();
    if (count > 0) {
      console.log('GrowwFund collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IGrowwFund[] = [
      {
        name: "HDFC Flexi Cap Fund",
        date: "2025-07-01",
        tag: "Equity",
        badge: true,
        return: "15.25",
        age: "10 years",
        priceHistory: [
          { date: "2025-06-30", price: 150.75 },
          { date: "2025-06-29", price: 149.50 },
          { date: "2025-06-28", price: 151.20 }
        ],
        details: {
          performance: {
            todaysLow: "150.00",
            todaysHigh: "152.50",
            low52Week: "120.00",
            high52Week: "160.00",
            todayCurrent: "150.75",
            open: "151.00",
            prevClose: "151.50",
            volume: "500000",
            totalTradedValue: "75375000",
            upperCircuit: "166.65",
            lowerCircuit: "136.35"
          },
          events: [
            "Fund Manager Update",
            "Dividend Distribution"
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-06-30T11:00:00Z",
              headline: "HDFC Flexi Cap Fund Outperforms Benchmark",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-06-29T16:30:00Z",
              headline: "Mutual Funds See Increased Inflows",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 30000,
          sellOrderQuantity: 40000,
          buyOrders: [
            { price: "150.50", quantity: 15000 },
            { price: "150.25", quantity: 15000 }
          ],
          sellOrders: [
            { price: "151.00", quantity: 20000 },
            { price: "151.25", quantity: 20000 }
          ],
          bidTotal: 30000,
          askTotal: 40000
        },
        fundamentals: {
          marketCap: "50000 Cr",
          peRatioTTM: 18.50,
          pbRatio: 2.10,
          industryPE: 20.00,
          debtToEquity: 0.05,
          roe: 12.75,
          epsTTM: 8.15,
          dividendYield: 1.50,
          bookValue: 71.50,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1200,
              profit: 300,
              netWorth: 45000
            },
            {
              quarter: "Q4-2024",
              revenue: 1100,
              profit: 280,
              netWorth: 44000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 4500,
              profit: 1100
            },
            {
              quarter: "2023",
              revenue: 4200,
              profit: 1000
            }
          ]
        },
        about: {
          description: "HDFC Flexi Cap Fund is a diversified equity fund investing across market capitalizations...",
          parentOrganisation: "HDFC Asset Management Company",
          nseSymbol: "HDFCFLEXI",
          managingDirector: "Navneet Munot"
        }
      } as IGrowwFund,
      {
        name: "SBI Bluechip Fund",
        date: "2025-07-01",
        tag: "Large Cap",
        badge: false,
        return: "12.80",
        age: "15 years",
        priceHistory: [
          { date: "2025-06-30", price: 95.30 },
          { date: "2025-06-29", price: 94.80 },
          { date: "2025-06-28", price: 96.10 }
        ],
        details: {
          performance: {
            todaysLow: "94.50",
            todaysHigh: "96.50",
            low52Week: "80.00",
            high52Week: "100.00",
            todayCurrent: "95.30",
            open: "95.00",
            prevClose: "95.80",
            volume: "600000",
            totalTradedValue: "57180000",
            upperCircuit: "105.35",
            lowerCircuit: "86.25"
          },
          events: [
            "Portfolio Rebalancing",
            "Fund Performance Review"
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-06-30T10:45:00Z",
              headline: "SBI Bluechip Fund Maintains Steady Returns",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-06-29T13:20:00Z",
              headline: "Large Cap Funds Gain Traction",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 25000,
          sellOrderQuantity: 35000,
          buyOrders: [
            { price: "95.10", quantity: 12000 },
            { price: "95.00", quantity: 13000 }
          ],
          sellOrders: [
            { price: "95.50", quantity: 18000 },
            { price: "95.75", quantity: 17000 }
          ],
          bidTotal: 25000,
          askTotal: 35000
        },
        fundamentals: {
          marketCap: "40000 Cr",
          peRatioTTM: 20.25,
          pbRatio: 2.50,
          industryPE: 22.00,
          debtToEquity: 0.08,
          roe: 11.50,
          epsTTM: 4.70,
          dividendYield: 1.20,
          bookValue: 38.20,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1000,
              profit: 250,
              netWorth: 35000
            },
            {
              quarter: "Q4-2024",
              revenue: 950,
              profit:10,
              netWorth: 34000
            },
            {
              quarter: "2023",
              revenue: 3800,
              profit: 900
            }
          ]
        },
        about: {
          description: "SBI Bluechip Fund is a large-cap equity fund focusing on stable blue-chip companies...",
          parentOrganisation: "SBI Funds Management",
          nseSymbol: "SBIBLUE",
          managingDirector: "Shubhada M. Sirsikar"
        }
      } as IGrowwFund
    ];

    // Insert sample data
    await GrowwFund.insertMany(sampleData);
    console.log('Sample data inserted successfully for GrowwFund');
  } catch (error) {
    console.error('Error inserting sample data for GrowwFund:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default GrowwFund;