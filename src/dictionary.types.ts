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

class WildcardDictionaryImpl implements Dictionary {
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
        if (word.includes("*")) {
            for (const dictWord of this.words.values()) {
                if (this.isMatch(dictWord, word)) {
                    return true;
                }
            }
            return false;
        } else {
            return this.words.has(word);
        }
    }

    private isMatch(input: string, pattern: string): boolean {
        let iIdx = 0,
            pIdx = 0,
            matchIdx = 0,
            starIdx = -1;

        while (iIdx < input.length) {
            if (pIdx < pattern.length && input[iIdx] === pattern[pIdx]) {
                iIdx++;
                pIdx++;
            } else if (pIdx < pattern.length && pattern[pIdx] === "*") {
                matchIdx = iIdx;
                starIdx = pIdx;
                pIdx++;
            } else if (starIdx != -1) {
                pIdx = starIdx + 1;
                matchIdx = matchIdx + 1;
                iIdx = matchIdx;
            } else {
                return false;
            }
        }

        while (pIdx < pattern.length) {
            if (pattern[pIdx] !== "*") {
                return false;
            }
            pIdx++;
        }
        return true;
    }
}

export { DictionaryImpl, WildcardDictionaryImpl };
