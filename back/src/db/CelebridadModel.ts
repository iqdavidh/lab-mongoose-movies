import mongoose, {Document, Schema} from "mongoose";


export interface ICelebridad extends Document {
   id: any,
   name: string,
   occupation: string,
   catchPhrase: string

}

export const CelebridadSchema: Schema = new Schema(
    {
       name: {type: String, required: true},
       occupation: {type: String},
       catchPhrase: {type: String}

    })
;

export const CelebridadModel = mongoose.model<ICelebridad>('celebridades', CelebridadSchema);


