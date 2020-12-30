import { animate, style, transition, trigger } from "@angular/animations";

export const ANIMATION_FADE_IN_NOT_OUT =
    trigger('fadeInNotOutAnimation', [
        transition(':enter', [
            style({opacity: 0}),
            animate('200ms', style({opacity: 1})),
        ]),
    ]);