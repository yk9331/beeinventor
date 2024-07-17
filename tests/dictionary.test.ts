import { DictionaryImpl } from "../src/dictionary.types";

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

