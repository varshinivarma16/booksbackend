import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPriceHistory {
  date: string;
  price: number;
}

interface IEvent {
  date: string;
  title: string;
  subtitle: string;
  amount?: string;
  link?: string;
}

interface INews {
  source: string;
  timestamp: string;
  headline: string;
  highlight: boolean;
}

interface IDetails {
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
  events: IEvent[];
  news: INews[];
}

interface IMarketDepth {
  buyOrderQuantity: number;
  sellOrderQuantity: number;
  buyOrders: { price: string; quantity: number }[];
  sellOrders: { price: string; quantity: number }[];
  bidTotal: number;
  askTotal: number;
}

interface IFundamentals {
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
}

interface IFinancial {
  quarter: string;
  revenue: number;
  profit: number;
  netWorth?: number;
}

interface IAbout {
  description: string;
  parentOrganisation: string;
  nseSymbol: string;
  managingDirector: string;
}

export interface IStock extends Document {
  name: string;
  price: string;
  change: string;
  image: string;
  priceHistory: IPriceHistory[];
  details: IDetails;
  marketDepth: IMarketDepth;
  fundamentals: IFundamentals;
  financials: {
    quarterly: IFinancial[];
    yearly: IFinancial[];
  };
  about: IAbout;
}

const topmarketSchema = new Schema<IStock>({
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
    events: [{ date: String, title: String, subtitle: String, amount: String, link: String }],
    news: [{ source: String, timestamp: String, headline: String, highlight: Boolean }],
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
});

// Create the model
const Topmarket: Model<IStock> = mongoose.models.Topmarket || mongoose.model<IStock>('Topmarket', topmarketSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Check if collection is empty
    const count = await Topmarket.countDocuments();
    if (count > 0) {
      console.log('Topmarket collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: IStock[] = [
      {
        name: "HDFC Bank",
        price: "1650.45",
        change: "+1.85",
        image: "https://example.com/images/hdfcbank.png",
        priceHistory: [
          { date: "2025-07-02", price: 1620.30 },
          { date: "2025-07-01", price: 1610.75 },
          { date: "2025-06-30", price: 1600.50 }
        ],
        details: {
          performance: {
            todaysLow: "1610.00",
            todaysHigh: "1660.00",
            low52Week: "1400.00",
            high52Week: "1700.00",
            todayCurrent: "1650.45",
            open: "1620.00",
            prevClose: "1620.60",
            volume: "4000000",
            totalTradedValue: "6601800000",
            upperCircuit: "1782.66",
            lowerCircuit: "1458.54"
          },
          events: [
            {
              date: "2025-07-02",
              title: "Dividend Declaration",
              subtitle: "HDFC Bank announces interim dividend for FY25",
              amount: "20 per share",
              link: "https://example.com/hdfc-dividend"
            },
            {
              date: "2025-06-30",
              title: "Q1 Results",
              subtitle: "HDFC Bank reports strong quarterly performance",
              link: "https://example.com/hdfc-q1-results"
            }
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-07-02T10:30:00Z",
              headline: "HDFC Bank Gains on Dividend Announcement",
              highlight: true
            },
            {
              source: "Business Standard",
              timestamp: "2025-07-01T14:45:00Z",
              headline: "Banking Stocks Show Resilience in Volatile Market",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 90000,
          sellOrderQuantity: 110000,
          buyOrders: [
            { price: "1648.50", quantity: 45000 },
            { price: "1647.25", quantity: 45000 }
          ],
          sellOrders: [
            { price: "1652.75", quantity: 55000 },
            { price: "1655.00", quantity: 55000 }
          ],
          bidTotal: 90000,
          askTotal: 110000
        },
        fundamentals: {
          marketCap: "1250000 Cr",
          peRatioTTM: 18.20,
          pbRatio: 2.70,
          industryPE: 18.50,
          debtToEquity: 0.85,
          roe: 15.80,
          epsTTM: 90.68,
          dividendYield: 1.15,
          bookValue: 611.11,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 55000,
              profit: 16000,
              netWorth: 230000
            },
            {
              quarter: "Q4-2024",
              revenue: 53000,
              profit: 15500,
              netWorth: 225000
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
          description: "HDFC Bank is one of India's leading private sector banks, offering a wide range of financial services...",
          parentOrganisation: "HDFC Group",
          nseSymbol: "HDFCBANK",
          managingDirector: "Sashidhar Jagdishan"
        }
      } as IStock,
      {
        name: "Infosys",
        price: "1800.65",
        change: "-0.95",
        image: "https://example.com/images/infosys.png",
        priceHistory: [
          { date: "2025-07-02", price: 1820.40 },
          { date: "2025-07-01", price: 1835.25 },
          { date: "2025-06-30", price: 1810.70 }
        ],
        details: {
          performance: {
            todaysLow: "1790.00",
            todaysHigh: "1830.00",
            low52Week: "1600.00",
            high52Week: "1900.00",
            todayCurrent: "1800.65",
            open: "1820.00",
            prevClose: "1817.60",
            volume: "3500000",
            totalTradedValue: "6302275000",
            upperCircuit: "1999.36",
            lowerCircuit: "1635.84"
          },
          events: [
            {
              date: "2025-07-01",
              title: "New Cloud Partnership",
              subtitle: "Infosys collaborates with global cloud provider",
              link: "https://example.com/infosys-cloud"
            },
            {
              date: "2025-06-29",
              title: "Analyst Downgrade",
              subtitle: "Brokerage lowers rating due to margin concerns",
              link: "https://example.com/infosys-downgrade"
            }
          ],
          news: [
            {
              source: "Financial Express",
              timestamp: "2025-07-02T09:15:00Z",
              headline: "Infosys Faces Margin Pressure, Stock Declines",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-07-01T13:30:00Z",
              headline: "IT Stocks Show Mixed Performance",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 70000,
          sellOrderQuantity: 90000,
          buyOrders: [
            { price: "1798.50", quantity: 35000 },
            { price: "1797.25", quantity: 35000 }
          ],
          sellOrders: [
            { price: "1802.75", quantity: 45000 },
            { price: "1805.00", quantity: 45000 }
          ],
          bidTotal: 70000,
          askTotal: 90000
        },
        fundamentals: {
          marketCap: "750000 Cr",
          peRatioTTM: 25.40,
          pbRatio: 7.50,
          industryPE: 30.00,
          debtToEquity: 0.10,
          roe: 30.20,
          epsTTM: 70.89,
          dividendYield: 2.10,
          bookValue: 240.00,
          faceValue: 5
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 39000,
              profit: 7500,
              netWorth: 90000
            },
            {
              quarter: "Q4-2024",
              revenue: 38000,
              profit: 7300,
              netWorth: 88000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 155000,
              profit: 29000
            },
            {
              quarter: "2023",
              revenue: 145000,
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
      } as IStock
    ];

    // Insert sample data
    await Topmarket.insertMany(sampleData);
    console.log('Sample data inserted successfully for Topmarket');
  } catch (error) {
    console.error('Error inserting sample data for Topmarket:', error);
  }
}

// Execute sample data insertion when model is loaded
insertSampleData();

export default Topmarket;