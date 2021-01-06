import config from "./config";
import StickerPack from "./db/models/StickerPack";
import Sticker from "./db/models/Sticker";
import { MatrixLiteClient } from "./matrix/MatrixLiteClient";
import { LogService } from "matrix-js-snippets";
import { Cache, CACHE_STICKERS } from "./MemoryCache";
import * as sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

class StickerCheck {
    public async scan(): Promise<any> {
        const dirs = await fs.promises.readdir(config.stickers.path);
        const packs = await StickerPack.findAll();

        let deletedPacks = [];
        let existingPacks = [];
        packs.forEach(pack => {
            if (!dirs.includes(pack.name)) {
                deletedPacks.push(pack);
            } else {
                existingPacks.push(pack);
            }
        });

        let newPacks = [];
        dirs.forEach(dir => {
            const found = packs.find(pack => {
                return pack.name === dir;
            });

            if (!found) {
                newPacks.push(dir);
            }
        });

        for (const dir of newPacks) {
            LogService.info("MatrixStickerBot", `creating pack: ${dir}`);
            const pack = await StickerPack.create({
                type: "stickerpack",
                name: dir,
                description: "PLACEHOLDER",
                avatarUrl: "PLACEHOLDER",
                isEnabled: true,
                isPublic: true,
                authorType: "none",
                license: "GPL-v3.0",
                licensePath: "/licenses/gpl-v3.0.txt",
            });

            await this.updateStickers(pack);
        }

        for (const pack of existingPacks) {
            LogService.info("MatrixStickerBot", `updating pack: ${pack.name}`);
            await this.updateStickers(pack);
        }

        for (const pack of deletedPacks) {
            LogService.info("MatrixStickerBot", `destroying pack: ${pack.name}`);
            await pack.destroy();
        }
    }

    private async updateStickers(pack: StickerPack): Promise<any> {
        const mx = new MatrixLiteClient(config.homeserver.accessToken);

        const stickers = await Sticker.findAll({ where: { packId: pack.id } });
        const files = await fs.promises.readdir(path.join(config.stickers.path, pack.name));

        let deletedStickers = [];
        stickers.forEach(sticker => {
            if (!files.includes(sticker.name)) {
                deletedStickers.push(sticker);
            }
        });

        let newStickers = [];
        files.forEach(file => {
            const found = stickers.find(sticker => {
                return sticker.name === path.basename(file, path.extname(file));
            });

            if (!found) {
                newStickers.push(file);
            }
        });

        for (const sticker of newStickers) {
            const file = path.join(config.stickers.path, pack.name, sticker);
            const buffer = await sharp(file).png().toBuffer();
            const url = await mx.upload(buffer, "image/png");

            const newSticker = await Sticker.create({
                packId: pack.id,
                name: path.basename(sticker, path.extname(sticker)),
                description: path.basename(sticker, path.extname(sticker)),
                imageMxc: url,
                thumbnailMxc: url,
                thumbnailWidth: 512,
                thumbnailHeight: 512,
                mimetype: "image/png",
            });

            LogService.info("MatrixStickerBot", `creating sticker: ${sticker}`);
            stickers.push(newSticker);
        }

        for (const sticker of deletedStickers) {
            LogService.info("MatrixStickerBot", `destroying sticker: ${sticker}`);
            await sticker.destroy();
        }

        if (stickers.length > 0 && pack.avatarUrl === "PLACEHOLDER") {
            pack.avatarUrl = stickers[0].thumbnailMxc;
            await pack.save();
        }

        Cache.for(CACHE_STICKERS).clear();
    }
}

export default StickerCheck;
