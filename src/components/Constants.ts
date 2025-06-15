import type { ToothNumber } from "./Types";

/**
 * Default SVG path styling used for dental chart paths.
 */
export const PATH_STYLE = {
  fill: "none",
  stroke: "#000",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "miter" as const,
  strokeMiterlimit: 4,
  strokeOpacity: 1,
  strokeDasharray: "none",
};

/**
 * Default SVG text styling for tooth labels.
 */
export const TEXT_STYLE = {
  fontSize: "10.13467216px",
  fontStyle: "normal",
  fontWeight: "normal",
  lineHeight: "125%",
  letterSpacing: "0px",
  wordSpacing: "0px",
  fill: "#000000",
  fillOpacity: 1,
  stroke: "none",
  fontFamily: "Sans",
};

/**
 * Default chart dimensions.
 */
export const DEFAULT_DIMENSIONS = {
  width: 289.61084,
  height: 370.54398,
};

/**
 * All tooth numbers: Permanent + Deciduous.
 */
export const ALL_TOOTH_NUMBERS: ToothNumber[] = [
  // Permanent teeth
  "11", "12", "13", "14", "15", "16", "17", "18",
  "21", "22", "23", "24", "25", "26", "27", "28",
  "31", "32", "33", "34", "35", "36", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48",

  // Deciduous teeth
  "51", "52", "53", "54", "55",
  "61", "62", "63", "64", "65",
  "71", "72", "73", "74", "75",
  "81", "82", "83", "84", "85",
];

/**
 * Permanent teeth numbers.
 */
export const PERMANENT_NUMBERS: ToothNumber[] = [
  "11", "12", "13", "14", "15", "16", "17", "18",
  "21", "22", "23", "24", "25", "26", "27", "28",
  "31", "32", "33", "34", "35", "36", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48",
];

/**
 * Deciduous teeth numbers.
 */
export const DECIDUOUS_NUMBERS: ToothNumber[] = [
  "51", "52", "53", "54", "55",
  "61", "62", "63", "64", "65",
  "71", "72", "73", "74", "75",
  "81", "82", "83", "84", "85",
];
