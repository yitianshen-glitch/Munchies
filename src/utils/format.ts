export function getDeliveryTimeRange(minutes: number): string {
  if (minutes <= 10) return "0-10 min";
  if (minutes <= 30) return "10-30 min";
  if (minutes <= 60) return "30-60 min";
  return "1 hour+";
}
