import { describe,expect,it,vi } from "vitest";
import { useVariantBuilderViewModel } from "./useVariantBuilderViewModel";
import { renderHook } from "@testing-library/react";

describe("useVariantBuilderViewModel", () => {


it("should initialize with an empty expression", () => {
  const mockUseVariantBuilderModel = vi.fn(() => ({
    expression: "",
    setExpression: vi.fn(),
  }));

  const { result } = renderHook(() => useVariantBuilderViewModel({
	mockUseVariantBuilderModel,
	useDrop: vi.fn(() => [null, vi.fn()]),
    useDrag: vi.fn(() => [null, vi.fn(), vi.fn()]),
  
}));

  expect(result.current.expression).toBe("");
});

it.skip("should update expression when a column is dropped", () => {
  const mockSetExpression = vi.fn();
  const mockUseVariantBuilderModel = vi.fn(() => ({
    expression: "initial",
    setExpression: mockSetExpression,
  }));

  const mockDrop = vi.fn()
  const mockDrag = vi.fn()
  const mockDragPreview = vi.fn()

  const { result } = renderHook(() => useVariantBuilderViewModel({
	mockUseVariantBuilderModel,
	useDrop: vi.fn(() => [null,mockDrop]),
    useDrag: vi.fn(() => [null, mockDrag, mockDragPreview]),
  }));

  const dropItem = { field: "newColumn" };
  result.current.drop(dropItem);

  expect(mockDrop).toHaveBeenCalledWith(dropItem);

});
});
