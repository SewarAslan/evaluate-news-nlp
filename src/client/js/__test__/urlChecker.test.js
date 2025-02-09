import { checkForURL } from "../urlChecker"; 

describe("Testing URL validation function", () => {
    test("Check if checkForURL is defined", () => {
        expect(checkForURL).toBeDefined();
    });

    test("Valid URL should pass", () => {
        expect(checkForURL("https://www.bbc.com/news")).toBe(true);
    });

    test("Invalid URL should fail", () => {
        expect(checkForURL("invalid-url")).toBe(false);
    });
});
