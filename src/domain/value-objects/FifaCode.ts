export class FifaCode {
    public readonly value: string;

    constructor(value: string) {
        if (!/^[A-Z]{3}$/.test(value)) {
            throw new Error("FifaCode doit contenir que 3 lettres Majuscules");
        }
        this.value = value;
    }
}