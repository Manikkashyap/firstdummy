import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUser, UpdateUser, User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public newUser: User ={
    name:'',
    email:'',
    contact:'',
    address:'',
    password:'',
  }

  public existingUser : loginUser={
    email:'',
    password:''
  }

  constructor( private http:HttpClient) { }

  // To register user

  register(user:User)
  {
    environment.BACKEND_URL
    // return this.http.post('http://localhost:3000/newuser',user)
    return this.http.post(environment.BACKEND_URL+'newuser',user)
  }

  // To display particular user

  display(id:any){
    // return this.http.get('http://localhost:3000/selectRecord/'+id);
    return this.http.get(environment.BACKEND_URL+'selectRecord/'+id);

  }

  // For Authenticate user at the time of login

  login(existUser: loginUser)
  {
    // return this.http.post('http://localhost:3000/auth',existUser);
    return this.http.post(environment.BACKEND_URL+'auth',existUser);
  }

  // Delete selected user

  delete(id:any){
    return this.http.delete(environment.BACKEND_URL+'del/'+id);
  }

  // update selected user

  update(updateuser:UpdateUser,id:any){
    return this.http.put(environment.BACKEND_URL+'updateRecord/'+id,updateuser);
  }

  // Get All records from the database

  getall(){
    return this.http.get(environment.BACKEND_URL+'getall');
  }

  // API for uploading image

  uploadimage(id:any){
    return this.http.post(environment.BACKEND_URL+'imageupload/'+id,Image);
  }

  // API for upload display image

  displayuploadimage(id:any){
    // return this.http.get('http://localhost:3000/displayimage/'+id);
    return this.http.get(environment.BACKEND_URL+'displayimage/'+id);
  }

  //to store userid

  setuserId(id:string)
  {
    localStorage.setItem('userid',id);
  }
  getuserId()
  {
    return localStorage.getItem('userid');
  }
  deleteuserId()
  {
    localStorage.removeItem('userid');
  }


// To set token after login

setToken(token:string){
  localStorage.setItem('usertoken',token);
}

getToken(){
  return localStorage.getItem('usertoken');
}

deleteToken(){
  return localStorage.removeItem('usertoken');
}

// get token and decoded

getPayload(){
  var token = JSON.stringify(this.getToken());
  var userpayload = atob(token.split('.')[1]);
    if (userpayload)
    {
      return JSON.parse(userpayload);
    }
   else
    {
     return null;
    }
}

// islogedin for authguard

islogedIn()
{
  var userpayload=this.getPayload();
  if(userpayload){
    return userpayload.exp>Date.now()/1000;
  }
  else{
    return null;
  }
}



}
