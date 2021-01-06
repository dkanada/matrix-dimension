import * as config from "config";
import { LogConfig } from "matrix-js-snippets";

export interface DimensionConfig {
    web: {
        port: number;
        address: string;
    };
    homeserver: {
        name: string;
        accessToken: string;
        clientServerUrl: string;
        federationUrl: string;
        mediaUrl: string;
    };
    database: {
        file: string;
        botData: string;
        uri: string;
    };
    admins: string[];
    stickers: {
        enabled: boolean;
        stickerBot: string;
        managerUrl: string;
        path: string;
    };
    dimension: {
        publicUrl: string;
    };
    logging: LogConfig;
}

export default <DimensionConfig>config;
