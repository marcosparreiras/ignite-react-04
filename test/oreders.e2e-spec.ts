import { test, expect } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("cell", { name: "customer-1", exact: true })
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-10" })).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Próxima página" }).click();
  await expect(page.getByRole("cell", { name: "customer-11" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-20" })).toBeVisible();
  await page.getByRole("button", { name: "Última página" }).click();
  await expect(page.getByRole("cell", { name: "customer-51" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "customer-60" })).toBeVisible();
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByPlaceholder("ID do pedido").fill("21");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();
  await expect(page.getByRole("cell", { name: "orders-21" })).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Nome do cliente").fill("21");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();
  await expect(page.getByRole("cell", { name: "customer-21" })).toBeVisible();
});

test("filter by order status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByRole("combobox").click();
  await page.getByLabel("Entregue").click();
  await page.getByRole("button", { name: "Filtrar resultados" }).click();
  await expect(page.getByRole("cell", { name: "Entregue" })).toHaveCount(10);
});
