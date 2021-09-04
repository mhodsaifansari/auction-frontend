import axios  from "axios";

const loginHook=(username,password)=>{

    return new Promise( (resolve,reject)=>{
        axios.post("http://mhodsaifansari.pythonanywhere.com/api/login",{
        'username':username,
        'password':password})
    .then((response)=>{resolve(response.data)})
    .catch((err)=>{reject(err);})

    });


}
export default loginHook