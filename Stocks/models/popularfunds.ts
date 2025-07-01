import mongoose, { Document, Schema } from 'mongoose';

interface IPriceHistory {
  date: string;
  price: number;
}

interface INews {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface IPerformance {
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
}

interface IMarketOrder {
  price: string;
  quantity: number;
}

interface IFinancialEntry {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

export interface IPopularFund extends Document {
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: IPriceHistory[];
  details: {
    performance: IPerformance;
    events: string[];
    news: INews[];
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: IMarketOrder[];
    sellOrders: IMarketOrder[];
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
    quarterly: IFinancialEntry[];
    yearly: IFinancialEntry[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const PopularFundSchema = new Schema<IPopularFund>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  image: { type: String, required: true },
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
const PopularFund = mongoose.model<IPopularFund>('PopularFundd', PopularFundSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await PopularFund.countDocuments();
    if (count > 0) {
      console.log('PopularFund collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IPopularFund[] = [
      {
        name: "Axis Bluechip Fund",
        price: "62.45",
        change: "+0.85",
        image: "https://example.com/images/axisbluechip.png",
        priceHistory: [
          { date: "2025-06-30", price: 61.90 },
          { date: "2025-06-29", price: 61.50 },
          { date: "2025-06-28", price: 62.10 }
        ],
        details: {
          performance: {
            todaysLow: "61.80",
            todaysHigh: "62.70",
            low52Week: "50.00",
            high52Week: "65.00",
            todayCurrent: "62.45",
            open: "61.95",
            prevClose: "61.60",
            volume: "300000",
            totalTradedValue: "18735000",
            upperCircuit: "67.76",
            lowerCircuit: "55.44"
          },
          events: [
            "Portfolio Update",
            "Dividend Declaration"
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-06-30T10:00:00Z",
              headline: "Axis Bluechip Fund Shows Consistent Returns",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-06-29T14:30:00Z",
              headline: "Mutual Funds Attract New Investors",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 20000,
          sellOrderQuantity: 25000,
          buyOrders: [
            { price: "62.40", quantity: 10000 },
            { price: "62.35", quantity: 10000 }
          ],
          sellOrders: [
            { price: "62.50", quantity: 12000 },
            { price: "62.55", quantity: 13000 }
          ],
          bidTotal: 20000,
          askTotal: 25000
        },
        fundamentals: {
          marketCap: "35000 Cr",
          peRatioTTM: 22.30,
          pbRatio: 2.40,
          industryPE: 21.50,
          debtToEquity: 0.10,
          roe: 13.25,
          epsTTM: 2.80,
          dividendYield: 1.30,
          bookValue: 26.04,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 900,
              profit: 200,
              netWorth: 32000
            },
            {
              quarter: "Q4-2024",
              revenue: 850,
              profit: 190,
              netWorth: 31000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 3400,
              profit: 780
            },
            {
              quarter: "2023",
              revenue: 3200,
              profit: 720
            }
          ]
        },
        about: {
          description: "Axis Bluechip Fund is a large-cap equity fund focusing on stable, high-quality companies...",
          parentOrganisation: "Axis Asset Management Company",
          nseSymbol: "AXISBLUE",
          managingDirector: "Chandresh Nigam"
        }
      } as IPopularFund,
      {
        name: "Mirae Asset Large Cap Fund",
        price: "105.20",
        change: "-0.65",
        image: "https://example.com/images/miraeasset.png",
        priceHistory: [
          { date: "2025-06-30", price: 106.10 },
          { date: "2025-06-29", price: 105.80 },
          { date: "2025-06-28", price: 106.50 }
        ],
        details: {
          performance: {
            todaysLow: "104.50",
            todaysHigh: "106.80",
            low52Week: "90.00",
            high52Week: "110.00",
            todayCurrent: "105.20",
            open: "106.00",
            prevClose: "105.85",
            volume: "400000",
            totalTradedValue: "42080000",
            upperCircuit: "116.44",
            lowerCircuit: "95.27"
          },
          events: [
            "Fund Performance Review",
            "New Investment Strategy"
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-06-30T09:45:00Z",
              headline: "Mirae Asset Large Cap Fund Maintains Strong Performance",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-06-29T13:15:00Z",
              headline: "Large Cap Funds See Steady Inflows",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 30000,
          sellOrderQuantity: 35000,
          buyOrders: [
            { price: "105.10", quantity: 15000 },
            { price: "105.00", quantity: 15000 }
          ],
          sellOrders: [
            { price: "105.30", quantity: 18000 },
            { price: "105.40", quantity: 17000 }
          ],
          bidTotal: 30000,
          askTotal: 35000
        },
        fundamentals: {
          marketCap: "42000 Cr",
          peRatioTTM: 20.50,
          pbRatio: 2.20,
          industryPE: 22.00,
          debtToEquity: 0.08,
          roe: 12.80,
          epsTTM: 5.13,
          dividendYield: 1.40,
          bookValue: 47.82,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 1100,
              profit: 250,
              netWorth: 38000
            },
            {
              quarter: "Q4-2024",
              revenue: 1050,
              profit: 230,
              netWorth: 37000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 4200,
              profit: 950
            },
            {
              quarter: "2023",
              revenue: 4000,
              profit: 900
            }
          ]
        },
        about: {
          description: "Mirae Asset Large Cap Fund invests in large-cap companies with strong growth potential...",
          parentOrganisation: "Mirae Asset Global Investments",
          nseSymbol: "MIRAELARGECAP",
          managingDirector: "Swarup Anand Mohanty"
        }
      } as IPopularFund
    ];

    // Insert sample data
    await PopularFund.insertMany(sampleData);
    console.log('Sample data inserted successfully for PopularFund');
  } catch (error) {
    console.error('Error inserting sample data for PopularFund:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default PopularFund;