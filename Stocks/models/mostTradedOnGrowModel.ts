import mongoose, { Schema, Document } from 'mongoose';

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
  netWorth: number;
}

interface YearlyReport {
  quarter: string;
  revenue: number;
  profit: number;
}

export interface MostTradedOnGrowDocument extends Document {
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

const mostTradedOnGrowSchema = new Schema<MostTradedOnGrowDocument>({
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
    events: [{
      date: String,
      title: String,
      subtitle: String,
      amount: String,
      link: String,
    }],
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
    quarterly: [{ quarter: String, revenue: Number, profit: Number, netWorth: Number }],
    yearly: [{ quarter: String, revenue: Number, profit: Number }],
  },
  about: {
    description: String,
    parentOrganisation: String,
    nseSymbol: String,
    managingDirector: String,
  },
}, { versionKey: false });

// Create the model
const MostTradedOnGrow = mongoose.model<MostTradedOnGrowDocument>('MostTradedOnGroww', mostTradedOnGrowSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await MostTradedOnGrow.countDocuments();
    if (count > 0) {
      console.log('MostTradedOnGrow collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: MostTradedOnGrowDocument[] = [
      {
        name: "HDFC Bank",
        price: "1650.40",
        change: "+1.25",
        image: "https://example.com/images/hdfcbank.png",
        priceHistory: [
          { date: "2025-06-30", price: 1640.50 },
          { date: "2025-06-29", price: 1635.75 },
          { date: "2025-06-28", price: 1628.90 }
        ],
        details: {
          performance: {
            todaysLow: "1625.00",
            todaysHigh: "1660.00",
            low52Week: "1400.00",
            high52Week: "1700.00",
            todayCurrent: "1650.40",
            open: "1630.00",
            prevClose: "1629.85",
            volume: "2000000",
            totalTradedValue: "3300800000",
            upperCircuit: "1792.84",
            lowerCircuit: "1466.87"
          },
          events: [
            {
              date: "2025-06-30",
              title: "Dividend Declaration",
              subtitle: "Board approves final dividend for FY25",
              amount: "19.50",
              link: "https://example.com/hdfc-dividend-2025"
            },
            {
              date: "2025-06-28",
              title: "Q1 Results",
              subtitle: "HDFC Bank reports strong Q1 performance",
              link: "https://example.com/hdfc-q1-results"
            }
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-06-30T10:00:00Z",
              headline: "HDFC Bank Shares Surge After Q1 Results",
              highlight: true
            },
            {
              source: "Moneycontrol",
              timestamp: "2025-06-29T14:30:00Z",
              headline: "HDFC Bank Expands Digital Banking Services",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 75000,
          sellOrderQuantity: 90000,
          buyOrders: [
            { price: "1648.50", quantity: 40000 },
            { price: "1647.25", quantity: 35000 }
          ],
          sellOrders: [
            { price: "1652.75", quantity: 50000 },
            { price: "1654.00", quantity: 40000 }
          ],
          bidTotal: 75000,
          askTotal: 90000
        },
        fundamentals: {
          marketCap: "1250000 Cr",
          peRatioTTM: 19.75,
          pbRatio: 2.80,
          industryPE: 18.50,
          debtToEquity: 0.85,
          roe: 14.20,
          epsTTM: 83.50,
          dividendYield: 1.15,
          bookValue: 589.29,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 54000,
              profit: 16000,
              netWorth: 250000
            },
            {
              quarter: "Q4-2024",
              revenue: 52000,
              profit: 15500,
              netWorth: 245000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 210000,
              profit: 62000
            },
            {
              quarter: "2023",
              revenue: 195000,
              profit: 58000
            }
          ]
        },
        about: {
          description: "HDFC Bank is one of India's leading private sector banks providing a wide range of financial services...",
          parentOrganisation: "HDFC Group",
          nseSymbol: "HDFCBANK",
          managingDirector: "Sashidhar Jagdishan"
        }
      } as MostTradedOnGrowDocument,
      {
        name: "Infosys",
        price: "1825.60",
        change: "-0.95",
        image: "https://example.com/images/infosys.png",
        priceHistory: [
          { date: "2025-06-30", price: 1840.20 },
          { date: "2025-06-29", price: 1835.50 },
          { date: "2025-06-28", price: 1850.75 }
        ],
        details: {
          performance: {
            todaysLow: "1810.00",
            todaysHigh: "1845.00",
            low52Week: "1500.00",
            high52Week: "1900.00",
            todayCurrent: "1825.60",
            open: "1835.00",
            prevClose: "1843.05",
            volume: "1800000",
            totalTradedValue: "3286080000",
            upperCircuit: "2027.36",
            lowerCircuit: "1658.75"
          },
          events: [
            {
              date: "2025-06-30",
              title: "Product Launch",
              subtitle: "Infosys unveils new AI platform",
              link: "https://example.com/infosys-ai-launch"
            },
            {
              date: "2025-06-27",
              title: "Q1 Earnings Call",
              subtitle: "Discussion on quarterly performance",
              amount: "",
              link: "https://example.com/infosys-q1-earnings"
            }
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-06-30T09:45:00Z",
              headline: "Infosys Partners with Global Tech Giant",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-06-29T13:15:00Z",
              headline: "IT Stocks Face Profit Booking",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 65000,
          sellOrderQuantity: 80000,
          buyOrders: [
            { price: "1823.50", quantity: 30000 },
            { price: "1822.25", quantity: 35000 }
          ],
          sellOrders: [
            { price: "1827.75", quantity: 40000 },
            { price: "1829.00", quantity: 40000 }
          ],
          bidTotal: 65000,
          askTotal: 80000
        },
        fundamentals: {
          marketCap: "760000 Cr",
          peRatioTTM: 26.40,
          pbRatio: 7.50,
          industryPE: 30.20,
          debtToEquity: 0.05,
          roe: 29.80,
          epsTTM: 69.15,
          dividendYield: 2.50,
          bookValue: 243.47,
          faceValue: 5
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 38000,
              profit: 7500,
              netWorth: 90000
            },
            {
              quarter: "Q4-2024",
              revenue: 37000,
              profit: 7200,
              netWorth: 88000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 150000,
              profit: 29000
            },
            {
              quarter: "2023",
              revenue: 140000,
              profit: 27000
            }
          ]
        },
        about: {
          description: "Infosys is a global leader in next-generation digital services and consulting...",
          parentOrganisation: "Infosys Limited",
          nseSymbol: "INFY",
          managingDirector: "Salil Parekh"
        }
      } as MostTradedOnGrowDocument
    ];

    // Insert sample data
    await MostTradedOnGrow.insertMany(sampleData);
    console.log('Sample data inserted successfully for MostTradedOnGrow');
  } catch (error) {
    console.error('Error inserting sample data for MostTradedOnGrow:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default MostTradedOnGrow;