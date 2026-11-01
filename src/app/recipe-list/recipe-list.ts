import { Component, computed, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';

@Component({
  imports: [JsonPipe],
  selector: 'app-recipe-list',
  styleUrl: './recipe-list.css',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() =>
    this.recipe().ingredients.map((ingrediente) => ({
      ...ingrediente,
      quantity: ingrediente.quantity * this.servings(),
    })),
  );

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


