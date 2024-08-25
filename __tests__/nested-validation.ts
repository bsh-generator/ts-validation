import { m, v } from "@bshg/validation";
import { Profile, User } from "./types";

const profileValidator = v.validator<Profile>({
  id: "profileValidator",
  items: {
    name: v.string().required().notEmpty().alpha(),
    age: v.number().required().positive()
      .onError({
        error: (value) => value < 10,
        message: "too young",
      }).onError({
        error: (value) => value > 100,
        message: "too old",
      }),
  },
});

const userValidator = v.validator<User>({
  id: "userValidator",
  items: {
    email: v.string().required(),
    username: v.string().required(),
  },
  nested: {
    profile: profileValidator,
  },
});

const profileSample = {
  name: "John",
  age: 25,
};

const userSample = {
  email: "example@mail.com",
  username: "test",
  profile: profileSample,
};

export default () => {
  it("should validate a correct user with a valid profile", () => {
    userValidator.reset();
    const res = userValidator.validate(userSample);
    expect(res).toBe(true);
  });

  it("should invalidate a profile with an empty name", () => {
    userValidator.reset();
    const res = userValidator.validate({
      ...userSample,
      profile: { ...profileSample, name: "" },
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.name?.message).toBe(m.Messages.en.string.notEmpty);
  });

  it("should invalidate a profile with a name containing non-alphabetic characters", () => {
    userValidator.reset();
    const res = userValidator.validate({
      ...userSample,
      profile: { ...profileSample, name: "John123" },
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.name?.message).toBe(m.Messages.en.string.alpha);
  });

  it("should invalidate a profile with an age less than 10", () => {
    userValidator.reset();
    const res = userValidator.validate({
      ...userSample,
      profile: { ...profileSample, age: 8 },
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.age?.message).toBe("too young");
  });

  it("should invalidate a profile with an age greater than 100", () => {
    userValidator.reset();
    const res = userValidator.validate({
      ...userSample,
      profile: { ...profileSample, age: 105 },
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.age?.message).toBe("too old");
  });

  it("should invalidate a profile with a missing name", () => {
    userValidator.reset();
    const res = userValidator.validate({
      email: "example@mail.com",
      username: "test",
      profile: {
        age: 25,
      } as Profile,
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.name?.message).toBe(m.Messages.en.string.required);
    expect(userValidator.nested.profile?.items?.age?.message).toBeUndefined();
  });

  it("should invalidate a profile with a missing age", () => {
    userValidator.reset();
    const res = userValidator.validate({
      email: "example@mail.com",
      username: "test",
      profile: {
        name: "John",
      } as Profile,
    });

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.name?.message).toBeUndefined();
    expect(userValidator.nested.profile?.items?.age?.message).toBe(m.Messages.en.number.required);
  });

  it("should invalidate when profile object is missing", () => {
    userValidator.reset();
    const res = userValidator.validate({
      email: "example@mail.com",
      username: "test",
    } as User);

    expect(res).toBe(false);
    expect(userValidator.nested.profile?.items?.name?.message).toBeUndefined();
    expect(userValidator.nested.profile?.items?.age?.message).toBeUndefined();

    expect(userValidator.nested.profile?.status.field).toBe("profile");
    expect(userValidator.nested.profile?.status.valid).toBe(false);
    expect(userValidator.nested.profile?.status.message).toBe("The value of profile is undefined.");
  });
}
