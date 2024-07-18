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

class TrieNode {
    public value: string | null;
    public isEnd: boolean;
    public children: Map<string, TrieNode>;

    constructor(value: string | null = null) {
        this.value = value;
        this.isEnd = false;
        this.children = new Map<string, TrieNode>();
    }

    public getOrCreateChild(value: string): TrieNode {
        let node = this.children.get(value);
        if (node) {
            return node;
        } else {
            node = new TrieNode(value);
            this.children.set(value, node);
            return node;
        }
    }
}

class WildcardDictionaryImpl implements Dictionary {
    private rootNode: TrieNode;

    constructor() {
        this.rootNode = new TrieNode();
    }

    setup(input: string[]) {
        this.rootNode = new TrieNode();
        for (const word of input) {
            this.addWord(word);
        }
    }

    isInDict(word: string): boolean {
        return this.search(this.rootNode, word);
    }

    private addWord(word: string) {
        let node = this.rootNode;
        for (const char of word) {
            node = node.getOrCreateChild(char);
        }
        node.isEnd = true;
    }

    private search(node: TrieNode, word: string): boolean {
        if (word === "") {
            return node.isEnd;
        } else if (word[0] == "*") {
            const nodesToSearch: Array<TrieNode> = new Array(...node.children.values());
            while (nodesToSearch.length > 0) {
                let nextNode = nodesToSearch.pop();
                if (nextNode) {
                    if (this.search(nextNode, word.slice(1))){
                        return true;    
                    } else {
                        if (nextNode.children.size > 0) { 
                            nodesToSearch.push(...nextNode.children.values());
                        }
                    }
                }
            }
            return false;
        } else {
            const nextNode = node.children.get(word[0]);
            if (nextNode) {
                return this.search(nextNode, word.slice(1));
            } else {
                return false;
            }
        }
    }
}

export { DictionaryImpl, WildcardDictionaryImpl };
