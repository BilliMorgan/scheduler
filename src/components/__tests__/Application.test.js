import React from "react";
import {
  render,
  cleanup,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";
import Application from "components/Application";
import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { getByText } from "@testing-library/react";
import { debug } from "webpack";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    //debug();
    
    
    expect(getByText(appointment, "on my way")).toBeInTheDocument();
    //expect(getByText(appointment, "on my way")).not.toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    //console.log(prettyDOM(day));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument(); //spot remaining functionality does not work yet
  });
});
