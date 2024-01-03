import connection from "../config/ConnectDB.js";
import validateContact from "../validations/ContactValidator.js"


export const getContact = (req, res) => {
    if (req.session.user) {
        let sql = "SELECT * FROM contacts WHERE `list_id` = ? and `belongs_to` = ?";
        connection.query(sql, [req.params.id, req.session.user.id], (err, result) => {
            if (err) {
                res.json({ operation: false, reason: err })
            } else {
                res.json({ operation: true, data: result });
            }
        })
    } else {
        return res.json({
            operation: false,
            reason: "user is not authorized!"
        })
    }
};

export const createContact = (req, res) => {
    if (req.session.user) {
        console.log(req.body);
        let validation = validateContact(req.body);
        if (validation.isValidate) {
            let sql = "INSERT INTO contacts(`name`,`email`,`profession`,`phone`,`address`,`gender`,`age`,`bio`,`belongs_to`,`list_id`) values (?)";
            let data = req.body;
            let values = [
                data.name,
                data.email,
                data.profession == "" ? null : data.profession,
                data.phone,
                data.address == "" ? null : data.address,
                data.gender == "" ? null : data.gender,
                data.age == "" ? null : data.age,
                data.bio == "" ? null : data.bio,
                req.session.user.id,
                data.list_id
            ];
            connection.query(sql, [values], (err, result) => {
                if (err) return res.json({ insertion: false, error: [err] });
                return res.json({ insertion: true })
            })

        } else {
            res.json({
                insertion: false,
                reason: "user is not authorized!",
            })
        }
    }
}



// Function For updating a contact!
export const updateContact = (req, res) => {
    if (req.session.user) {
        let validation = validateContact(req.body);
        if (validation.isValidate) {
            let sql = "UPDATE contacts set `name` = ?,`email` = ?,`profession` = ?,`phone` = ?,`address` = ?,`gender` = ?,`age` = ?,`bio` = ?  WHERE `id` = ?";
            let data = req.body;
            let values = [
                data.name,
                data.email,
                data.profession == undefined ? null : data.profession,
                data.phone,
                data.address == undefined ? null : data.address,
                data.gender == undefined ? null : data.gender,
                data.age == undefined ? null : data.age,
                data.bio == undefined ? null : data.bio,
                data.id
            ];
            connection.query(sql, values, (err, result) => {
                if (err) return res.json({ updation: false , reason: [err] });
                return res.json({ updation: true , result })
            })
        } else {
            return res.json({
                updation: false,
                reason: "validation error occured!"
            })
        }
    } else {
        return res.json({
            updation: false,
            reason: "user is not authorized!",
        })
    }

}


export const deleteContact = (req, res) => {
    console.log("requested!");
    if (req.session.user) {
        let sql = "DELETE FROM contacts where `id` = ? and `belongs_to` = ?";
        connection.query(sql, [req.params.id, req.session.user.id], (err, result) => {
            if (err) return res.json({ deleted: false, reason: "some error has been occured!" });
            return res.json({ deleted: true, result })
        });
    } else {
        return res.json({
            deleted: false,
            reason: "user is not authorized!",
        });
    };
};


export const deleteMultipleContacts = (req, res) => {
    if (req.session.user) {
        let id = JSON.parse(req.params.list);
        if (id.length > 0) {
            let sql = "DELETE FROM contacts where `id` IN " + `(${id.toString()})` + " and `belongs_to` = ?";
            connection.query(sql, [req.session.user.id], (err, result) => {
                if (err) return res.json({ deleted: false, reason: "some error has been occured!" });
                return res.json({ deleted: true, result });
            });
        }else{
            return res.json({
                deleted: false,
                reason: "no contact was selected!",
            }); 
        }
    } else {
        return res.json({
            deleted: false,
            reason: "user is not authorized!",
        });
    };
}