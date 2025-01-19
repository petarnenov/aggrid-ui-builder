import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./components", () => ({
	ValueBuilder: () => <div data-testid="value-builder">ValueBuilder</div>,
	CustomGrid: () => <div data-testid="custom-grid">CustomGrid</div>,
	ColumnBuilder: () => <div data-testid="column-builder">ColumnBuilder</div>,
	ColumnSourceList: () => <div data-testid="column-source-list">ColumnSourceList</div>,
}));

vi.mock("./App.module.scss", () => ({
	__esModule: true,
	default: {
		layoutContainer: "layoutContainer",
		main: "main",
		builders: "builders",
	},
}));

describe("App component", () => {

	it("Should render all components without errors", () => {
		render(<App />);

		expect(screen.getByTestId("custom-grid")).toBeInTheDocument();
		expect(screen.getByTestId("value-builder")).toBeInTheDocument();
		expect(screen.getByTestId("column-builder")).toBeInTheDocument();
		expect(screen.getByTestId("column-source-list")).toBeInTheDocument();

		//screen.debug();
	});

	it("Should apply correct CSS classes from App.module.scss to layout elements", () => {
		render(<App />);

		const layoutContainer = screen.getByTestId("layout-container-section");
		const main = layoutContainer.firstChild;
		const builders = main.firstChild;

		expect(layoutContainer).toHaveClass("layoutContainer");
		expect(main).toHaveClass("main");
		expect(builders).toHaveClass("builders");
	});

	it("Should maintain proper nesting structure of sections", () => {
		render(<App />);

		const layoutContainer = screen.getByTestId("layout-container-section");
		expect(layoutContainer).toHaveClass("layoutContainer");

		const main = layoutContainer.firstElementChild;
		expect(main).toHaveClass("main");

		const builders = main.firstElementChild;
		expect(builders).toHaveClass("builders");

		expect(builders.children).toHaveLength(3);
		expect(builders.children[0]).toHaveAttribute("data-testid", "custom-grid");
		expect(builders.children[1]).toHaveAttribute("data-testid", "value-builder");
		expect(builders.children[2]).toHaveAttribute("data-testid", "column-builder");

		expect(main.children[1]).toHaveAttribute("data-testid", "column-source-list");
	});

	it("Should ensure CustomGrid, ValueBuilder, and ColumnBuilder are rendered within the 'builders' section", () => {
		render(<App />);

		const buildersSection = screen.getByTestId("custom-grid").closest("section");
		expect(buildersSection).toHaveClass("builders");

		expect(buildersSection).toContainElement(screen.getByTestId("custom-grid"));
		expect(buildersSection).toContainElement(screen.getByTestId("value-builder"));
		expect(buildersSection).toContainElement(screen.getByTestId("column-builder"));

		expect(buildersSection.children).toHaveLength(3);
		expect(buildersSection.children[0]).toHaveAttribute("data-testid", "custom-grid");
		expect(buildersSection.children[1]).toHaveAttribute("data-testid", "value-builder");
		expect(buildersSection.children[2]).toHaveAttribute("data-testid", "column-builder");
	});

	it("Should verify ColumnSourceList is rendered outside the 'builders' section but within the 'main' section", () => {
		render(<App />);

		const mainSection = screen.getByTestId("main-section");;
		expect(mainSection).toHaveClass("main");

		const buildersSection = mainSection.firstElementChild;
		expect(buildersSection).toHaveClass("builders");

		const columnSourceList = screen.getByTestId("column-source-list");

		expect(buildersSection).not.toContainElement(columnSourceList);
		expect(mainSection).toContainElement(columnSourceList);
		expect(mainSection.lastElementChild).toBe(columnSourceList);
	});

	it("Should correctly import and apply styles from App.module.scss", () => {
		render(<App />);

		const layoutContainer = screen.getByTestId("layout-container-section");
		const main = layoutContainer.firstElementChild;
		const builders = main.firstElementChild;

		expect(layoutContainer).toHaveClass("layoutContainer");
		expect(main).toHaveClass("main");
		expect(builders).toHaveClass("builders");

		expect(layoutContainer.className).toBe("layoutContainer");
		expect(main.className).toBe("main");
		expect(builders.className).toBe("builders");
	});

	it("Should confirm that all imported components are used in the render method", () => {
		render(<App />);

		expect(screen.getByTestId("custom-grid")).toBeInTheDocument();
		expect(screen.getByTestId("value-builder")).toBeInTheDocument();
		expect(screen.getByTestId("column-builder")).toBeInTheDocument();
		expect(screen.getByTestId("column-source-list")).toBeInTheDocument();

		const buildersSection = screen.getByTestId("custom-grid").closest("section");
		expect(buildersSection).toHaveClass("builders");
		expect(buildersSection.children).toHaveLength(3);
		expect(buildersSection.children[0]).toHaveAttribute("data-testid", "custom-grid");
		expect(buildersSection.children[1]).toHaveAttribute("data-testid", "value-builder");
		expect(buildersSection.children[2]).toHaveAttribute("data-testid", "column-builder");

		const mainSection = screen.getByTestId("main-section");
		expect(mainSection).toHaveClass("main");
		expect(mainSection.lastElementChild).toHaveAttribute("data-testid", "column-source-list");
	});

	it("Should validate that the App component is properly exported as default", () => {
		expect(App).toBeDefined();
		expect(typeof App).toBe("function");
		expect(App.name).toBe("App");

		const renderedApp = render(<App />);
		expect(renderedApp).toBeTruthy();
	});

	it("Should ensure the outermost section has the 'layoutContainer' className applied", () => {
		render(<App />);

		const outerSection = screen.getByTestId("layout-container-section");
		expect(outerSection).toHaveClass("layoutContainer");
	});
});
