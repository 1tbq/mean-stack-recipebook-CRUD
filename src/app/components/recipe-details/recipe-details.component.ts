import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  load_error:boolean;
  error_text:string;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private recipeService: RecipeService) {
     
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const recipe_id = parseInt(params.get('recipe_id'), 10);
      this.recipeService.getRecipeById(recipe_id).
        then((recipe) => {
          this.recipe = recipe;
        })
        .catch((error)=>{
          this.load_error = true;
          const body = JSON.parse(error._body);
          this.error_text = body.message;
        });
    });   

  }

  goBackPressed(): void {
    this.location.back();
  }

}
