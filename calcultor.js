import { read_data_from_json } from "./menager_data_from_json.js";

const data  = await read_data_from_json()



export function Server_Startup_Notification(){
    ((req,res)=>{
        res.end("The router is working properly.")
     })
}


export function get_heros_by_id(req,res){
    const get_hero = data.find(obj => obj.id == req.params.id) 
    res.end(JSON.stringify(get_hero))}






function return_all_heroes(req,res){
    res.end(JSON.stringify(data,null,4))}
    
function serarch_data(req,res){
    const list_of_query = Object.entries(req.query)
    const searchParams = data.filter(obj => {
    return list_of_query.every(([key,val]) => obj[key] == val)
    })
    res.end(JSON.stringify(searchParams,null,4))
     
}







export function heroes(req,res){
      if (Object.keys(req.query).length === 0){
        return_all_heroes(req,res)
      }
      const obj_of_query = req.query
      serarch_data(data,obj_of_query,req,res)

}


