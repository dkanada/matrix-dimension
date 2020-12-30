import { Injectable } from "@angular/core";
import {
    WIDGET_CUSTOM,
    WIDGET_STICKERS,
} from "../models/widget";
import { FE_Integration } from "../models/integration";

@Injectable()
export class IntegrationsRegistry {

    private static supportedIntegrationsMap = {
        "bot": {},
        "bridge": {
            "irc": {},
            "telegram": {},
            "webhooks": {},
            "slack": {},
        },
        "widget": {
            "custom": {
                types: WIDGET_CUSTOM,
            },
            "stickerpicker": {
                types: WIDGET_STICKERS,
            },
        },
    };

    static isSupported(integration: FE_Integration): boolean {
        const forType = IntegrationsRegistry.supportedIntegrationsMap[integration.category];
        if (!forType) return false;

        if (Object.keys(forType).length === 0) return true;

        return forType[integration.type];
    }

    static getIntegrationForScreen(screen: string): { category: string, type: string } {
        for (const category of Object.keys(IntegrationsRegistry.supportedIntegrationsMap)) {
            for (const type of Object.keys(IntegrationsRegistry.supportedIntegrationsMap[category])) {
                const integrationTypes = IntegrationsRegistry.supportedIntegrationsMap[category][type].types;
                if (!integrationTypes) continue;

                const integrationScreens = integrationTypes.map(t => "type_" + t);
                if (integrationScreens.includes(screen)) return {category: category, type: type};
            }
        }

        return null;
    }

    private constructor() {
    }
}
