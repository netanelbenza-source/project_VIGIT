import {Server_Startup_Notification,heroes,get_heros_by_id} from "./calcultor.js" 

export default {
    GET:{
     "health/": Server_Startup_Notification,
    //   "heroes/":heroes,
      'heroes/:id':get_heros_by_id

    }
    

}
