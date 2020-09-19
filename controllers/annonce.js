const mongoose=require('mongoose')
const { smartTrim } = require('../helpers/annonce');
const _=require('lodash')
const Annonce=require ('../models/Annonce')
const formidable = require('formidable');
const slugify = require('slugify');
const fs = require('fs');
const User=require('../models/User')

exports.allAnnonce= (req, res) => {
    
    Annonce.find({})
        .then(annonce => res.json(annonce), )
        .catch(err => console.log(err.message))
}
exports.newAnnonce=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        
        const { title, description, disponibilite,prix,categorie,meublée,régions,adresse,lng,lat,type} = fields;

    
        if (!title || !title.length) {
            return res.status(400).json({
                error: 'titre est obligatoire'
            });
        }
        if (!adresse || !adresse.length) {
            return res.status(400).json({
                error: 'adresse est obligatoire'
            });
        }
        if (!meublée ) {
            return res.status(400).json({
                error: 'meublée est obligatoire'
            });
        }
        if (!régions ) {
            return res.status(400).json({
                error: 'régions est obligatoire'
            });
        }
        /*if (!marker ) {
            return res.status(400).json({
                error: 'svp mark la postition de la maison'
            });
        }*/
        if (!prix) {
            return res.status(400).json({
                error: 'prix est obligatoire'
            });
        }

        if (!categorie ) {
            return res.status(400).json({
                error: 'catégorie est obligatoire'
            });
        }
        if (!disponibilite ) {
            return res.status(400).json({
                error: 'disponibilite est obligatoire '
            });
        }
        if (!type ) {
            return res.status(400).json({
                error: 'type est obligatoire '
            });
        }

        if (!description || description.length < 5) {
            return res.status(400).json({
                error: 'Description is too short'
            });
        }
            let annonce=new Annonce()
            annonce.lat=lat
            annonce.lng=lng
            annonce.type=type
            annonce.adresse=adresse 
            annonce.disponibilite=disponibilite
            annonce.régions=régions
            annonce.categorie=categorie
            annonce.title = title;
            
            annonce.prix=prix;
            annonce.meublée=meublée;
            annonce.description = description;
            annonce.mdesc = smartTrim(description,100, ' ', ' ...');
            annonce.slug = slugify(title).toLowerCase();
            annonce.mtitle = `${title}`;
            annonce.postedBy = req.user._id;
        // categories and tags
       
      //photo
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            annonce.photo.data = fs.readFileSync(files.photo.path);
            annonce.photo.contentType = files.photo.type;
          
        } else {return res.status(400).json({error:'upload photo'})}

    
     


        annonce.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "error uploading movies"
                });
            }
            res.json(result);})


 })

}

exports.filtre=(req,res)=>{
 //   let limit = req.query.limit ? parseInt(req.query.limit) :7;
    
    const{categorie,disponibilite,meuble,type,regions,prix}=req.query
    

    if((categorie || disponibilite||meuble||type||regions||prix)){
        Annonce.find({
            $and: [{ categorie: { $regex : categorie }}  ,{ disponibilite: { $regex : disponibilite }},{ meublée: { $regex : meuble }}
                ,{ type: { $regex : type }},{ régions: { $regex : regions }},{ prix: { $gte : prix }  } ]
        },(err,annonce)=>{
            if(err)
            {return res.status(400).json({error:'error'})}
            res.json(annonce)
        }).select('-photo')
      //  .limit(limit)
        .sort('-updatedAt')
        .populate('postedBy', '_id name numtel ')

    }
}

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Annonce.findOne({ slug })
        .select('photo')
        .exec((err, annonce) => {
            if (err || !annonce) {
                return res.status(400).json({
                    error: 'error photo'
                });
            }
            res.set('Content-Type', annonce.photo.contentType);
            return res.send(annonce.photo.data);
            
        });
};


exports.annonce=(req,res)=>{



    Annonce.find({postedBy:req.user._id}).select('-photo')  .exec((err,result)=>{
        if (err){console.log({error:'error'})}
        res.json(result)       
    })


}

exports.remove=(req,res)=>{
    const slug=req.params.slug.toLowerCase()
    
    Annonce.findOneAndRemove({slug}).exec((err,result)=>{
        if (err){console.log({error:'suppression invalide '})}
        res.json({message:'suppression valide'})
       
    })
}

exports.update=(req, res) => {
    const slug = req.params.slug.toLowerCase();

    Annonce.findOne({ slug }).exec((err, oldannonce) => {
        if (err) {
            return res.status(400).json({
                error: 'Error find'
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldannonce.slug;
            oldannonce = _.merge(oldannonce, fields);
            oldannonce.slug = slugBeforeMerge;

            const {  title, description, disponibilite,prix,categorie,meublée,régions,adresse,lng,lat,type } = fields;

            if (description) {
                oldannonce.mdesc = smartTrim(description, 100, ' ', ' ...');
               
            }

            

           if(title){
            oldannonce.slug=slugify(title).toLowerCase()
           }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldannonce.photo.data = fs.readFileSync(files.photo.path);
                oldannonce.photo.contentType = files.photo.type;
            }

            oldannonce.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error:'Error Update'
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};


exports.oneAnnonce=(req,res)=>{
    const slug =req.params.slug.toLowerCase()

    Annonce.findOne({slug}).select('-photo').exec((err,result)=>{
        if (err) {return res.status(404).json({ error :'error'})}
        res.json (result)})
}

exports.list =(req, res )=> { 
    const slug = req.params.slug.toLowerCase()
    Annonce.findOne({slug}).select('-photo').populate('postedBy', 'id name numtel'). exec((err,result)=>{
        if (err){ return res . status (404).json ({ error :'error'})}
        res.json (result)
    })
}