import { describe, it, expect } from "vitest";
import { getDeliveryTimeRange } from "@/utils/format";

describe("getDeliveryTimeRange", () => {
  it("returns '0-10 min' for 0 minutes", () => {
    expect(getDeliveryTimeRange(0)).toBe("0-10 min");
  });

  it("returns '0-10 min' at the 10 minute boundary", () => {
    expect(getDeliveryTimeRange(10)).toBe("0-10 min");
  });

  it("returns '10-30 min' for 11 minutes", () => {
    expect(getDeliveryTimeRange(11)).toBe("10-30 min");
  });

  it("returns '10-30 min' at the 30 minute boundary", () => {
    expect(getDeliveryTimeRange(30)).toBe("10-30 min");
  });

  it("returns '30-60 min' for 31 minutes", () => {
    expect(getDeliveryTimeRange(31)).toBe("30-60 min");
  });

  it("returns '30-60 min' at the 60 minute boundary", () => {
    expect(getDeliveryTimeRange(60)).toBe("30-60 min");
  });

  it("returns '1 hour+' for 61 minutes", () => {
    expect(getDeliveryTimeRange(61)).toBe("1 hour+");
  });

  it("returns '1 hour+' for very large values", () => {
    expect(getDeliveryTimeRange(999)).toBe("1 hour+");
  });
});
