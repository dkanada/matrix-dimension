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
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { RiotComponent } from "./riot/riot.component";
import { ScalarClientApiService } from "./shared/services/scalar/scalar-client-api.service";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { ScalarCloseComponent } from "./riot/scalar-close/scalar-close.component";
import { ToggleFullscreenDirective } from "./shared/directives/toggle-fullscreen.directive";
import { PageHeaderComponent } from "./elements/header/header.component";
import { SpinnerComponent } from "./elements/spinner/spinner.component";
import { ScalarServerApiService } from "./shared/services/scalar/scalar-server-api.service";
import { ServiceLocator } from "./shared/registry/locator.service";
import { NameService } from "./shared/services/name.service";
import { AdminIntegrationsApiService } from "./shared/services/admin/admin-integrations-api.service";
import { IntegrationsApiService } from "./shared/services/integrations/integrations-api.service";
import { WidgetApiService } from "./shared/services/integrations/widget-api.service";
import { AdminAppserviceApiService } from "./shared/services/admin/admin-appservice-api.service";
import { ScreenshotCapableDirective } from "./shared/directives/screenshot-capable.directive";
import { AdminStickersApiService } from "./shared/services/admin/admin-stickers-api-service";
import { MediaService } from "./shared/services/media.service";
import { StickerApiService } from "./shared/services/integrations/sticker-api.service";
import { StickerpickerComponent } from "./config/config.component";
import { StickerPickerWidgetWrapperComponent } from "./widget/widget.component";
import { AdminTermsApiService } from "./shared/services/admin/admin-terms-api.service";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
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
        RiotComponent,
        PageHeaderComponent,
        SpinnerComponent,
        ScalarCloseComponent,
        ToggleFullscreenDirective,
        ScreenshotCapableDirective,
        StickerpickerComponent,
        StickerPickerWidgetWrapperComponent,
    ],
    providers: [
        AdminIntegrationsApiService,
        IntegrationsApiService,
        WidgetApiService,
        ScalarClientApiService,
        ScalarServerApiService,
        NameService,
        AdminAppserviceApiService,
        AdminStickersApiService,
        MediaService,
        StickerApiService,
        ToasterService,
        AdminTermsApiService,
        {provide: Window, useValue: window},
    ],
    bootstrap: [AppComponent],
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
