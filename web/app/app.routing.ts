import { RouterModule, Routes } from "@angular/router";
import { RiotComponent } from "./riot/riot.component";
import { StickerpickerComponent } from "./config/config.component";
import { StickerPickerWidgetWrapperComponent } from "./widget/widget.component";

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "riot-app"},
    {path: "riot", pathMatch: "full", redirectTo: "riot-app"},
    {path: "element", pathMatch: "full", redirectTo: "riot-app"},
    {
        path: "riot-app",
        component: RiotComponent,
        data: {breadcrumb: "Home", name: "Dimension"},
        children: [
            {
                path: "",
                component: StickerpickerComponent,
                data: {breadcrumb: "Stickers", name: "Stickers"},
            },
        ],
    },
    {
        path: "widgets",
        children: [
            {path: "stickerpicker", component: StickerPickerWidgetWrapperComponent},
        ]
    },
];

export const routing = RouterModule.forRoot(routes);
