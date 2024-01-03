const validateContact = (contact) => {


    if (contact.name == "") {
        return { isValidate: false, reason: "Name is required!" }
    } else if (contact.email == "") {
        return { isValidate: false, reason: "Email is required!" }
    } else if (contact.phone == "") {
        return { isValidate: false, reason: "Phone Number is required!" }
    } else {
        return { isValidate: true, reason: "Everything is Alright!" }
    }


};
export default validateContact;