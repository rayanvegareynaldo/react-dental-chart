export type ToothColorStyle = {
    stroke: string;
    fill: string;
};

export type ToothNumber =
    // Permanent teeth: Upper right (11–18), upper left (21–28)
    | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18"
    | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28"
    // Permanent teeth: Lower left (31–38), lower right (41–48)
    | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38"
    | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48"
    // Deciduous teeth: Upper right (51–55), upper left (61–65)
    | "51" | "52" | "53" | "54" | "55"
    | "61" | "62" | "63" | "64" | "65"
    // Deciduous teeth: Lower left (71–75), lower right (81–85)
    | "71" | "72" | "73" | "74" | "75"
    | "81" | "82" | "83" | "84" | "85";

export type ToothMode = "combined" | "permanent" | "deciduous"
