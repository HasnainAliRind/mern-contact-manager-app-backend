const validate = (values) => {
    if (values.name == undefined) {
        return {status: false , reason: "name is mendatory!"}
    }else if(values.name.length > 22){
        return {status: false , reason: "name should contain less than 22 letters only!"}
    };
}

export default validate;