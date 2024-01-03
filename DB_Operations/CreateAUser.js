import connection from "../config/ConnectDB";
const createAUser = (req , res) => {
    let sql = "SELECT * FROM users WHERE `email` = ?";
    let data = req.body;
    connection.query(sql,[data.email],(err , result)=>{
        if(err) return res.json({creation: "failed", reason: err});
        if (result.length > 0) {
            return res.json({creation: "failed", reason: "Your account is already created, consider signing in!"});
        }else{
            let sql = "INSERT INTO users(`name`,`email`,`password`) VALUES (?) ";
            let values = [
                data.name,
                data.email,
                data.password
            ];
            connection.query(sql,[values],(err , result)=>{
                if (err) return {creation: "failed", reason: err};
                return {creation: "successful", result: result}
            });
        }
    })
};

export default createAUser;