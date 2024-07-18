import {
    DictionaryImpl,
    WildcardDictionaryImpl,
} from "../src/dictionary.types";

describe("Test DictionaryImpl", () => {
    let dictionary: DictionaryImpl;

    beforeEach(() => {
        dictionary = new DictionaryImpl();
        dictionary.setup(["cat", "car", "bar"]);
    });

    it("word in dictionary", () => {
        expect(dictionary.isInDict("cat")).toBe(true);
    });

    it("word not in dictionary", () => {
        expect(dictionary.isInDict("bat")).toBe(false);
    });
});

describe("Test WildcardDictionaryImpl", () => {
    let dictionary: WildcardDictionaryImpl;

    beforeEach(() => {
        dictionary = new WildcardDictionaryImpl();
        dictionary.setup(["cat", "car", "bar","dictionary"]);
    });

    it("word in dictionary", () => {
        expect(dictionary.isInDict("cat")).toBe(true);
    });

    it("word not in dictionary", () => {
        expect(dictionary.isInDict("bat")).toBe(false);
    });

    it("has wildcard word match in dictionary", () => {
        expect(dictionary.isInDict("*at")).toBe(true);
    });

    it("has wildcard word match in dictionary", () => {
        expect(dictionary.isInDict("*ry")).toBe(true);
    });

    it("has wildcard word match in dictionary", () => {
        expect(dictionary.isInDict("*ion*")).toBe(true);
    });

    it("has wildcard word match in dictionary", () => {
        expect(dictionary.isInDict("d*ion*y")).toBe(true);
    });

    it("no wildcard word match in dictionary", () => {
        expect(dictionary.isInDict("cr*")).toBe(false);
    });
});
