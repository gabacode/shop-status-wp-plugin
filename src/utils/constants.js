export const days = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

export const openingStatus = [
  {
    value: true,
    label: "Aperto",
  },
  {
    value: false,
    label: "Chiuso",
  },
];

export const openingOptions = days.map((day, index) => ({
  value: index,
  label: day,
}));

