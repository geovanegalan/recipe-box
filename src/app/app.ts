import { Component, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly servings = signal<number>(1);

  protected verCarbonara(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected verSaladaCaprese(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

  protected aumentarPorcoes(): void {
    this.servings.update((valorAtual) => valorAtual + 1);
  }

  protected diminuirPorcoes(): void {
    this.servings.update((valorAtual) => Math.max(1, valorAtual - 1));
  }
}
