import connection from "../config/ConnectDB.js";

const HandleSignup = (req, res) => {
    console.log(req.body);
    // it will run multiple queries , one will be to check If the user is already present and if it is then it will send error message
    let data = req.body;
    if (data.email !== "" && data.password !== "") {
        let sql = "SELECT * FROM users WHERE `email` = ?";
        connection.query(sql, [data.email], (err, result) => {
            if (err) return res.json({ signup: false, reason: err });
            if (result.length > 0) {
                return res.json({ signup: false, reason: "Your account is already created, consider signing in!" });
            } else {
                let sql = "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
                let values = [
                    data.name,
                    data.email,
                    data.password
                ];
                connection.query(sql, [values], (err, info) => {
                    if (err) return res.json({ signup: false, reason: err });
                    // if the user is created then a default list for him/her will be created !
                    if (info.affectedRows == 1) {
                        // creating a default list
                        let sql = "INSERT INTO lists(`listName`,`belongs_to`,`discription`) VALUES (?)";
                        let values = [
                            "Default",info.insertId,"This is a default list"
                        ]
                        connection.query(sql, [values], (err, result) => {
                            console.log(result);
                            if (err) {
                                return res.json({ signup: true, result: result });
                            }else{
                                return res.json({ signup: true, result: result });
                            }
                        })
                    }
                });
            }
        })
    } else {
        return res.json({
            signup: false,
            reason: "email or password can't be undefined!"
        });
    };
};

export default HandleSignup;