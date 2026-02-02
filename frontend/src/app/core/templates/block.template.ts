import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[tqBlockHeader]'})
export class BlockHeaderTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}

@Directive({selector: 'ng-template[tqBlockContent]'})
export class BlockContentTemplate {
    constructor(public tpl: TemplateRef<any>) {
    }
}