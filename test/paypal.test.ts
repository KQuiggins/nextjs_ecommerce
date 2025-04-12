import { generateAccessToken } from "../lib/paypal";

// Test to generate an access token
test("generates access token", async () => {
  const token = await generateAccessToken();
  console.log("Generated token:", token); // Log the generated token for debugging
  
  expect(typeof token).toBe('string'); // Check if the token is a string
  expect(token.length).toBeGreaterThan(0); // Check if the token is not empty
});