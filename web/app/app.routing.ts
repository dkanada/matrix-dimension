import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RiotComponent } from "./riot/riot.component";
import { GenericWidgetWrapperComponent } from "./widget-wrappers/generic/generic.component";
import { VideoWidgetWrapperComponent } from "./widget-wrappers/video/video.component";
import { JitsiWidgetWrapperComponent } from "./widget-wrappers/jitsi/jitsi.component";
import { RiotHomeComponent } from "./riot/riot-home/home.component";
import { CustomWidgetConfigComponent } from "./configs/widget/custom/custom.widget.component";
import { EtherpadWidgetConfigComponent } from "./configs/widget/etherpad/etherpad.widget.component";
import { JitsiWidgetConfigComponent } from "./configs/widget/jitsi/jitsi.widget.component";
import { TwitchWidgetConfigComponent } from "./configs/widget/twitch/twitch.widget.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminHomeComponent } from "./admin/home/home.component";
import { AdminWidgetsComponent } from "./admin/widgets/widgets.component";
import { AdminNebComponent } from "./admin/neb/neb.component";
import { AdminEditNebComponent } from "./admin/neb/edit/edit.component";
import { AdminAddSelfhostedNebComponent } from "./admin/neb/add-selfhosted/add-selfhosted.component";
import { AdminStickerPacksComponent } from "./admin/sticker-packs/sticker-packs.component";
import { StickerpickerComponent } from "./configs/stickerpicker/stickerpicker.component";
import { StickerPickerWidgetWrapperComponent } from "./widget-wrappers/sticker-picker/sticker-picker.component";
import { GenericFullscreenWidgetWrapperComponent } from "./widget-wrappers/generic-fullscreen/generic-fullscreen.component";
import { GrafanaWidgetConfigComponent } from "./configs/widget/grafana/grafana.widget.component";
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
                        path: "neb",
                        data: {breadcrumb: "go-neb", name: "go-neb configuration"},
                        children: [
                            {
                                path: "",
                                component: AdminNebComponent,
                            },
                            {
                                path: ":nebId/edit",
                                component: AdminEditNebComponent,
                                data: {breadcrumb: "Edit go-neb", name: "Edit go-neb"},
                            },
                            {
                                path: "new/selfhosted",
                                component: AdminAddSelfhostedNebComponent,
                                data: {breadcrumb: "Add self-hosted go-neb", name: "Add self-hosted go-neb"},
                            },
                        ]
                    },
                    {
                        path: "stickerpacks",
                        data: {breadcrumb: "Sticker Packs", name: "Sticker Packs"},
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
                                data: {breadcrumb: "New policy", name: "New policy"},
                            },
                            {
                                path: "edit/:shortcode",
                                component: AdminNewEditTermsComponent,
                                data: {breadcrumb: "Edit policy", name: "Edit policy"},
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
                        data: {breadcrumb: "Custom Widgets", name: "Custom Widgets"},
                    },
                    {
                        path: "etherpad",
                        component: EtherpadWidgetConfigComponent,
                        data: {breadcrumb: "Notes Widgets", name: "Notes Widgets"},
                    },
                    {
                        path: "jitsi",
                        component: JitsiWidgetConfigComponent,
                        data: {breadcrumb: "Jitsi Widgets", name: "Jitsi Widgets"},
                    },
                    {
                        path: "twitch",
                        component: TwitchWidgetConfigComponent,
                        data: {breadcrumb: "Twitch Livestream Widgets", name: "Twitch Livestream Widgets"},
                    },
                    {
                        path: "grafana",
                        component: GrafanaWidgetConfigComponent,
                        data: {breadcrumb: "Grafana Widgets", name: "Grafana Widgets"},
                    },
                ],
            },
            {
                path: "stickerpicker",
                component: StickerpickerComponent,
                data: {breadcrumb: "Your Sticker Packs", name: "Your Sticker Packs"},
            },
        ],
    },
    {
        path: "widgets",
        children: [
            {path: "terms/:shortcode/:lang/:version", component: TermsWidgetWrapperComponent},
            {path: "generic", component: GenericWidgetWrapperComponent},
            {path: "video", component: VideoWidgetWrapperComponent},
            {path: "jitsi", component: JitsiWidgetWrapperComponent},
            {path: "stickerpicker", component: StickerPickerWidgetWrapperComponent},
            {path: "generic-fullscreen", component: GenericFullscreenWidgetWrapperComponent},
            {path: "reauth", component: ReauthExampleWidgetWrapperComponent},
            {path: "manager-test", component: ManagerTestWidgetWrapperComponent},
        ]
    },
];

export const routing = RouterModule.forRoot(routes);
