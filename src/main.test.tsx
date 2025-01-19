import React, { StrictMode } from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";

const mockRootElement = vi.fn();

const mockCreateRoot = vi.fn(() => ({ render: mockRootElement }));
vi.spyOn(React, "createElement");
vi.mock("react-dom/client", () => ({ createRoot: mockCreateRoot }));
vi.mock("./App.jsx", () => ({ default: () => <div>Mock App</div> }));
vi.mock("./index.scss", () => ({}));

describe("Main", () => {
  it.skip("should render the App component within StrictMode", () => {
    import("./main.tsx").then(() => {
      expect(mockCreateRoot).toHaveBeenCalledWith(null);
      expect(React.createElement).toHaveBeenCalledWith(
        StrictMode,
        null,
        expect.any(Object)
      );
      expect(React.createElement).toHaveBeenCalledWith(
        DndProvider,
        { backend: HTML5Backend },
        expect.any(Object)
      );
      expect(React.createElement).toHaveBeenCalledWith(App, null);
    });
  });

  it.skip("should wrap the App component with DndProvider using HTML5Backend", () => {
    import("./main.tsx").then(() => {
      expect(React.createElement).toHaveBeenCalledWith(
        DndProvider,
        { backend: HTML5Backend },
        expect.any(Object)
      );
      expect(React.createElement).toHaveBeenCalledWith(App, null);
    });
  });

  it.skip("should create a root element using createRoot", () => {
    import("./main.tsx").then(() => {
      expect(mockCreateRoot).toHaveBeenCalledWith(null);
      expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    });
  });
  it.skip("should render the App component without throwing an error", () => {
    const mockRoot = document.createElement("div");
    mockRoot.id = "root";
    document.body.appendChild(mockRoot);

    const consoleSpy = vi.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      import("./main.tsx");
    }).not.toThrow();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    document.body.removeChild(mockRoot);
  });
});
