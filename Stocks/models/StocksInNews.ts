import mongoose, { Document, Schema } from 'mongoose';

interface PriceHistory {
  date: string;
  price: number;
}

interface Event {
  date: string;
  title: string;
  subtitle: string;
  amount?: string;
  link?: string;
}

interface News {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface Order {
  price: string;
  quantity: number;
}

interface QuarterlyData {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

interface YearlyData {
  quarter: string;
  revenue: number;
  profit: number;
}

export interface StocksInNewsDocument extends Document {
  name: string;
  price: string;
  change: string;
  image: string;
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
    events: Event[];
    news: News[];
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
    quarterly: QuarterlyData[];
    yearly: YearlyData[];
  };
  about: {
    description: string;
    parentOrganisation: string;
    nseSymbol: string;
    managingDirector: string;
  };
}

const stocksInNewsSchema = new Schema<StocksInNewsDocument>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  change: { type: String, required: true },
  image: { type: String, required: true },
  __v: { type: Number, default: 0 },
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
    events: [
      {
        date: String,
        title: String,
        subtitle: String,
        amount: String,
        link: String,
      },
    ],
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
const StocksInNews = mongoose.model<StocksInNewsDocument>('StocksInNewss', stocksInNewsSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await StocksInNews.countDocuments();
    if (count > 0) {
      console.log('StocksInNews collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: StocksInNewsDocument[] = [
      {
        name: "Reliance Industries",
        price: "2950.60",
        change: "+3.25",
        image: "https://example.com/images/reliance.png",
        priceHistory: [
          { date: "2025-06-30", price: 2900.25 },
          { date: "2025-06-29", price: 2880.50 },
          { date: "2025-06-28", price: 2875.75 }
        ],
        details: {
          performance: {
            todaysLow: "2870.00",
            todaysHigh: "2970.00",
            low52Week: "2500.00",
            high52Week: "3100.00",
            todayCurrent: "2950.60",
            open: "2900.00",
            prevClose: "2857.35",
            volume: "3500000",
            totalTradedValue: "10327100000",
            upperCircuit: "3143.09",
            lowerCircuit: "2571.62"
          },
          events: [
            {
              date: "2025-06-30",
              title: "Strategic Partnership",
              subtitle: "Reliance partners with global tech firm for AI solutions",
              link: "https://example.com/reliance-ai-partnership"
            },
            {
              date: "2025-06-28",
              title: "Q1 Results",
              subtitle: "Reliance reports record Q1 revenue",
              amount: "",
              link: "https://example.com/reliance-q1-results"
            }
          ],
          news: [
            {
              source: "Economic Times",
              timestamp: "2025-06-30T09:15:00Z",
              headline: "Reliance Industries Surges on AI Partnership News",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-06-29T14:45:00Z",
              headline: "Reliance Jio Expands 5G Network",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 120000,
          sellOrderQuantity: 140000,
          buyOrders: [
            { price: "2948.50", quantity: 60000 },
            { price: "2947.25", quantity: 60000 }
          ],
          sellOrders: [
            { price: "2952.75", quantity: 70000 },
            { price: "2955.00", quantity: 70000 }
          ],
          bidTotal: 120000,
          askTotal: 140000
        },
        fundamentals: {
          marketCap: "2000000 Cr",
          peRatioTTM: 28.50,
          pbRatio: 2.20,
          industryPE: 25.00,
          debtToEquity: 0.35,
          roe: 8.90,
          epsTTM: 103.53,
          dividendYield: 0.35,
          bookValue: 1340.91,
          faceValue: 10
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 240000,
              profit: 19000,
              netWorth: 850000
            },
            {
              quarter: "Q4-2024",
              revenue: 230000,
              profit: 18000,
              netWorth: 830000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 900000,
              profit: 72000
            },
            {
              quarter: "2023",
              revenue: 850000,
              profit: 68000
            }
          ]
        },
        about: {
          description: "Reliance Industries is a conglomerate with interests in energy, petrochemicals, telecom, and retail...",
          parentOrganisation: "Reliance Group",
          nseSymbol: "RELIANCE",
          managingDirector: "Mukesh Ambani"
        }
      } as StocksInNewsDocument,
      {
        name: "Adani Enterprises",
        price: "3200.45",
        change: "-2.10",
        image: "https://example.com/images/adani.png",
        priceHistory: [
          { date: "2025-06-30", price: 3250.75 },
          { date: "2025-06-29", price: 3230.20 },
          { date: "2025-06-28", price: 3275.50 }
        ],
        details: {
          performance: {
            todaysLow: "3180.00",
            todaysHigh: "3260.00",
            low52Week: "2800.00",
            high52Week: "3500.00",
            todayCurrent: "3200.45",
            open: "3240.00",
            prevClose: "3268.55",
            volume: "2800000",
            totalTradedValue: "8961260000",
            upperCircuit: "3595.41",
            lowerCircuit: "2941.70"
          },
          events: [
            {
              date: "2025-06-30",
              title: "Green Energy Initiative",
              subtitle: "Adani announces major solar project",
              link: "https://example.com/adani-solar-project"
            },
            {
              date: "2025-06-27",
              title: "Debt Restructuring",
              subtitle: "Adani Enterprises completes debt repayment plan",
              amount: "5000 Cr",
              link: "https://example.com/adani-debt"
            }
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-06-30T10:30:00Z",
              headline: "Adani Enterprises Gains Attention with Green Energy Push",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-06-29T13:00:00Z",
              headline: "Adani Stocks Face Volatility Amid Market Correction",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 90000,
          sellOrderQuantity: 110000,
          buyOrders: [
            { price: "3198.50", quantity: 45000 },
            { price: "3197.25", quantity: 45000 }
          ],
          sellOrders: [
            { price: "3202.75", quantity: 55000 },
            { price: "3205.00", quantity: 55000 }
          ],
          bidTotal: 90000,
          askTotal: 110000
        },
        fundamentals: {
          marketCap: "365000 Cr",
          peRatioTTM: 85.60,
          pbRatio: 7.80,
          industryPE: 30.00,
          debtToEquity: 1.20,
          roe: 9.10,
          epsTTM: 37.39,
          dividendYield: 0.10,
          bookValue: 410.26,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 32000,
              profit: 1500,
              netWorth: 60000
            },
            {
              quarter: "Q4-2024",
              revenue: 31000,
              profit: 1400,
              netWorth: 58000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 125000,
              profit: 5600
            },
            {
              quarter: "2023",
              revenue: 115000,
              profit: 5200
            }
          ]
        },
        about: {
          description: "Adani Enterprises is a flagship company of the Adani Group with diversified interests in energy, infrastructure, and more...",
          parentOrganisation: "Adani Group",
          nseSymbol: "ADANIENT",
          managingDirector: "Gautam Adani"
        }
      } as StocksInNewsDocument
    ];

    // Insert sample data
    await StocksInNews.insertMany(sampleData);
    console.log('Sample data inserted successfully for StocksInNews');
  } catch (error) {
    console.error('Error inserting sample data for StocksInNews:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default StocksInNews;