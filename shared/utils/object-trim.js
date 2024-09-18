
export const objectTrims = (data) => {
    for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] === "string") {
            data[key] = data[key].trim();
        }
    }
    return data;
};
