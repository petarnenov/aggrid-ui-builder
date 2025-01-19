import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { fireEvent, render, screen } from "../../tests/testUtils";
import ValueBuilder from "./ValueBuilder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const mockDrop = vi.fn();
const mockDrag = vi.fn();
const mockDragPreview = vi.fn();
const mockReset = vi.fn();

// Mock the Button component
vi.mock("../Button/Button", () => ({
  __esModule: true,
  default: ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

// Mock the styles
vi.mock("./ValueBuilder.module.scss", () => ({
  __esModule: true,
  default: {
    valueBuilder: "valueBuilder",
    header: "header",
    expression: "expression",
    value: "value",
  },
}));

// Mock the useVariantBuilderViewModel hook
const mockUseVariantBuilderViewModel = vi.fn(() => ({
  expression: "test expression",
  drop: mockDrop,
  drag: mockDrag,
  dragPreview: mockDragPreview,
  handleReset: mockReset,
}));

describe("ValueBuilder", () => {
  it("renders correctly", () => {
    render(
      <ValueBuilder
        useVariantBuilderViewModel={mockUseVariantBuilderViewModel}
      />
    );

    expect(screen.getByText("Value Builder")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("test expression")).toBeInTheDocument();
    //screen.debug()
  });

  it("renders correctly with default", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <ValueBuilder />
      </DndProvider>
    );

    expect(screen.getByText("Value Builder")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    //screen.debug()
  });

  it("calls handleReset when Reset button is clicked", () => {
    render(
      <ValueBuilder
        useVariantBuilderViewModel={mockUseVariantBuilderViewModel}
      />
    );

    const resetElement = screen.getByText("Reset");
    fireEvent.click(resetElement);

    expect(mockUseVariantBuilderViewModel().handleReset).toHaveBeenCalled();
    //screen.debug(resetElement);
  });
});
