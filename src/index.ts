import { LogService } from "matrix-js-snippets";
import config from "./config";
import { DimensionStore } from "./db/DimensionStore";
import Webserver from "./api/Webserver";
import { CURRENT_VERSION } from "./version";
import * as BotSdk from "matrix-bot-sdk";
import StickerCheck from "./StickerCheck";

LogService.configure(config.logging);
LogService.info("index", "Starting dimension " + CURRENT_VERSION);

// redirect the BotSdk to our logger
BotSdk.LogService.setLogger({
    debug: (module: string, ...args: any[]) => args.map(a => LogService.info("BotSdk-" + module, a)),
    info: (module: string, ...args: any[]) => args.map(a => LogService.info("BotSdk-" + module, a)),
    warn: (module: string, ...args: any[]) => args.map(a => LogService.warn("BotSdk-" + module, a)),
    error: (module: string, ...args: any[]) => args.map(a => LogService.error("BotSdk-" + module, a)),
});

async function startup() {
    await DimensionStore.updateSchema();

    const stickerCheck = new StickerCheck();
    stickerCheck.scan();

    const webserver = new Webserver();
    await webserver.start();
}

startup()
    .then(() => LogService.info("index", "Dimension is ready!"))
    .catch((e) => {
        console.error(e);
        process.exit(1)
    });