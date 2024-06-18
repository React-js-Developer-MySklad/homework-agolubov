
const parser = new DOMParser()
export function asDocument(html) {
    return parser.parseFromString(html, "text/html")
}

export function* integerGenerator(start = 0) {
    let i = start;
    while (true) {
        yield i++;
    }
}