
import { testServiceDal } from "./testService.dal.js"
export class testServiceservice {
    static async add(testService) {
        return await testServiceDal.add(testService);
    }

    static async getAllByUserId(userID) {
        return await testServiceDal.getAllByUserId(userID);
    }

    static async getById(id) {
        return await testServiceDal.getFindById(id);
    }

    static async deleteById(id) {
        return await testServiceDal.deleteById(id);
    }

    static async updateById(id, testService) {
        return await testServiceDal.updateById(id, testService)
    }
}