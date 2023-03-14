
import bcrypt from 'bcrypt';


const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

const isValidPassword = (user, password) => {
    let result = bcrypt.compareSync(password, user.password);
    return result;
}
export { createHash, isValidPassword };