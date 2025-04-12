import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../components/Search/Search";
import "@testing-library/jest-dom";

describe("Search Component", () => {
  test("renders input, button, and all diet checkboxes", () => {
    render(<Search onSearchSubmit={() => {}} />);

    // input + button
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    // diet checkboxes
    expect(screen.getByLabelText(/balanced/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/high-fiber/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/high-protein/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/low-carb/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/low-fat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/low-sodium/i)).toBeInTheDocument();
  });

  test("updates input value and submits with trimmed query", () => {
    const mockSubmit = jest.fn();
    render(<Search onSearchSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText(/what do you want to cook/i);
    fireEvent.change(input, { target: { value: "  pasta  " } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(mockSubmit).toHaveBeenCalledWith("  pasta  ".trim());
  });

  test("does not submit when input is only whitespace", () => {
    const mockSubmit = jest.fn();
    render(<Search onSearchSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText(/what do you want to cook/i);
    fireEvent.change(input, { target: { value: "   " } });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("toggles checkbox values correctly", () => {
    render(<Search onSearchSubmit={() => {}} />);

    const checkbox = screen.getByLabelText(/low-carb/i);

    // initially unchecked
    expect(checkbox.checked).toBe(false);

    // check it
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // uncheck it
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
