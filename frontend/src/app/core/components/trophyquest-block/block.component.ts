import {Component, ContentChild} from '@angular/core';
import {BlockContentTemplate, BlockHeaderTemplate} from "../../templates/block.template";
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'tq-block',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './block.component.html',
    styleUrl: './block.component.scss',
})
export class BlockComponent {
    @ContentChild(BlockHeaderTemplate) headerTemplate?: BlockHeaderTemplate;
    @ContentChild(BlockContentTemplate) contentTemplate?: BlockContentTemplate;
}
