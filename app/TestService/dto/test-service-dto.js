
class TestServiceDto {
    constructor(model) {
        this.id = model.id;
        this.hospital_Id = model.hospital_Id;
        this.user_Id = model.user_Id;
        this.doctor_Id = model.doctor_Id;
        this.risk_Level = model.risk_Level;
        this.operation = model.operation;
        this.prescription = model.prescription;
        this.medical_Report = model.medical_Report;
        this.travma = model.travma;
        this.permanentDamage = model.permanentDamage;
        this.dateTime = model.dateTime;
    }
}

export default TestServiceDto;
