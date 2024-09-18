export default class ApiResponse {
    constructor(content, message) {
        this.content = content;
        this.message = message;
    }

    success(response) {
        return response.status(200).json({
            success: true,
            content: this.content,
            message: this.message || "The operation was completed successfully.",
        });
    }

    created(response) {
        return response.status(201).json({
            success: true,
            content: this.content,
            message: this.message || "The operation was completed successfully.",
        });
    }
}
