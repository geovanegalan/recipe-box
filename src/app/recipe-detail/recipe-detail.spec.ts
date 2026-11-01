import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetail } from './recipe-detail';
import { MOCK_RECIPES } from '../mock-recipes';

describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    fixture.componentRef.setInput('recipe', MOCK_RECIPES[0]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

