import { describe, it, vi, expect} from "vitest";
import { useVariantBuilderModel } from "./useVariantBuilderModel";
import { act, renderHook } from "@testing-library/react";

describe("useVariantBuilderModel", () => {

it("should initialize expression as an empty string", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  expect(result.current.expression).toBe("");
});

it("should update expression when setExpression is called", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  
  act(() => {
    result.current.setExpression("new expression");
  });
  
  expect(result.current.expression).toBe("new expression");
});

it("should return the current expression value", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  
  act(() => {
    result.current.setExpression("test expression");
  });
  
  expect(result.current.expression).toBe("test expression");
});

it("should handle setting expression to a long string", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  const longString = "This is a very long string that tests the ability of the model to handle large inputs without any issues or unexpected behavior";
  
  act(() => {
    result.current.setExpression(longString);
  });
  
  expect(result.current.expression).toBe(longString);
});

it("should handle setting expression to special characters", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  const specialCharacters = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`";
  
  act(() => {
    result.current.setExpression(specialCharacters);
  });
  
  expect(result.current.expression).toBe(specialCharacters);
});

it("should return the same reference for setExpression across multiple renders", () => {
  const { result, rerender } = renderHook(() => useVariantBuilderModel());
  
  const initialSetExpression = result.current.setExpression;
  
  rerender();
  
  expect(result.current.setExpression).toBe(initialSetExpression);
});


it("should maintain state between re-renders", () => {
  const { result, rerender } = renderHook(() => useVariantBuilderModel());
  
  act(() => {
    result.current.setExpression("test expression");
  });
  
  expect(result.current.expression).toBe("test expression");
  
  rerender();
  
  expect(result.current.expression).toBe("test expression");
});

it("should handle setting expression to an empty string after it had a value", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  
  act(() => {
    result.current.setExpression("initial value");
  });
  
  expect(result.current.expression).toBe("initial value");
  
  act(() => {
    result.current.setExpression("");
  });
  
  expect(result.current.expression).toBe("");
});

it("should not throw an error when setExpression is called with undefined", () => {
  const { result } = renderHook(() => useVariantBuilderModel());
  
  expect(() => {
    act(() => {
      result.current.setExpression(undefined);
    });
  }).not.toThrow();
  
  expect(result.current.expression).toBe(undefined);
});

it("should work correctly when used in multiple components simultaneously", () => {
  const { result: result1 } = renderHook(() => useVariantBuilderModel());
  const { result: result2 } = renderHook(() => useVariantBuilderModel());

  act(() => {
    result1.current.setExpression("Component 1 expression");
    result2.current.setExpression("Component 2 expression");
  });

  expect(result1.current.expression).toBe("Component 1 expression");
  expect(result2.current.expression).toBe("Component 2 expression");

  act(() => {
    result1.current.setExpression("Updated Component 1");
  });

  expect(result1.current.expression).toBe("Updated Component 1");
  expect(result2.current.expression).toBe("Component 2 expression");
});
});
