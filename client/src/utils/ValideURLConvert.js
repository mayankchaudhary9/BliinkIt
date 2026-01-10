import React from "react";

export const ValideURLConvert = (name) => {
  const URL = name
    .toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");

  return URL;
};
