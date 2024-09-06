import { test, expect } from "@playwright/test";

test("sign in successfully ", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();
  await page.getByLabel("Name").fill("Pizza Shop 01");
  await page.getByLabel("Descição").fill("Another description");
  await page.getByRole("button", { name: "Salvar" }).click();
  await page.waitForLoadState("networkidle");
  const toast = page.getByText("Perfil atualizado com sucesso!");
  expect(toast).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  expect(page.getByText("Pizza Shop 01")).toBeVisible();
});
