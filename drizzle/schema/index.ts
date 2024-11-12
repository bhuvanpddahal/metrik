import * as userSchema from "./users";
import * as accountSchema from "./accounts";
import * as verificationTokenSchema from "./verification-tokens";

export default {
    ...userSchema,
    ...accountSchema,
    ...verificationTokenSchema
};