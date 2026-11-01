import { Component, signal } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';

@Component({
  imports: [RecipeDetail],
  selector: 'app-recipe-list',
  styleUrl: './recipe-list.css',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected verCarbonara(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected verSaladaCaprese(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

}

