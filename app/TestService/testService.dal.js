import { testServiceVault } from "./model/test-service";

export class testServiceDal {
    static async add(testService) {
        return await testServiceVault.create(testService);
    }
    static async getFindById(id) {
        return await testServiceVault.findById(id);
    }
    static async deleteById(id) {
        return await testServiceVault.deleteOne({ _id: id });
    }
    static async getAllByUserId(userId) {
        return await medicalHistoryVault.find({ user_Id: userId });
    }
    static async updateById(id, testService) {
        return await testServiceVault.findByIdAndUpdate(
            id,
            { $set: testService },
            { new: true }
        );
    }
}