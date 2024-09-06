import { test, expect } from "@playwright/test";

test("sign up successfully ", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page.getByLabel("Seu resutaurente").fill("Pizza Shop");
  await page.getByLabel("Seu nome").fill("John Doe");
  await page.getByLabel("Seu email").fill("johndoe@example.com");
  await page.getByLabel("Seu telefone").fill("999999999");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  const toast = page.getByText("Restautante registrado");
  await expect(toast).toBeVisible();
});

test("sign up with invalid data", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page.getByLabel("Seu resutaurente").fill("SOME INVALID NAME");
  await page.getByLabel("Seu nome").fill("John Doe");
  await page.getByLabel("Seu email").fill("johndoe@example.com");
  await page.getByLabel("Seu telefone").fill("999999999");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  const toast = page.getByText("Algo deu errado, tente novamente mais tarde!");
  await expect(toast).toBeVisible();
});

test("navigate to sign in page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Fazer login" }).click();
  expect(page.url()).toContain("/sign-in");
});
