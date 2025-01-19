import React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button component", () => {
  it("renders a button with the correct text", () => {
    render(<Button variant="standard">Hello, world!</Button>);
    const button = screen.getByText("Hello, world!");
    expect(button).toBeInTheDocument();
  });

  it("renders a button with a different variant", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveAttribute("data-variant", "primary");
  });

  it("renders a button with a different size", () => {
    render(
      <Button variant="standard" size="large">
        Large Button
      </Button>
    );
    const button = screen.getByText("Large Button");
    expect(button).toHaveAttribute("data-size", "large");
  });

  it("renders a button with a different vertical position", () => {
    render(
      <Button variant="standard" verticalPosition="top">
        Top Button
      </Button>
    );
    const button = screen.getByText("Top Button");
    expect(button).toHaveAttribute("data-vertical-position", "top");
  });

  it("renders a button with a different horizontal position", () => {
    render(
      <Button variant="standard" horizontalPosition="right">
        Right Button
      </Button>
    );
    const button = screen.getByText("Right Button");
    expect(button).toHaveAttribute("data-horizontal-position", "right");
  });

  it("calls onClick when the button is clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button variant="standard" onClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
