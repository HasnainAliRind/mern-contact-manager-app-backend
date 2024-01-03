import connection from "../config/ConnectDB.js";

// Function for reading a list
export const getListsData = (req, res) => {
    if (req.session.user) {
        let sql = "SELECT * FROM lists WHERE `belongs_to` = ?";
        connection.query(sql, [req.session.user.id], (err, result) => {
            if (err) {
                res.json({ operation: true, reason: err })
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
// Function for creating a list
export const createList = (req, res) => {
    if (req.session.user) {
        if (req.body.listName == "") {
            return res.json({
                operation: false,
                reason: "Name of list shouldn't be empty!"
            })
        } else {
            let sql = "INSERT INTO lists(`listName`,`discription`,`belongs_to`) VALUES (?)";
            let values = [
                req.body.listName,
                req.body.discription,
                req.session.user.id
            ];
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    return res.json({
                        operation: false,
                        reason: "An Error has been occured!"
                    })
                } else {
                    return res.json({
                        operation: true,
                        data: result
                    });
                }
            })
        }
    }
};

// Function for updating a list
export const updateList = (req, res) => {
    if (req.session.user) {
        if (req.body.listName !== "") {
            let sql = "UPDATE lists set `listName` = ? , `discription` = ?  where `id` = ? and `belongs_to` = ?";
            connection.query(sql, [req.body.listName, req.body.discription, req.body.list_id, req.session.user.id], (err, results) => {
                if (err) {
                    res.json({
                        updation: false,
                        reason: err
                    });
                } else {
                    res.json({
                        updation: true,
                        result: results
                    });
                }
            });
        } else {
            return res.json({
                updation: false,
                reason: "list name should not be empty!"
            });
        }
    } else {
        return res.json({
            updation: false,
            reason: "user is not authorized!"
        });
    };
};

// Function for deleting a list
export const deleteList = (req, res) => {
    if (req.session.user) {
        console.log(req.params.id);
        let sql = "DELETE FROM lists WHERE `id` = ? and `belongs_to` = ?";
        connection.query(sql, [req.params.id, req.session.user.id], (err, results) => {
            if (err) {
                res.json({
                    deletion: false,
                    reason: err
                });
            } else {
                // removing all contacts of that particular list
                let deleteContacts = "DELETE FROM contacts WHERE `list_id` = ? and `belongs_to` = ? "
                connection.query(deleteContacts, [req.params.id, req.session.user.id], (err, status) => {
                    if (err) {
                        res.json({
                            deletion: true
                        });
                    } else {
                        res.json({
                            deletion: true,
                            result: results
                        });
                    }
                })

            }
        });
    } else {
        return res.json({
            deletion: false,
            reason: "user is not authorized!",
        });
    }
}

