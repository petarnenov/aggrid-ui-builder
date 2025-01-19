import React, { StrictMode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const AllTheProviders = ({ children }) => {
  return (
    <StrictMode>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </StrictMode>
  );
};

type CustomRenderType = typeof render;

const customRender = ((ui: React.ReactNode, options: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })) as CustomRenderType;

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
