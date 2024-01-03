const HandleLogout = (req , res) => {
    req.session.destroy(err => {
        if (err) {
            return {logout: false , reason : err};
        }
        res.clearCookie("connect.sid")
        return res.json({logout: true})
    })    
    console.log(res.session);
}

export default HandleLogout;