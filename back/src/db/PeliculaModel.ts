import mongoose, {Document, Schema} from "mongoose";


export interface IPelicula extends Document {
   id: any,
   title: string,
   genre: string,
   plot: string

}

export const PeliculaSchema: Schema = new Schema(
    {
       title: {type: String, required: true},
       genre: {type: String},
       plot: {type: String}
    })
;

export const PeliculaModel = mongoose.model<IPelicula>('peliculas', PeliculaSchema);


