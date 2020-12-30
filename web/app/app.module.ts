import { ApplicationRef, Injector, NgModule } from "@angular/core";
import { ModalModule } from "ngx-modialog";
import { BootstrapModalModule } from "ngx-modialog/plugins/bootstrap";
import { BreadcrumbsModule } from "ng2-breadcrumbs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiSwitchModule } from "angular2-ui-switch";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { RiotComponent } from "./riot/riot.component";
import { ScalarClientApiService } from "./shared/services/scalar/scalar-client-api.service";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { ScalarCloseComponent } from "./riot/scalar-close/scalar-close.component";
import { GenericWidgetWrapperComponent } from "./widget-wrappers/generic/generic.component";
import { ToggleFullscreenDirective } from "./shared/directives/toggle-fullscreen.directive";
import { FullscreenButtonComponent } from "./elements/fullscreen-button/fullscreen-button.component";
import { VideoWidgetWrapperComponent } from "./widget-wrappers/video/video.component";
import { PageHeaderComponent } from "./page-header/page-header.component";
import { SpinnerComponent } from "./elements/spinner/spinner.component";
import { RiotHomeComponent } from "./riot/riot-home/home.component";
import { IntegrationBagComponent } from "./integration-bag/integration-bag.component";
import { ScalarServerApiService } from "./shared/services/scalar/scalar-server-api.service";
import { AdminApiService } from "./shared/services/admin/admin-api.service";
import { ServiceLocator } from "./shared/registry/locator.service";
import { IboxComponent } from "./elements/ibox/ibox.component";
import { CustomWidgetConfigComponent } from "./configs/widget/custom/custom.widget.component";
import { ConfigScreenWidgetComponent } from "./configs/widget/config-screen/config-screen.widget.component";
import { NameService } from "./shared/services/name.service";
import { AdminComponent } from "./admin/admin.component";
import { AdminHomeComponent } from "./admin/home/home.component";
import { AdminWidgetsComponent } from "./admin/widgets/widgets.component";
import { AdminIntegrationsApiService } from "./shared/services/admin/admin-integrations-api.service";
import { IntegrationsApiService } from "./shared/services/integrations/integrations-api.service";
import { WidgetApiService } from "./shared/services/integrations/widget-api.service";
import { AdminAppserviceApiService } from "./shared/services/admin/admin-appservice-api.service";
import { AdminNebApiService } from "./shared/services/admin/admin-neb-api.service";
import { AdminUpstreamApiService } from "./shared/services/admin/admin-upstream-api.service";
import { AdminNebComponent } from "./admin/neb/neb.component";
import { AdminEditNebComponent } from "./admin/neb/edit/edit.component";
import { AdminAddSelfhostedNebComponent } from "./admin/neb/add-selfhosted/add-selfhosted.component";
import { AdminNebAppserviceConfigComponent } from "./admin/neb/appservice-config/appservice-config.component";
import { AdminNebGiphyConfigComponent } from "./admin/neb/config/giphy/giphy.component";
import { AdminNebGuggyConfigComponent } from "./admin/neb/config/guggy/guggy.component";
import { AdminNebGoogleConfigComponent } from "./admin/neb/config/google/google.component";
import { AdminNebImgurConfigComponent } from "./admin/neb/config/imgur/imgur.component";
import { ConfigSimpleBotComponent } from "./configs/simple-bot/simple-bot.component";
import { ScreenshotCapableDirective } from "./shared/directives/screenshot-capable.directive";
import { AdminStickersApiService } from "./shared/services/admin/admin-stickers-api-service";
import { AdminStickerPacksComponent } from "./admin/sticker-packs/sticker-packs.component";
import { AdminStickerPackPreviewComponent } from "./admin/sticker-packs/preview/preview.component";
import { MediaService } from "./shared/services/media.service";
import { StickerApiService } from "./shared/services/integrations/sticker-api.service";
import { StickerpickerComponent } from "./configs/stickerpicker/stickerpicker.component";
import { StickerPickerWidgetWrapperComponent } from "./widget-wrappers/sticker-picker/sticker-picker.component";
import { GenericFullscreenWidgetWrapperComponent } from "./widget-wrappers/generic-fullscreen/generic-fullscreen.component";
import { AdminLogoutConfirmationDialogComponent } from "./admin/home/logout-confirmation/logout-confirmation.component";
import { ReauthExampleWidgetWrapperComponent } from "./widget-wrappers/reauth-example/reauth-example.component";
import { ManagerTestWidgetWrapperComponent } from "./widget-wrappers/manager-test/manager-test.component";
import { AdminTermsApiService } from "./shared/services/admin/admin-terms-api.service";
import { AdminTermsComponent } from "./admin/terms/terms.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AdminNewEditTermsComponent } from "./admin/terms/new-edit/new-edit.component";
import { AdminTermsNewEditPublishDialogComponent } from "./admin/terms/new-edit/publish/publish.component";
import { TermsWidgetWrapperComponent } from "./widget-wrappers/terms/terms.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        routing,
        NgbModule,
        UiSwitchModule,
        ToasterModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        BreadcrumbsModule,
        CKEditorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        RiotComponent,
        IntegrationBagComponent,
        PageHeaderComponent,
        SpinnerComponent,
        ScalarCloseComponent,
        GenericWidgetWrapperComponent,
        ToggleFullscreenDirective,
        FullscreenButtonComponent,
        VideoWidgetWrapperComponent,
        RiotHomeComponent,
        IboxComponent,
        ConfigScreenWidgetComponent,
        CustomWidgetConfigComponent,
        AdminComponent,
        AdminHomeComponent,
        AdminWidgetsComponent,
        AdminNebComponent,
        AdminEditNebComponent,
        AdminAddSelfhostedNebComponent,
        AdminNebAppserviceConfigComponent,
        AdminNebGiphyConfigComponent,
        AdminNebGuggyConfigComponent,
        AdminNebGoogleConfigComponent,
        AdminNebImgurConfigComponent,
        ConfigSimpleBotComponent,
        ScreenshotCapableDirective,
        AdminStickerPacksComponent,
        AdminStickerPackPreviewComponent,
        StickerpickerComponent,
        StickerPickerWidgetWrapperComponent,
        GenericFullscreenWidgetWrapperComponent,
        AdminLogoutConfirmationDialogComponent,
        ReauthExampleWidgetWrapperComponent,
        ManagerTestWidgetWrapperComponent,
        AdminTermsComponent,
        AdminNewEditTermsComponent,
        AdminTermsNewEditPublishDialogComponent,
        TermsWidgetWrapperComponent,
    ],
    providers: [
        AdminApiService,
        AdminIntegrationsApiService,
        IntegrationsApiService,
        WidgetApiService,
        ScalarClientApiService,
        ScalarServerApiService,
        NameService,
        AdminAppserviceApiService,
        AdminNebApiService,
        AdminUpstreamApiService,
        AdminStickersApiService,
        MediaService,
        StickerApiService,
        ToasterService,
        AdminTermsApiService,
        {provide: Window, useValue: window},
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AdminNebAppserviceConfigComponent,
        AdminNebGiphyConfigComponent,
        AdminNebGuggyConfigComponent,
        AdminNebGoogleConfigComponent,
        AdminNebImgurConfigComponent,
        ConfigSimpleBotComponent,
        AdminStickerPackPreviewComponent,
        AdminLogoutConfirmationDialogComponent,
        AdminTermsNewEditPublishDialogComponent,
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, injector: Injector) {
        ServiceLocator.injector = injector;
    }

    hmrOnInit(store) {
        console.log("HMR store", store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
