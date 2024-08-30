import { render } from "@testing-library/react";
import { Pagination } from "./pagination";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  const onPageChangeCb = vi.fn();

  beforeEach(() => {
    onPageChangeCb.mockClear();
  });

  it("Should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        onPageChange={() => {}}
        pageIndex={0}
        totalCount={200}
        perPage={10}
      />
    );
    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("Should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        onPageChange={onPageChangeCb}
        pageIndex={0}
        totalCount={200}
        perPage={10}
      />
    );

    const nextPageBtn = wrapper.getByRole("button", {
      name: "Próxima página",
    });

    const user = userEvent.setup();
    await user.click(nextPageBtn);

    expect(onPageChangeCb).toHaveBeenCalled();
    expect(onPageChangeCb).toHaveBeenCalledWith(1);
  });

  it("Should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        onPageChange={onPageChangeCb}
        pageIndex={5}
        totalCount={200}
        perPage={10}
      />
    );

    const previousPageBtn = wrapper.getByRole("button", {
      name: "Página anterior",
    });

    const user = userEvent.setup();
    await user.click(previousPageBtn);

    expect(onPageChangeCb).toHaveBeenCalled();
    expect(onPageChangeCb).toHaveBeenCalledWith(4);
  });

  it("Should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        onPageChange={onPageChangeCb}
        pageIndex={5}
        totalCount={200}
        perPage={10}
      />
    );

    const lastPageBtn = wrapper.getByRole("button", {
      name: "Última página",
    });

    const user = userEvent.setup();
    await user.click(lastPageBtn);

    expect(onPageChangeCb).toHaveBeenCalled();
    expect(onPageChangeCb).toHaveBeenCalledWith(19);
  });

  it("Should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        onPageChange={onPageChangeCb}
        pageIndex={5}
        totalCount={200}
        perPage={10}
      />
    );

    const previousPageBtn = wrapper.getByRole("button", {
      name: "Primeira página",
    });

    const user = userEvent.setup();
    await user.click(previousPageBtn);

    expect(onPageChangeCb).toHaveBeenCalled();
    expect(onPageChangeCb).toHaveBeenCalledWith(0);
  });
});
