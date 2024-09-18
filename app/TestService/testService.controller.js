

import ApiResponse from "../../shared/api-response/api-response.js";

import TestServiceDto from "./dto/test-service-dto.js";
import { testServiceservice } from "./testService.service.js";


export class testServiceController {
    static async add(request, response) {
        const data = await testServiceservice.add(request.body);

        return new ApiResponse(
            new TestServiceDto(data),
            "test service created success"
        ).created(response);
    }

    static async getMedicalHistoryVaultById(request, response) {
        const data = await testServiceservice.getById(request.params.id);
        return new ApiResponse(
            new TestServiceDto(data),
            "test service Get By Id success"
        ).success(response);
    }

    static async getallbyuser(request, response) {
        const data = await testServiceservice.getAllByUserId(request.params.id);

        return new ApiResponse(
            new TestServiceDto(data),
            "test service GetAll success"
        ).success(response);
    }

    static async deletebyid(req, res) {
        const data = await testServiceservice.deleteByID(req.params.id);
        return new ApiResponse(
            new TestServiceDto(data),
            "test service Delete by id success"
        ).success(res);
    }

    static async update(req, res) {
        const medical = req.body;
        const data = await testServiceservice.updateById(req.params.id, medical)

        return new ApiResponse(
            new TestServiceDto(data),
            "test service Update success"
        ).success(res);
    }
}