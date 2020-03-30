export interface Movie {
    id?: string;
    title?:string;
    descrition?:string;
    type?:string;
    publishdate?:string | Date;
    director?:string;
    superstare?:string;
    posterUrl?:string;
    trailerUrl?:string;
    numviews?:number;
    country?:string;
    ReleaseDate?:Date;
    writers?:string;
    runtime?:number;
    imgname?:string
}
