import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("OrderStatus", () => {
  test.each([
    {
      param: "canceled",
      text: "Cancelado",
      cssClass: "bg-rose-500",
    },
    {
      param: "pending",
      text: "Pendente",
      cssClass: "bg-slate-400",
    },
    {
      param: "delivered",
      text: "Entregue",
      cssClass: "bg-emerald-500",
    },
    {
      param: "processing",
      text: "Em preparo",
      cssClass: "bg-amber-400",
    },
    {
      param: "delivering",
      text: "Em entrega",
      cssClass: "bg-amber-400",
    },
  ])(
    "Should display the right text based on order status",
    ({ cssClass, param, text }) => {
      let wrapper = render(<OrderStatus status={param as any} />);
      const statusText = wrapper.getByText(text);
      const badgeElement = wrapper.getByTestId("badge");

      expect(statusText).toBeInTheDocument();
      expect(badgeElement).toHaveClass(cssClass);
    }
  );
});
