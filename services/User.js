import { User } from "../models/User.js";

export const getAllUsers = () => {
    return User.find({})
}

export const getUserById = (_id) => {
    return User.findOne({_id})
}

export const deleteUserById = (_id) => {
    return User.findOneAndDelete({_id})
}

export const addUser = (userObj) => {
    const user = new User(userObj)
    return user.save()
}

export const updateUser = (_id, updateUserObject) => {
    return User.findOneAndUpdate({_id}, updateUserObject, {
        new: true
      });
}

export const logInUser = (username) => {
    return User.findOne({ username: username }).exec();
}