

const validate=(schema)=>{
    return (req,res,next)=>{
        console.log(req.body);
        const result=schema.safeParse(req.body);
        console.log(result);
        if(!result.success){
            return res.json({message:"Input validation failed!"});
        }
        req.body=result.data;
        console.log(result)
        next();
    }
}
export default validate;