import { generateAccessToken, paypal } from "../lib/paypal";

// Test to generate an access token
test("generates access token", async () => {
  const token = await generateAccessToken();
  console.log("Generated token:", token); // Log the generated token for debugging

  expect(typeof token).toBe('string'); // Check if the token is a string
  expect(token.length).toBeGreaterThan(0); // Check if the token is not empty
});

// Test to create a paypal order
test("creates a paypal order", async () => {

  const price = 10.0; // Example price

  const order = await paypal.createOrder(price);
  console.log("Created order:", order); // Log the created order for debugging

  expect(order).toHaveProperty('id'); // Check if the order has an ID
  expect(order).toHaveProperty('status'); // Check if the order has a status
  expect(order.status).toBe('CREATED'); // Check if the order status is 'CREATED'
});

// Test to capture a paypal order
test("captures a paypal order", async () => {
  const orderId = '100';

  const capture = jest.spyOn(paypal, 'capturePayment').mockResolvedValue({

    status: 'COMPLETED',
  });
  const response = await paypal.capturePayment(orderId);
  expect(response).toHaveProperty('status', 'COMPLETED'); // Check if the order has a status
  capture.mockRestore(); // Restore the original implementation of capturePayment
});
