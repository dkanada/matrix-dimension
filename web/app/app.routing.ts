import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RiotComponent } from "./riot/riot.component";
import { GenericWidgetWrapperComponent } from "./widget-wrappers/generic/generic.component";
import { VideoWidgetWrapperComponent } from "./widget-wrappers/video/video.component";
import { RiotHomeComponent } from "./riot/riot-home/home.component";
import { CustomWidgetConfigComponent } from "./configs/widget/custom/custom.widget.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminHomeComponent } from "./admin/home/home.component";
import { AdminWidgetsComponent } from "./admin/widgets/widgets.component";
import { AdminStickerPacksComponent } from "./admin/sticker-packs/sticker-packs.component";
import { StickerpickerComponent } from "./configs/stickerpicker/stickerpicker.component";
import { StickerPickerWidgetWrapperComponent } from "./widget-wrappers/sticker-picker/sticker-picker.component";
import { GenericFullscreenWidgetWrapperComponent } from "./widget-wrappers/generic-fullscreen/generic-fullscreen.component";
import { ReauthExampleWidgetWrapperComponent } from "./widget-wrappers/reauth-example/reauth-example.component";
import { ManagerTestWidgetWrapperComponent } from "./widget-wrappers/manager-test/manager-test.component";
import { AdminTermsComponent } from "./admin/terms/terms.component";
import { AdminNewEditTermsComponent } from "./admin/terms/new-edit/new-edit.component";
import { TermsWidgetWrapperComponent } from "./widget-wrappers/terms/terms.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "riot", pathMatch: "full", redirectTo: "riot-app"},
    {path: "element", pathMatch: "full", redirectTo: "riot-app"},
    {
        path: "riot-app",
        component: RiotComponent,
        data: {breadcrumb: "Home", name: "Dimension"},
        children: [
            {
                path: "",
                component: RiotHomeComponent,
            },
            {
                path: "admin",
                component: AdminComponent,
                data: {breadcrumb: "Admin", name: "Settings"},
                children: [
                    {
                        path: "",
                        component: AdminHomeComponent,
                    },
                    {
                        path: "widgets",
                        component: AdminWidgetsComponent,
                        data: {breadcrumb: "Widgets", name: "Widgets"},
                    },
                    {
                        path: "stickerpacks",
                        data: {breadcrumb: "Stickers", name: "Stickers"},
                        children: [
                            {
                                path: "",
                                component: AdminStickerPacksComponent,
                            },
                        ],
                    },
                    {
                        path: "terms",
                        data: {breadcrumb: "Terms of Service", name: "Terms of Service"},
                        children: [
                            {
                                path: "",
                                component: AdminTermsComponent,
                            },
                            {
                                path: "new",
                                component: AdminNewEditTermsComponent,
                                data: {breadcrumb: "New Policy", name: "New Policy"},
                            },
                            {
                                path: "edit/:shortcode",
                                component: AdminNewEditTermsComponent,
                                data: {breadcrumb: "Edit Policy", name: "Edit Policy"},
                            },
                        ],
                    },
                ],
            },
            {
                path: "widget",
                children: [
                    {
                        path: "custom",
                        component: CustomWidgetConfigComponent,
                        data: {breadcrumb: "Custom", name: "Custom"},
                    },
                ],
            },
            {
                path: "stickerpicker",
                component: StickerpickerComponent,
                data: {breadcrumb: "Stickers", name: "Stickers"},
            },
        ],
    },
    {
        path: "widgets",
        children: [
            {path: "terms/:shortcode/:lang/:version", component: TermsWidgetWrapperComponent},
            {path: "generic", component: GenericWidgetWrapperComponent},
            {path: "video", component: VideoWidgetWrapperComponent},
            {path: "stickerpicker", component: StickerPickerWidgetWrapperComponent},
            {path: "generic-fullscreen", component: GenericFullscreenWidgetWrapperComponent},
            {path: "reauth", component: ReauthExampleWidgetWrapperComponent},
            {path: "manager-test", component: ManagerTestWidgetWrapperComponent},
        ]
    },
];

export const routing = RouterModule.forRoot(routes);
