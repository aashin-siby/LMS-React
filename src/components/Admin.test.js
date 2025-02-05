import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../components/Admin";
import "@testing-library/jest-dom/extend-expect";

describe("Admin Component - Add Book Form", () => {
  test("updates input fields correctly when user types", () => {
    render(<Admin />);

    // Find input fields
    const titleInput = screen.getByPlaceholderText("Title");
    const authorInput = screen.getByPlaceholderText("Author");
    const copiesInput = screen.getByPlaceholderText("Copies Available");

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "New Book Title" } });
    fireEvent.change(authorInput, { target: { value: "Author Name" } });
    fireEvent.change(copiesInput, { target: { value: "3" } });

    // Assert that values changed correctly
    expect(titleInput.value).toBe("New Book Title");
    expect(authorInput.value).toBe("Author Name");
    expect(copiesInput.value).toBe("3");
  });
});
