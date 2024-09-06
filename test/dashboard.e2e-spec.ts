import { test, expect } from "@playwright/test";

test("display month revenue", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("R$ 354.000,00", { exact: true })).toBeVisible();
  await expect(page.getByText("+12% em realação ao mês")).toBeVisible();
});

test("display month order amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("1.320", { exact: true })).toBeVisible();
  await expect(page.getByText("-4% em realação ao mês passado")).toBeVisible();
});

test("display day order amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("20", { exact: true })).toBeVisible();
  await expect(page.getByText("-5% em relação a ontem")).toBeVisible();
});

test("display month canceled order amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("45", { exact: true })).toBeVisible();
  await expect(page.getByText("+4% em realação ao mês passado")).toBeVisible();
});
