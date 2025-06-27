import mongoose, { Schema, Document, Types } from 'mongoose';

/** Dress Schema & Interface */
export interface IDress extends Document {
  name: string;
  image: string;
  price: number;
  colors: string[];
  about: string;
  gender: 'men' | 'women';
  isCommon: boolean;
  productCategory: string;
}

const DressSchema: Schema<IDress> = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    colors: [{ type: String, required: true }],
    about: { type: String, required: true },
    gender: { type: String, enum: ['men', 'women'], required: true },
    isCommon: { type: Boolean, default: false },
    productCategory: { type: String, required: true },
  },
  { timestamps: true }
);

/** Category Schema & Interface */
export interface ICategory extends Document {
  name: string;
  gender: 'men' | 'women';
  dresses: Types.ObjectId[];
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['men', 'women'], required: true },
    dresses: [{ type: Schema.Types.ObjectId, ref: 'Dress' }]
  },
  { timestamps: true }
);

/** Dress Details Schema & Interface */
export interface IDressDetails extends Document {
  dressId: Types.ObjectId;
  fit: string;
  materials: string;
  care: string;
  details: string;
  reviews: string;
  mainImages: string[]; // Array to store the three main images of the page
  sizeOptions: string[]; // Array of available sizes (XS, S, M, L, XL, XXL)
  modelInfo: string; // Info about the model (e.g., height and size worn)
  priceCurrency: string; // Currency symbol (e.g., ₹)
}

const DressDetailsSchema: Schema<IDressDetails> = new Schema(
  {
    dressId: { type: Schema.Types.ObjectId, ref: 'Dress', required: true },
    fit: { type: String },
    materials: { type: String },
    care: { type: String },
    details: { type: String },
    reviews: { type: String },
    mainImages: [{ type: String }], // Array of image URLs for the three main images
    sizeOptions: [{ type: String }], // Available sizes
    modelInfo: { type: String }, // Model details
    priceCurrency: { type: String } // Currency symbol
  },
  { timestamps: true }
);

/** Export Models */
export const DressModel = mongoose.model<IDress>('Dress', DressSchema);
export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
export const DressDetailsModel = mongoose.model<IDressDetails>('DressDetails', DressDetailsSchema);