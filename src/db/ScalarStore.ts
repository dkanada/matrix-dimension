import UserScalarToken from "./models/UserScalarToken";
import { LogService } from "matrix-js-snippets";
import User from "./models/User";

export class ScalarStore {

    public static async doesUserHaveTokensForAllUpstreams(userId: string, scalarKind: string): Promise<boolean> {
        const scalarTokens = await UserScalarToken.findAll({where: {userId: userId}});
        const hasDimensionToken = scalarTokens.filter(t => t.isDimensionToken).length >= 1;

        if (!hasDimensionToken) {
            LogService.warn("ScalarStore", "User " + userId + " is missing a Dimension scalar token");
            return false;
        }

        return true;
    }

    public static async getTokenOwner(scalarToken: string): Promise<User> {
        const tokens = await UserScalarToken.findAll({
            where: {isDimensionToken: true, scalarToken: scalarToken},
            include: [User]
        });

        if (!tokens || tokens.length === 0) throw new Error("Invalid token");

        return tokens[0].user;
    }

    private constructor() {
    }
}