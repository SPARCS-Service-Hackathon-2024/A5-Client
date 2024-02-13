import { createTheme } from "@mui/material";
import { createGlobalStyle } from "styled-components";

export const theme = {
  color: {
    black: "#0C0A09",
    gachiPink: "#E11D48",
    secondPink: "#FB7185",
    lightGray: "#cfcfcf",
    darkGray: "#3e3e3e",
    red: "#ff3737",
    green: "#50C878",
  },
  device: {
    mobile: "max-width: 620px",
  },
};

export const muiTheme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "sans-serif",
    ].join(","),
  },
});

export const GlobalStyle = createGlobalStyle`
  html {
    color: black;
  }
  @media screen and (${theme.device.mobile}) {
    html {
      font-size: 12px;
    }
  }
`;
