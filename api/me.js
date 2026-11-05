const {auth}=require('./_lib');module.exports=(req,res)=>{if(!auth(req,res))return;res.status(200).json({ok:true})};
