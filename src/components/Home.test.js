import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./Home";

test("renders homepage with hero section", () => {
  render(<HomePage />);
  
  // Check if the hero section is rendered
  const heroSection = screen.getByText(/Welcome to the Library Management System/i);
  expect(heroSection).toBeInTheDocument();
});