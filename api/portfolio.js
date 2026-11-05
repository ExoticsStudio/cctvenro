const {auth,readData,writeData,id,youtubeId}=require('./_lib');
module.exports=async(req,res)=>{try{if(req.method==='GET'){const {data}=await readData();return res.status(200).json(data)}if(req.method!=='PUT')return res.status(405).json({error:'Method not allowed'});if(!auth(req,res))return;const body=req.body||{};const {data,sha}=await readData();data.projects=data.projects||[];data.videos=data.videos||[];
if(body.action==='addVideo'){const yid=youtubeId(body.url||'');if(!yid)return res.status(400).json({error:'URL YouTube tidak valid.'});data.videos.unshift({id:id(),title:String(body.title||'Video Enro CCTV').slice(0,90),youtubeId:yid,description:String(body.description||'').slice(0,180),published:true,createdAt:new Date().toISOString()})}
else if(body.action==='deleteVideo'){data.videos=data.videos.filter(x=>x.id!==body.id)}
else if(body.action==='deleteProject'){data.projects=data.projects.filter(x=>x.id!==body.id)}
else return res.status(400).json({error:'Aksi tidak dikenal.'});
await writeData(data,sha,'Update Enro CCTV portfolio');return res.status(200).json({ok:true,data})}catch(e){return res.status(500).json({error:e.message})}};
