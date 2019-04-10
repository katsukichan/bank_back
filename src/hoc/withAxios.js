import React from 'react';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL ='http://localhost:2000';

export default (Con)=>{
    return function(props,context){
        return <Con axios={axios} {...props} {...context}/>
    }
}