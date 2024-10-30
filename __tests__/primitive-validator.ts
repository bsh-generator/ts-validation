import { m, v } from "@bshg/validation";

export default () => {
  const pv = v.primitive<string>(v.string().required().email());

  it("should build a validator correctly", () => {
    expect(pv).toBeDefined();
  });

  it("should validate", () => {
    const actual = pv.apply("bshg@mail.com");
    expect(actual).toBeDefined();
    expect(actual.status).toBe(true);
    expect(actual.err).toBeUndefined();
  });

  it("should validate", () => {
    const actual = pv.apply("bshgmail.com");
    expect(actual).toBeDefined();
    expect(actual.status).toBe(false);
    expect(actual.err).toBe(m.Messages.en.string.email);
  });
}