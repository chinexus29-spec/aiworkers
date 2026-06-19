export const USD_RATE = 1350;

export function toUSD(
  naira: number
) {
  return (
    naira / USD_RATE
  ).toFixed(2);
}