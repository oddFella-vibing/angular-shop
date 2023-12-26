import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewItemComponent } from './post-new-item.component';

describe('PostNewItemComponent', () => {
  let component: PostNewItemComponent;
  let fixture: ComponentFixture<PostNewItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostNewItemComponent]
    });
    fixture = TestBed.createComponent(PostNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
