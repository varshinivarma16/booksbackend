import mongoose, { Document, Schema } from 'mongoose';

export interface ITopTraded extends Document {
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
    news: { source: string; timestamp: string; headline: string; highlight: boolean }[];
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

// Input type for insertMany (without Mongoose Document overhead)
export type ITopTradedInput = Omit<ITopTraded, keyof Document>;

const TopTradedSchema = new Schema<ITopTraded>({
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
const TopTradedModel = mongoose.model<ITopTraded>('TopTradedd', TopTradedSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Ensure MongoDB connection is ready
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB connection not ready, skipping sample data insertion');
      return;
    }

    // Check if collection is empty
    const count = await TopTradedModel.countDocuments();
    if (count > 0) {
      console.log('TopTraded collection already contains data, skipping sample data insertion');
      return;
    }

    // Sample data
    const sampleData: ITopTradedInput[] = [
      {
        name: "State Bank of India",
        price: "820.50",
        change: "+1.75",
        image: "https://example.com/images/sbi.png",
        priceHistory: [
          { date: "2025-07-02", price: 805.25 },
          { date: "2025-07-01", price: 800.60 },
          { date: "2025-06-30", price: 795.30 }
        ],
        details: {
          performance: {
            todaysLow: "800.00",
            todaysHigh: "825.00",
            low52Week: "650.00",
            high52Week: "850.00",
            todayCurrent: "820.50",
            open: "805.00",
            prevClose: "806.25",
            volume: "7000000",
            totalTradedValue: "5743500000",
            upperCircuit: "886.88",
            lowerCircuit: "725.63"
          },
          events: [
            "Q1 Results Release",
            "New Loan Scheme Launch"
          ],
          news: [
            {
              source: "Business Standard",
              timestamp: "2025-07-02T10:58:00Z",
              headline: "SBI Leads Trading Volume with Strong Q1 Results",
              highlight: true
            },
            {
              source: "Economic Times",
              timestamp: "2025-07-01T14:45:00Z",
              headline: "Banking Stocks Rally in High-Volume Trading",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 130000,
          sellOrderQuantity: 150000,
          buyOrders: [
            { price: "818.50", quantity: 65000 },
            { price: "817.25", quantity: 65000 }
          ],
          sellOrders: [
            { price: "822.75", quantity: 75000 },
            { price: "825.00", quantity: 75000 }
          ],
          bidTotal: 130000,
          askTotal: 150000
        },
        fundamentals: {
          marketCap: "730000 Cr",
          peRatioTTM: 10.80,
          pbRatio: 1.50,
          industryPE: 12.00,
          debtToEquity: 1.30,
          roe: 14.90,
          epsTTM: 76.02,
          dividendYield: 1.40,
          bookValue: 547.67,
          faceValue: 1
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 110000,
              profit: 17000,
              netWorth: 340000
            },
            {
              quarter: "Q4-2024",
              revenue: 105000,
              profit: 16500,
              netWorth: 330000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 420000,
              profit: 65000
            },
            {
              quarter: "2023",
              revenue: 400000,
              profit: 61000
            }
          ]
        },
        about: {
          description: "State Bank of India is the largest public sector bank in India, offering a wide range of banking services...",
          parentOrganisation: "Government of India",
          nseSymbol: "SBIN",
          managingDirector: "Dinesh Kumar Khara"
        }
      },
      {
        name: "Bajaj Finance",
        price: "7200.90",
        change: "-0.85",
        image: "https://example.com/images/bajajfinance.png",
        priceHistory: [
          { date: "2025-07-02", price: 7250.30 },
          { date: "2025-07-01", price: 7300.45 },
          { date: "2025-06-30", price: 7275.60 }
        ],
        details: {
          performance: {
            todaysLow: "7150.00",
            todaysHigh: "7300.00",
            low52Week: "6000.00",
            high52Week: "7800.00",
            todayCurrent: "7200.90",
            open: "7275.00",
            prevClose: "7262.05",
            volume: "4500000",
            totalTradedValue: "32404050000",
            upperCircuit: "7988.26",
            lowerCircuit: "6535.85"
          },
          events: [
            "New Lending Product Launch",
            "Analyst Meeting Update"
          ],
          news: [
            {
              source: "Moneycontrol",
              timestamp: "2025-07-02T10:58:00Z",
              headline: "Bajaj Finance Sees High Trading on New Product News",
              highlight: true
            },
            {
              source: "Financial Express",
              timestamp: "2025-07-01T13:45:00Z",
              headline: "NBFC Stocks Active in Volatile Market",
              highlight: false
            }
          ]
        },
        marketDepth: {
          buyOrderQuantity: 90000,
          sellOrderQuantity: 110000,
          buyOrders: [
            { price: "7198.50", quantity: 45000 },
            { price: "7197.25", quantity: 45000 }
          ],
          sellOrders: [
            { price: "7203.75", quantity: 55000 },
            { price: "7205.00", quantity: 55000 }
          ],
          bidTotal: 90000,
          askTotal: 110000
        },
        fundamentals: {
          marketCap: "445000 Cr",
          peRatioTTM: 35.20,
          pbRatio: 6.80,
          industryPE: 32.00,
          debtToEquity: 3.90,
          roe: 19.30,
          epsTTM: 204.54,
          dividendYield: 0.50,
          bookValue: 1058.82,
          faceValue: 2
        },
        financials: {
          quarterly: [
            {
              quarter: "Q1-2025",
              revenue: 15000,
              profit: 4000,
              netWorth: 65000
            },
            {
              quarter: "Q4-2024",
              revenue: 14500,
              profit: 3800,
              netWorth: 63000
            }
          ],
          yearly: [
            {
              quarter: "2024",
              revenue: 58000,
              profit: 15000
            },
            {
              quarter: "2023",
              revenue: 54000,
              profit: 14000
            }
          ]
        },
        about: {
          description: "Bajaj Finance is a leading non-banking financial company in India, offering consumer finance and lending services...",
          parentOrganisation: "Bajaj Group",
          nseSymbol: "BAJFINANCE",
          managingDirector: "Rajeev Jain"
        }
      }
    ];

    // Insert sample data
    await TopTradedModel.insertMany(sampleData);
    console.log('Sample data inserted successfully for TopTraded');
  } catch (error) {
    console.error('Error inserting sample data for TopTraded:', error);
  }
}

// Execute sample data insertion when model is loaded, but only after connection is ready
mongoose.connection.once('connected', () => {
  console.log('MongoDB connected, attempting to insert sample data for TopTraded');
  insertSampleData();
});

export default TopTradedModel;