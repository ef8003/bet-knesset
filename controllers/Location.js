import {
    addLocation, getAllLocations, getLocationById, deleteLocationById, updateLocation
} from "../services/Location.js";

export const getAllLocationsController = async (req, res) => {
    try {
        const users = await getAllLocations();
        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const getLocationByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const location = await getLocationById(id);

        if (!location) {
            res.status(404).send("there is no location with the id providen");
        }
        res.status(200).send(location);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const addLocationController = async (req, res) => {
    try {

        const newLocation = { ...req.body };

        if (Object.keys(newLocation).length === 0) {
            return res.status(400).send("empty request");
        }
        const loaction = await addLocation(newLocation);
        res.status(200).send(loaction);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
};

export const updateLocationController = async (req, res) => {
    try {
        
        const id = req.params.id;

        const location = await getLocationById(req.params.id);

        if (!location) {
            res.status(404).send("there is no location with the id providen");
        }

        const updatedLocation = { ...req.body }
        if (Object.keys(updatedLocation).length === 0) {
            return res.status(400).send("empty request");
        }
        const locationAfterUpdate = await updateLocation(id, updatedLocation);
        res.status(200).send(locationAfterUpdate);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
}

export const deleteLocationByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedLocation = await deleteLocationById(id);

        if (!deletedLocation) {
            res.status(404).send({ message: "location does not exist" });
        }

        res.status(200).send(deletedLocation);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
    }
}
