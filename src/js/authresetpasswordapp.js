import {Authorize} from "./authorize.js";

// UI
const resetpasswordform = document.getElementById("resetpasswordform");
const msg = document.getElementById("msg");

// Reset Password
resetpasswordform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const resetemail = document.getElementById('resetemail').value.trim();

    const {resetPassword} = Authorize();
    resetPassword(resetemail,msg);
    
});
