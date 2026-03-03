export class Country {
    constructor(
        public name: "USA" | "Mexico" | "Canada",
        public code: "us" | "me" | "ca"
    ) {
        if (name === "USA" && code != "us") throw new Error("Le code n'est pas le bon pour USA");
        if (name === "Mexico" && code != "me") throw new Error("Le code n'est pas le bon pour Mexico");
        if (name === "Canada" && code != "ca") throw new Error("Le code n'est pas le bon pour Canada");

    }
}