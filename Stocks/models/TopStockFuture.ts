import mongoose, { Document, Schema } from 'mongoose';

export interface ITopStockFuture extends Document {
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
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

const TopStockFutureSchema = new Schema<ITopStockFuture>(
  {
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
  },
  { versionKey: false }
);

// Create the model
const TopStockFutureModel = mongoose.model<ITopStockFuture>('TopStockFuturee', TopStockFutureSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await TopStockFutureModel.countDocuments();
    if (count > 0) {
      console.log('TopStockFuture collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopStockFuture[] = [
      {
        name: "Reliance Futures",
        price: "2975.80",
        change: "+3.50",
        image: "https://example.com/images/reliancefutures.png",
        priceHistory: [
          { date: "2025-07-02", price: 2950.25 },
          { date: "2025-07-01", price: 2925.60 },
          { date: "2025-06-30", price: 2900.45 }
        ],
        details: {
          performance: {
            todaysLow: "2925.00",
            todaysHigh: "2990.00",
            low52Week: "2550.00",
            high52Week: "3050.00",
            todayCurrent: "2975.80",
            open: "2940.00",
            prevClose: "2872.30",
            volume: "3200000",
            totalTradedValue: "9522560000",
            upperCircuit: "3159.53",
            lowerCircuit: "2585.07"
          },
          events: [
            "Futures Contract Expiry",
            "Strategic Partnership Announcement"
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-07-02T10:45:00Z",
              headline: "Reliance Futures Surge on Partnership News",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-07-01T15:00:00Z",
              headline: "Futures Market Sees High Activity in Energy Sector",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 110000,
          sellOrderQuantity: 130000,
          buyOrders: [
            { price: "2973.50", quantity: 55000 },
            { price: "2972.25", quantity: 55000 }
          ],
          sellOrders: [
            { price: "2978.75", quantity: 65000 },
            { price: "2980.00", quantity: 65000 }
          ],
          bidTotal: 110000,
          askTotal: 130000
        },
        fundamentals: {
          marketCap: "2010000 Cr",
          peRatioTTM: 28.75,
          pbRatio: 2.25,
          industryPE: 25.50,
          debtToEquity: 0.36,
          roe: 9.10,
          epsTTM: 103.65,
          dividendYield: 0.34,
          bookValue: 1322.22,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 245000,
              profit: 19500,
              netWorth: 860000
            },
            {
              quarter: "Q4-2024",
              revenue: 235000,
              profit: 18500,
              netWorth: 840000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 910000,
              profit: 73000
            },
            {
              quarter: "2023",
              revenue: 860000,
              profit: 69000
            }
          ]
        },
        about: {
          description: "Reliance Futures represent futures contracts on Reliance Industries, a conglomerate with interests in energy, telecom, and retail...",
          parentOrganisation: "Reliance Group",
          nseSymbol: "RELIANCE_FUT",
          managingDirector: "Mukesh Ambani"
        }
      } as ITopStockFuture,
      {
        name: "TCS Futures",
        price: "4150.30",
        change: "+4.20",
        image: "https://example.com/images/tcsfutures.png",
        priceHistory: [
          { date: "2025-07-02", price: 4100.75 },
          { date: "2025-07-01", price: 4050.20 },
          { date: "2025-06-30", price: 4000.50 }
        ],
        details: {
          performance: {
            todaysLow: "4050.00",
            todaysHigh: "4170.00",
            low52Week: "3550.00",
            high52Week: "4250.00",
            todayCurrent: "4150.30",
            open: "4070.00",
            prevClose: "3980.10",
            volume: "3000000",
            totalTradedValue: "12450900000",
            upperCircuit: "4378.11",
            lowerCircuit: "3582.09"
          },
          events: [
            "Q1 Results Release",
            "New Client Contract"
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-07-02T10:30:00Z",
              headline: "TCS Futures Rally on Strong Earnings",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-07-01T14:15:00Z",
              headline: "IT Futures Gain Traction Amid Market Optimism",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 95000,
          sellOrderQuantity: 115000,
          buyOrders: [
            { price: "4148.50", quantity: 47500 },
            { price: "4147.25", quantity: 47500 }
          ],
          sellOrders: [
            { price: "4152.75", quantity: 57500 },
            { price: "4155.00", quantity: 57500 }
          ],
          bidTotal: 95000,
          askTotal: 115000
        },
        fundamentals: {
          marketCap: "1490000 Cr",
          peRatioTTM: 32.80,
          pbRatio: 14.30,
          industryPE: 30.50,
          debtToEquity: 0.06,
          roe: 44.50,
          epsTTM: 126.53,
          dividendYield: 1.18,
          bookValue: 290.21,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 63000,
              profit: 12200,
              netWorth: 112000
            },
            {
              quarter: "Q4-2024",
              revenue: 61000,
              profit: 11800,
              netWorth: 110000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 245000,
              profit: 47000
            },
            {
              quarter: "2023",
              revenue: 230000,
              profit: 44000
            }
          ]
        },
        about: {
          description: "TCS Futures represent futures contracts on Tata Consultancy Services, a global leader in IT services and consulting...",
          parentOrganisation: "Tata Group",
          nseSymbol: "TCS_FUT",
          managingDirector: "K Krithivasan"
        }
      } as ITopStockFuture
    ];

    // Insert sample data
    await TopStockFutureModel.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopStockFuture');
  } catch (error) {
    console.error('Error inserting sample data for TopStockFuture:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default TopStockFutureModel;