import connection from "../config/ConnectDB.js";

const LoginHandler = (req , res) => {
    let sql = "SELECT * FROM users where `email` = ? and `password` = ?";
    let values = [
        req.body.email,
        req.body.password
    ];
    connection.query(sql,values,(err , result)=>{
        if(err) return res.json({login: false , reason: "Something went wrong"});
        if (result.length > 0) {
            req.session.user = {
                id: result[0].id,
                name: result[0].name
            };
            console.log(req.session);
            return res.json({login: true , info: req.session.user});
        }else{
            return res.json({login: false , reason: "Incorrect Email or Password!"})
        };
    });
    
}
export default LoginHandler;