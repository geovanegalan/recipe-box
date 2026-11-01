import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeList } from './recipe-list';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('troca a receita exibida e mostra o indicador apenas para a favorita', async () => {
    const page = fixture.nativeElement as HTMLElement;
    const recipeButtons = Array.from(page.querySelectorAll('button'));
    const carbonaraButton = recipeButtons.find((button) =>
      button.textContent?.includes('Ver Carbonara'),
    )!;
    const capreseButton = recipeButtons.find((button) =>
      button.textContent?.includes('Ver Salada Caprese'),
    )!;

    expect(page.querySelector('h2')?.textContent).toContain('Spaghetti Carbonara');
    expect(page.querySelector('.favorite-indicator')).not.toBeNull();

    capreseButton.click();
    await fixture.whenStable();

    expect(page.querySelector('h2')?.textContent).toContain('Salada Caprese');
    expect(page.querySelector('.favorite-indicator')).toBeNull();
    expect(page.querySelector('img')?.alt).toBe('Salada Caprese');
    expect(page.querySelector('.ingredients')?.textContent).toContain('Tomates');
    expect(page.querySelector('.ingredients')?.textContent).not.toContain('Espaguete');

    carbonaraButton.click();
    await fixture.whenStable();

    expect(page.querySelector('h2')?.textContent).toContain('Spaghetti Carbonara');
    expect(page.querySelector('.favorite-indicator')).not.toBeNull();
  });
});
