import { test, expect } from '@playwright/test';

const baseURL = "https://simple-books-api.glitch.me"
const bookId = "1"

test.describe("Simpe Book API", () => {
    test("GET API status", async ({request}) => {
        const response = await request.get(baseURL)
        const responseBody = await response.json();
        expect (response.status()).toBe(200);
        expect (responseBody.message).toContain("Welcome to the Simple Books API.")
    })

    test("List of books", async ({request}) => {
        const response = await request.get(`${baseURL}/books`)
        const responseBody = await response.json();
        expect (response.status()).toBe(200);
        expect (responseBody).toHaveLength(6)
    })

    test("Get single book", async ({request}) => {
        const response = await request.get(`${baseURL}/books/${bookId}`)
        const responseBody = await response.json();
        expect (response.status()).toBe(200);
        expect(responseBody.isbn).toContain('1780899475')
    })
    
})