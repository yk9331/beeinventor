import { Dictionary } from "./dictionary.interfaces";

class DictionaryImpl implements Dictionary {
    private words: Set<string>;

    constructor() {
        this.words = new Set<string>();
    }

    setup(input: string[]) {
        this.words.clear();
        for (const word of input) {
            this.words.add(word);
        }
    }

    isInDict(word: string): boolean {
        return this.words.has(word);
    }
}

export { DictionaryImpl };

