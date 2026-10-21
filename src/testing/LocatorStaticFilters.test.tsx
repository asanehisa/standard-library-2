import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Matcher,
  provideHeadless,
  SearchHeadlessProvider,
  type FilterSearchResponse,
  type SelectableStaticFilter,
} from "@yext/search-headless-react";
import { LocatorStaticFilters } from "../library/shared/sectionSupport/locator/StaticFilters";
import {
  clearLocatorFilters,
  replaceLocationFilters,
} from "../library/shared/sectionSupport/locator/Filters";

vi.mock("react-i18next", async () => ({
  ...(await vi.importActual("react-i18next")),
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: "fr" },
  }),
}));

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const fieldFilter = (
  fieldId: string,
  value: string
): SelectableStaticFilter => ({
  selected: true,
  displayName: value,
  filter: { kind: "fieldValue", fieldId, matcher: Matcher.Equals, value },
});

describe("Locator static filters", () => {
  it("fetches suggestions for all entity types, replaces a field selection, and keeps other filters", async () => {
    const searcher = provideHeadless({
      apiKey: "test-key",
      experienceKey: "locator-1",
      locale: "en",
      verticalKey: "locations",
    });
    const location = fieldFilter("address.countryCode", "US");
    const openNow = fieldFilter("builtin.hours", "now");
    const brand = fieldFilter("brands", "Yext");
    const oldService = fieldFilter("services", "Takeout");
    searcher.setStaticFilters([location, openNow, brand, oldService]);
    searcher.setOffset(40);
    const filterSearch = vi
      .spyOn(searcher, "executeFilterSearch")
      .mockResolvedValue({
        sections: [
          {
            label: "",
            results: [
              {
                value: "Delivery",
                filter: {
                  fieldId: "services",
                  matcher: Matcher.Equals,
                  value: "Delivery",
                },
                matchedSubstrings: [],
              },
            ],
          },
        ],
      } as unknown as FilterSearchResponse);
    const query = vi
      .spyOn(searcher, "executeVerticalQuery")
      .mockResolvedValue(undefined);
    render(
      React.createElement(SearchHeadlessProvider, {
        searcher,
        children: React.createElement(LocatorStaticFilters, {
          fields: [
            {
              fieldId: "services",
              label: { defaultValue: "Services", fr: "Prestations" },
            },
          ],
          entityTypes: ["location", "restaurant"],
        }),
      })
    );
    const input = screen.getByRole("combobox", { name: "Prestations" });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Del" } });
    fireEvent.click(await screen.findByText("Delivery"));
    await waitFor(() => expect(query).toHaveBeenCalledOnce());
    expect(filterSearch).toHaveBeenCalledWith("Del", false, [
      {
        entityType: "location",
        fieldApiName: "services",
        fetchEntities: false,
      },
      {
        entityType: "restaurant",
        fieldApiName: "services",
        fetchEntities: false,
      },
    ]);
    expect(searcher.state.vertical.offset).toBe(0);
    expect(
      searcher.state.filters.static?.filter((filter) => filter.selected)
    ).toEqual([location, openNow, brand, fieldFilter("services", "Delivery")]);
    act(() =>
      searcher.setStaticFilters(
        clearLocatorFilters(searcher.state.filters.static ?? [])
      )
    );
    await waitFor(() => expect((input as HTMLInputElement).value).toBe(""));
    expect(
      searcher.state.filters.static?.filter((filter) => filter.selected)
    ).toEqual([location]);
  });

  it.each([
    { name: "location suggestion", openNow: true },
    { name: "current location", openNow: false },
  ])("retains visitor filters when changing $name", ({ openNow }) => {
    const oldLocation = fieldFilter("builtin.location", "Old location");
    const country = fieldFilter("address.countryCode", "US");
    const region = fieldFilter("builtin.region", "NY");
    const service = fieldFilter("services", "Delivery");
    const hours = fieldFilter("builtin.hours", "now");
    const newLocation = fieldFilter("builtin.location", "New location");
    const filters = replaceLocationFilters(
      [oldLocation, country, region, service, hours],
      newLocation,
      openNow ? hours : undefined
    );
    expect(filters).toEqual(
      openNow ? [service, newLocation, hours] : [service, hours, newLocation]
    );
    expect(oldLocation.selected).toBe(true);
  });
});
