import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);

  protected verCarbonara(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected verSaladaCaprese(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }
}
