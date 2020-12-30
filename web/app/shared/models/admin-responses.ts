export interface FE_DimensionConfig {
    admins: string[];
    widgetBlacklist: string[];
    homesever: {
        name: string;
        userId: string;
        federationUrl: string;
        federationHostname: string;
        clientServerUrl: string;
    };
    sessionInfo: {
        numTokens: number;
    };
}

export interface FE_DimensionVersion {
    version: string;
}

export interface FE_Upstream {
    id: number;
    name: string;
    type: string;
    scalarUrl: string;
    apiUrl: string;
}

export interface FE_Appservice {
    id: number;
    hsToken: string;
    asToken: string;
    userPrefix: string;
}

export interface FE_UserProfile {
    name: string;
    avatarUrl: string;
}