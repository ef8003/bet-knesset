import {
    addUser, getAllUsers, getUserById, deleteUserById, updateUser, logInUser
} from "../services/User.js";
import bcrypt from "bcryptjs";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (!user) {
            res.status(404).send("there is no user with the id providen");
        }
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const addUserController = async (req, res) => {
    try {    
        const newUser = { ...req.body };
        if (Object.keys(newUser).length === 0) {
            return res.status(400).send("empty request");
        }
        if(!newUser.hasOwnProperty('password') || newUser.password.length === 0){
            res.status(400).send("lost password");
        }else if (!newUser.hasOwnProperty('username') || newUser.username.length === 0) {
            return res.status(400).send("lost username");
        }else if(!newUser.hasOwnProperty('email') || newUser.email.length === 0) {
            return res.status(400).send("lost email");
        }else{
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if(!pattern.test(req.body['email'])){
                return res.status(400).send("wrong email string!");
            }else{
                newUser.password = await bcrypt.hash(req.body['password'], 10);
                const user = await addUser(newUser);
                res.status(200).send(user);
            }  
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: e });
    }
};

export const updateUserController = async (req, res) => {
    try {      
        const id = req.params.id;
        const updatedUser = { ...req.body };
        if (Object.keys(updatedUser).length === 0) {
            return res.status(400).send("empty request");
        }
        if(updatedUser.hasOwnProperty('password')){
            updatedUser.password = await bcrypt.hash(req.body['password'], 10);
            const userAfterUpdate = await updateUser(id, updatedUser)
            res.status(200).send(userAfterUpdate);
        }else if(updatedUser.hasOwnProperty('email')){
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if(!pattern.test(req.body['email'])){
                return res.status(400).send("wrong email string!");
            }
        }else{
            const userAfterUpdate = await updateUser(id, updatedUser)
            res.status(200).send(userAfterUpdate);
        }  
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
}

export const deleteUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            res.status(404).send({ message: "user does not exist" });
        }

        res.status(200).send(deletedUser);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
}

export const logInUserController = async (req, res) => {
    try {
        const password = req.params['password'];
        const username = req.params['username'];
        if (!password || password.length === 0) {
            return res.status(400).send("lost password");
        }
        if (!username || username.length === 0) {
            return res.status(400).send("lost username");
        }
        const user = await logInUser(username);
        const compare = await bcrypt.compare(req.params['password'], user.password);
        if(compare){
           return res.status(200).send("Wellcome!!");
        }else{
            return res.status(404).send("wrong password");
        }       
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};