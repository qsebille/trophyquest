import {beforeEach, describe, expect, it} from 'vitest';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgdbMappingPage} from './igdb-mapping-page.component';

describe('IgdbMappingPage', () => {
  let component: IgdbMappingPage;
  let fixture: ComponentFixture<IgdbMappingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgdbMappingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IgdbMappingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
