
const PostModel  = require("../models/Post")

const SharePost=async(req,res)=>{
  const {body,photo} = req.body 
 //securité
  req.user.password = undefined
  req.user.confirmPassword= undefined
  const post = new PostModel({
   
      body,
      photo,
      postedBy:req.user
  })
  post.save().then(result=>{
      res.json({post:result})
  })
  .catch(err=>{
      console.log(err)
  })
}
const SubPost=async(req,res)=>{
 // if postedBy in following
 /**** eli 3amletlou follow tedher el post mta3ou */
 PostModel.find({postedBy:{$in:req.user.following}})
 .populate("postedBy","_id fullname pic email")
 .populate("comments.postedBy","_id fullname pic email")
 .sort('-createdAt')
 .then(posts=>{
     res.json(posts)
     //console.log(posts)
 })
 .catch(err=>{
     console.log(err)
 })
}
const allPost =async(req,res)=>{
    PostModel.find()
    .populate("postedBy","_id fullname email pic")
    .populate("comments.postedBy","_id fullname email pic")
    .sort('-createdAt')
    .then((posts)=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err)
    })
}
/****const lik = async(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })


}

const dis = async(req,res)=>{
    PostModel.findOneAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},{
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
}

*/

const likes = async (req, res) => {
    const {postId}= req.body;
    const id=req.user._id;
   
   
  
   const like = await PostModel.findById(postId); 
   
   
   if (!like.likes.includes(id)) {
     await like.updateOne({ $push: { likes: id } });
    
     res.status(200).json("User likes!");
   } else {
     res.status(403).json("you are already like this user");
   }
  
   
   
   };
   
   
   
const dislikes = async (req, res) => {
     const {postId}= req.body;
     const id=req.user._id;
    
   
   
    const dislikes= await PostModel.findById(postId); 
   
   if (dislikes.likes.includes(id)) {
     await dislikes.updateOne({ $pull: { likes: id } });
    
     res.status(200).json("User UnLikes!");
   } else {
     res.status(403).json("you are already unlikes this post");
   }
   
   
   
   
   
     /**** UserModel.findByIdAndUpdate(unfollowId,{
           $pull:{followers:id}
       },{
           new:true
       },(err,result)=>{
           if(err){
               return res.status(422).json({error:err})
           }
         UserModel.findByIdAndUpdate(id,{
             $pull:{following:unfollowId}
             
         },{new:true}).select("-password").then(result=>{
             res.json(result)
         }).catch(err=>{
             return res.status(422).json({error:err})
         })
   
       }
       ) */
   };
const createComment = async (req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
     PostModel.findOneAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id  fullname pic ")
    .populate("postedBy","_id  fullname pic ").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })

 

}


/**
 * regular expression use in replace , split search , match, 
 * test , validation email , 
 * var s= 'ismahen abdaLlah'
 * ==> use search
 * result = s.search(/l/)
 *  /i/ ==> pattern  yetsama 
 *  search 'sensible a la casse' 
 *  ==> use replace 
 * result = s.replace(/l/, '@') --> heka sensible a la casse zeda bech ybadel
 * kan el minuscule eli bech ya3rdou f awel 
 * result =s.replace(/l/i, '@') --> mich ya3mil replace l awel  caracter majus or minuscule ya3rdou khaw 
 *  result =s.replace(/l/gi, '@') --> global search --> ybadel el caracter el kol  boucle kamil 
 */
module.exports={
  SharePost,SubPost, allPost,likes,dislikes,createComment, 
}