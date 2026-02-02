import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[tqSectionListHeader]'})
export class SectionListHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[tqSectionListContent]'})
export class SectionListContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}