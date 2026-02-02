import {Component, ContentChild} from '@angular/core';
import {SectionListContentTemplate, SectionListHeaderTemplate} from "../../templates/section-list.template";
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'tq-section-list',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './section-list.component.html',
    styleUrl: './section-list.component.scss',
})
export class SectionListComponent {
    @ContentChild(SectionListHeaderTemplate) headerTemplate?: SectionListHeaderTemplate;
    @ContentChild(SectionListContentTemplate) contentTemplate?: SectionListContentTemplate;
}
