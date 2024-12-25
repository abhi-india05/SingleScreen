const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const User=require("./models/User");
const signToken=require("../Auth");

const verifyAccessToken=require("../Auth");
const authenticateToken=require("../Auth");

const userSignUp=async(req,res,next)=>{
    try{
        let{name,email,password}=req.body;
        if(!name||!email||!password){}
        res.json({message:"some error occured"});
        const hashedPassword=await bcrypt.hash(password,12);
       const newUser= await User.create({
       name,email,password:hashedPassword});
        const token=signToken(newUser._id);
        res.status(201).json({
            status:"success",
            token,
            data:{
                user:newUser
            }
        });
        next();
    }catch(error){
        console.log("error occured while creating the user:"+error);
    }
}

const userLogin=async(req,res,next)=>{
    let {email,password}=req.body;
    if(!email|!password){
        res.status(400).json({
            status:"failed",
            message:"email or password missing"
        });
    }
    try{
       let findUser= await User.findOne({email});
       if(!findUser||!(await bcrypt.compare(password,findUser.password)));

        res.send(401).json({
    status:"fail",
    message:"email or password incorrect"
    });

    const token=signToken(findUser._id);
    res.status(200).json({
        status:"success",
        token,
        data:{
            user:{
                name:findUser.name,
                email:findUser.email
            }
        }
    });
    next();
    }
    catch(error){
        res.status(500).json({status:"fail",message:"Internal Server Error"});
    }
}

const isLoggedInUser=(user,req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
      }
      const decoded=jwt.verify(token,JWT_secret);

      if(decoded.equals(user)) next();
      else res.status(401).json({
        status:"fail",
        message:"unauthorized access"
      })

    
}


module.exports={
    userSignUp,
    userLogin
}