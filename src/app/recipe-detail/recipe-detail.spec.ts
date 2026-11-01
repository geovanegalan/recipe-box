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

  it('ajusta as quantidades pelas porções sem modificar a receita original', async () => {
    const page = fixture.nativeElement as HTMLElement;
    const originalIngredients = structuredClone(MOCK_RECIPES[0].ingredients);
    const increaseButton = Array.from(page.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Aumentar porções'),
    )!;

    expect(page.querySelector('.ingredients li')?.textContent).toContain('200 g');
    increaseButton.click();
    await fixture.whenStable();

    expect(page.querySelector('.ingredients li')?.textContent).toContain('400 g');
    expect(MOCK_RECIPES[0].ingredients).toEqual(originalIngredients);

    fixture.componentRef.setInput('recipe', MOCK_RECIPES[1]);
    await fixture.whenStable();

    expect(page.querySelector('h2')?.textContent).toContain('Salada Caprese');
    expect(page.querySelector('.ingredients li')?.textContent).toContain('8 unidades');
    expect(MOCK_RECIPES[1].ingredients[0].quantity).toBe(4);
  });

  it('mantém pelo menos uma porção', async () => {
    const page = fixture.nativeElement as HTMLElement;
    const decreaseButton = Array.from(page.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Diminuir porções'),
    )!;

    decreaseButton.click();
    decreaseButton.click();
    await fixture.whenStable();

    expect(page.textContent).toContain('Porções: 1');
    expect(page.querySelector('.ingredients li')?.textContent).toContain('200 g');
  });
});
