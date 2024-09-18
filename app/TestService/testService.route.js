import express from "express";
import {testServiceController } from "./testService.controller.js";
import { testServiceSchemaMiddleware } from "./validation/testService.middleware.js";

const testServiceRouter = express.Router();
const mainPath = "/test-service"


medicalHistoryVaultRouter.post(
    `${mainPath}/add`,
    testServiceSchemaMiddleware,
    testServiceController.add
);

medicalHistoryVaultRouter.get(
    `${mainPath}/getuserid/:id`,
    testServiceController.getallbyuser
);

medicalHistoryVaultRouter.delete(
    `${mainPath}/deleteid/:id`,
    testServiceController.deletebyid
);

medicalHistoryVaultRouter.patch(
    `${mainPath}/update/:id`,
    testServiceSchemaMiddleware,
    testServiceController.update
);


export default testServiceRouter;