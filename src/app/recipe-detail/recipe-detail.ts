import { Component, computed, input, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RecipeModel } from '../models';

@Component({
  imports: [JsonPipe],
  selector: 'app-recipe-detail',
  styleUrl: './recipe-detail.css',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>();
  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() =>
    this.recipe().ingredients.map((ingrediente) => ({
      ...ingrediente,
      quantity: ingrediente.quantity * this.servings(),
    })),
  );

  protected aumentarPorcoes(): void {
    this.servings.update((valorAtual) => valorAtual + 1);
  }

  protected diminuirPorcoes(): void {
    this.servings.update((valorAtual) => Math.max(1, valorAtual - 1));
  }
}

