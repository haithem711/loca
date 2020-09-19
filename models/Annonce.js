const mongoose=require('mongoose')

const { ObjectId } = mongoose.Schema;
const AnnonceSchema=new mongoose.Schema({
    postedBy : { type:ObjectId,
                 ref:"User"
              },
          
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
             
        ,
        type:{type:String},
        disponibilite: {
            type: String
        },
        title: {
            type: String,
            unique:true
          
        },
        prix: {
            type: Number,
           
        },
        description:{
            type:String
        },
        categorie: {
            type: String,
            
        },
        meublée:{
            type:String
        },
        photo:{
            data:Buffer,
            contentType: String

        },régions:{type:String},
        slug:{type:String,
        unique:true}
        /*
    categorie: {
        type: String,
        
    },
    typeAnnonce: {
        type: String,
       
    },

    
     

   
    discription: { type: String },
    galerie: [Schema.Types.MixedString],

    dateCreation: {
        type: Date,
        default: Date.now
    },
    //********************    champs differents    ***************** 
    meuble: { type: Boolean },
    option: [String],
    surfaceHabitable: { type: String },
    surfaceTerrain: { type: String },
    nbrChambre: { type: Number, min: 0 },
    nbrSalleDeBain: { type: Number, min: 0 },
    nbrEtage: { type: Number, min: 0 },
    nbrPiece: { type: Number, min: 0 },
    dateConstruction: { type: Date },*/

},{timestamps:true})
module.exports=mongoose.model('Annonce',AnnonceSchema)