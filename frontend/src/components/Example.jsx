import React from "react";
import dayjs from "dayjs";

export default function Example() {
  const today = dayjs().format("DD MMM YYYY"); // e.g. 26 Oct 2025

  return <div>Today is: {today}</div>;
}
