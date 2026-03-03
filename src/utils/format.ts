export const DELIVERY_TIMES = ["0-10 min", "10-30 min", "30-60 min", "1 hour+"] as const;

export function getDeliveryTimeRange(minutes: number): string {
  if (minutes <= 10) return DELIVERY_TIMES[0];
  if (minutes <= 30) return DELIVERY_TIMES[1];
  if (minutes <= 60) return DELIVERY_TIMES[2];
  return DELIVERY_TIMES[3];
}
