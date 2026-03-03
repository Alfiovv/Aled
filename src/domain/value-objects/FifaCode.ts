export class FifaCode {
    public readonly value: string;

    constructor(value: string) {
        if (!/^[A-Z]{3}$/.test(value)) {
            throw new Error("FifaCode must be 3 uppercase letters");
        }
        this.value = value;
    }
}