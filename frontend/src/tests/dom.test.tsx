import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import "@testing-library/dom";
import { ProductPriceStats } from "../components/ProductPriceStats";
import "@testing-library/jest-dom";
import { Platforms } from "../components";

import App from "../App";
import { GoogleSignIn, NewSearchBar, SearchResults } from "../components";

beforeEach(() => {
  render(<App />);
});

test("renders input and button elements", () => {
  render(<NewSearchBar />);
  const inputElement = screen.getByRole("input-search-box");
  const buttonElement = screen.getByRole("search-button", { name: /search/i });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("renders components", () => {
  // expect(screen.getByRole("input-search-box")).toBeInTheDocument();
  expect(screen.getByRole("error-message")).toBeInTheDocument();
  expect(screen.getByRole("signin-container")).toBeInTheDocument();
  expect(screen.getByRole("app")).toBeInTheDocument();
});

test("input element accepts user input", () => {
  render(<NewSearchBar />);
  const inputElement = screen.getByRole("input-search-box");
  fireEvent.change(inputElement, { target: { value: "Adidas" } });
  expect(inputElement).toHaveValue("Adidas");
});


test("renders input field with correct placeholder text", () => {
  const { getByPlaceholderText } = render(<NewSearchBar />);
  const inputField = getByPlaceholderText(
    "Lots of delicious deals to discover 🤤 Search your favorite Sneakers!"
  );
  expect(inputField).toBeInTheDocument();
});

test("input field has aria-label attribute", () => {
  const { getByRole } = render(<NewSearchBar />);
  const inputField = getByRole("input-search-box");
  expect(inputField).toHaveAttribute(
    "aria-label",
    "Press Enter or the button to Search"
  );
});

test("renders search button with correct text", () => {
  const { getByText } = render(<NewSearchBar />);
  const searchButton = getByText("Search");
  expect(searchButton).toBeInTheDocument();
});

test("search button has aria-label attribute", () => {
  const { getByLabelText } = render(<NewSearchBar />);
  const searchButton = getByLabelText("Press Enter to Sign In With Google");
  expect(searchButton).toBeInTheDocument();
});

test('renders "Get price stats" button when no price stats are available', () => {
  const sku = "12345";
  render(<ProductPriceStats sku={sku} />);
  const getStatsButton = screen.getByRole("updated-button")
  expect(getStatsButton).toBeInTheDocument();
});

test("clicking the button shows the priceStats container", () => {
  const sku = "12345";
  render(<ProductPriceStats sku={sku} />);
  const getStatsButton = screen.getByRole("updated-button");

  // Verify that the priceStats container is initially hidden
  

  // Simulate a click on the button
  fireEvent.click(getStatsButton);
  const priceStatsContainer = screen.getByRole("price-stats");

  // Verify that the priceStats container is displayed
  expect(priceStatsContainer).toHaveStyle("display: block");
});


describe("Platforms", () => {
  test("renders the platforms container", () => {
    render(<Platforms />);

    expect(screen.getByRole("platforms-container")).toBeInTheDocument();
  });

  test("renders the title filter", () => {
    render(<Platforms />);

    expect(screen.getByText("Platforms")).toBeInTheDocument();
  });

  test("renders the subtitle filter", () => {
    render(<Platforms />);

    expect(
      screen.getByText("Narrow your search to your favorite platforms")
    ).toBeInTheDocument();
  });
});

test("renders sign in button by default", () => {
  render(<GoogleSignIn />);
  const signInButton = screen.getByText(/Sign in!/i);
  expect(signInButton).toBeInTheDocument();
});

test("renders welcome message when user is signed in", () => {
  localStorage.setItem("name", "Test User");
  render(<GoogleSignIn />);
  const welcomeMessage = screen.getByText(/Hey Test User!/i);
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders sign out button when user is signed in", () => {
  localStorage.setItem("name", "Test User");
  render(<GoogleSignIn />);
  const signOutButton = screen.getByText(/Sign Out!/i);
  expect(signOutButton).toBeInTheDocument();
});

test("renders sign in button when user signs out", () => {
  localStorage.setItem("name", "Test User");
  render(<GoogleSignIn />);
  localStorage.removeItem("name");
  const signInButton = screen.getByText(/Sign in!/i);
  expect(signInButton).toBeInTheDocument();
});

test("renders sign in button with the correct ARIA labels and roles", () => {
  render(<GoogleSignIn />);
  const signInButton = screen.getByText(/Sign in!/i);
  expect(signInButton).toHaveAttribute(
    "aria-label",
    "Press Enter to Sign In With Google"
  );
  expect(signInButton).toHaveAttribute("role", "button");
});

test("renders sign out button with the correct ARIA labels and roles", () => {
  localStorage.setItem("name", "Test User");
  render(<GoogleSignIn />);
  const signOutButton = screen.getByText(/Sign Out!/i);
  expect(signOutButton).toHaveAttribute(
    "aria-label",
    "Press Enter to Sign Out"
  );
  expect(signOutButton).toHaveAttribute("role", "button");
});

test("renders container with the correct ARIA label and role", () => {
  render(<GoogleSignIn />);
  const container = screen.getByRole("signin-container");
  expect(container).toBeInTheDocument();
  expect(container).toHaveAttribute(
    "aria-label",
    "Press tab to go through the platfroms and space to toggle the switches."
  );
  expect(container).toHaveAttribute("role", "signin-container");
});

describe("SearchResults component", () => {
  beforeEach(() => {
    // Render the component before each test
    render(<SearchResults />);
  });

  test("renders a product card with the correct name", () => {
    // Find a product card element by its name
    const productName = "Nike Air Max";
    const productCard = screen.getByText(productName);

    // Check that the product card has been found and has the correct text
    expect(productCard).toBeInTheDocument();
  });

  test('renders a "Add to Wishlist" button for each product', () => {
    // Find all the "Add to Wishlist" buttons
    const addToWishlistButtons = screen.getAllByRole("button", {
      name: "Add to Wishlist",
    });

    // Check that the correct number of buttons have been found
    expect(addToWishlistButtons).toHaveLength(10);
  });
});













