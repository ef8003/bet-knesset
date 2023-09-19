import { Location } from "../models/Location.js";

export const getAllLocations = () => {
    return Location.find({})
}

export const getLocationById = (_id) => {
    return Location.findOne({_id})
}

export const deleteLocationById = (_id) => {
    return Location.findOneAndDelete({_id})
}

export const addLocation = (LocationObj) => {
    const location = new Location(LocationObj)
    return location.save()
}

export const updateLocation = (_id, updateLocationObject) => {
    return Location.findOneAndUpdate({_id}, updateLocationObject, {
        new: true
    });
}