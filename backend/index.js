const express=require("express");
const app=express();
require("./db/config");
const mailer=require("./sendmail");
let user=require("./db/user")
app.use(express.json());
const cor=require("cors");
const problem=require("./db/userproblems");
let subj="<h3>Dear User</h3><br><h3>Being a responsible student you have the responsibilty of improving the beautiful campus and improving the facilities provided by it and you have the full right to complain against any services you find inconvenient , so lets move forward and create a change .</h3>"
const problemAcceptanceMail=require("./problemAcceptancsMail");
const messRating=require("./db/messRating");
const problemSolverMail=require("./problemSolverMail");
app.use(cor(
    origin: 'https://hostel-mangement-with-mern-stack-frontend.vercel.app', 
  methods:["GET","PUT","POST","DELETE"], 
  credentials: true, 
));
app.use(cors({ origin: 'https://hostel-mangement-with-mern-stack-frontend.vercel.app' }));
app.get("/",(req,resp)=>{
    resp.send("Launching api");
})
app.post("/signup", async (req,resp)=>{
      let data=new user(req.body);
      let response=await data.save();
      if(response){
        resp.send(response);
        mailer(subj,`Congratulations ${response.username} ! You have been Logged in , enjoy our services`,`uJEX Webservices`,response.email)
      }
});
app.post("/login", async (req,resp)=>{
    let searched_data=await user.findOne(req.body);
    if(searched_data){
        resp.send({result:true,email:searched_data.email})
    }
    else{
        resp.send({result:false});
    }
});
app.post("/rateMess", async (req,resp)=>{
    let response=new messRating(req.body);
    let result=await response.save();
   if(result){
    resp.send({result:true});
   }
   else{
    resp.send({result:false});
   }
})
app.post("/postproblem",async (req,resp)=>{
   let response=new problem(req.body);
   let result=await response.save();
  resp.send(result);
   let userEmailSender=result.useremail;
   if(result.receiverEmail!==""){
   if(result.userIdentity==="Anonymous"){
    let SubjectTitle="Confirmation of receiving your problem Status";
    let webServiceProvider=`uJEX Webservices`;
    let receiverEMail=result.receiverEmail;
    
    let Body="<h3>Dear User ,</h3><br><h3>We consider your problem as ours and assure your anonimity to be kept secret to us only , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>"
       let problemsolverBody="<h3>Dear Sir/Mam ,</h3><br><h3>Hope this mailfinds you well. A user has recently posted a problem and has requested you to look into the matter kindly get the info in your dashboard</h3><br><h3>WIth best regards</h3><br><h3>ujEX webservices</h3>"
       let problemsolver_title="A user has recently posted a problem";
       problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       problemSolverMail(problemsolverBody,problemsolver_title,webServiceProvider,receiverEMail);
   }
   else{
    let SubjectTitle="Confirmation of receiving your problem Status";
    let webServiceProvider=`uJEX Webservices`;
    let receiverEMail=result.receiverEmail;
    let userNameSender=result.username;
    let problemsolverBody="<h3>Dear Sir/Mam ,</h3><br><h3>Hope this mailfinds you well. A user has recently posted a problem and has requested you to look into the matter kindly get the info in your dashboard</h3><br><h3>WIth best regards</h3><br><h3>ujEX webservices</h3>"
    let problemsolver_title=`${userNameSender} has recently posted a problem`;
    let Body=`<h3>Dear ${userNameSender} ,</h3><br><h3>We consider your problem as ours , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>`
       problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       problemSolverMail(problemsolverBody,problemsolver_title,webServiceProvider,receiverEMail);

   }
   }
   else{
    if(result.userIdentity==="Anonymous"){
        let SubjectTitle="Confirmation of receiving your problem Status";
        let webServiceProvider=`uJEX Webservices`;
       
        
        let Body="<h3>Dear User ,</h3><br><h3>We consider your problem as ours and assure your anonimity to be kept secret to us only , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>"
           problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       }
       else{
        let SubjectTitle="Confirmation of receiving your problem Status";
        let webServiceProvider=`uJEX Webservices`;
        
        let userNameSender=result.username;
        let Body=`<h3>Dear ${userNameSender} ,</h3><br><h3>We consider your problem as ours , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>`
           problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       }
   }
})
app.get("/fetchComplains/:userName/:userEmail",async (req,resp)=>{
    let data=await problem.find({username:req.params.userName,useremail:req.params.userEmail});
    resp.send(data);


})
app.delete("/deleteComplain/:userName/:userEmail/:problemDescription",async (req,resp)=>{
    let response=await problem.deleteOne({username:req.params.userName,useremail:req.params.userEmail,problemDescription:req.params.problemDescription});
    resp.send(response);
})
app.get("/messRatings/:username/:email",async (req,resp)=>{
    let data=await messRating.find({student_name:req.params.username,email:req.params.email});
    resp.send(data);
})
app.put("/changePassword/:username/:userEmail",async (req,resp)=>{
    let response=await user.updateOne({username:req.params.username,email:req.params.userEmail},{
        $set:{password:req.body.password}
    })
    resp.send(response)
})
app.listen(5000);
