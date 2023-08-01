import {
    addUser, getAllUsers, getUserById, deleteUserById, updateUser,
} from "../services/User.js";

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
            return res.status(400).send("bad request");
        }
        const user = await addUser(newUser);
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = { ...req.body }
        // if (req.body['email']) {
        //     return res.status(404).send("bad reuest cant change email")
        // }
        if (Object.keys(updatedUser).length === 0) {
            return res.status(400).send("bad request");
        }
        const userAfterUpdate = await updateUser(id, updatedUser)
        res.status(200).send(userAfterUpdate);
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
