import "@fortawesome/fontawesome-free/css/all.min.css";
import {Authorize} from "./authorize.js";

// UI
const signinform = document.getElementById("signinform");
const googleloginbtn = document.getElementById('googleloginbtn');

// Login
signinform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const signinemail = document.getElementById('signinemail').value.trim();
    const signinpassword = document.getElementById('signinpassword').value.trim();

    const {loginUser} = Authorize();
    loginUser(signinemail,signinpassword);
    
});


// Google Login
googleloginbtn.addEventListener('click',()=>{

    const {googleLogin} = Authorize();
    googleLogin();

});