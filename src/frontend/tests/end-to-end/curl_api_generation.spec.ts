import { expect, test } from "@playwright/test";

test("curl_api_generation", async ({ page, context }) => {
  await page.goto("http:localhost:3000/");
  await page.locator('//*[@id="new-project-btn"]').click();
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("heading", { name: "Basic Prompting" }).click();
  await page.waitForTimeout(2000);
  await page.getByText("API", { exact: true }).click();
  await page.getByRole("tab", { name: "cURL" }).click();
  await page.getByRole("button", { name: "Copy Code" }).click();
  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText()
  );
  const clipboardContent = await handle.jsonValue();
  expect(clipboardContent.length).toBeGreaterThan(0);
});
