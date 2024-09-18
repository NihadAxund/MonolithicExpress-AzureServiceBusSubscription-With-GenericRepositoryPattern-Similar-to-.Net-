import mongoose from "mongoose";

const testServiceModel = new mongoose.Schema({
    user_Id: {
        type: String,
        default: null
    },

    operation: {
        type: String,
        minLength: 3,
        maxLenght: 1800,
        default: null
    },
}, { timestamps: true });

export const testServiceVault = mongoose.model(
    "medicalHistoryVault",
    medicalHistoryVaultModel
);
//
