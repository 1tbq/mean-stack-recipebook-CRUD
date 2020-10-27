import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import {  Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

recipes_loaded:boolean;
load_error:boolean;
error_text:string;

  recipes:Recipe[];
  recipe_in_progress:Recipe;

 constructor(private router:Router, private recipeService:RecipeService){     
   this.load_error = false;
 }
 
 ngOnInit(){
 this.recipeService.getAllRecipes().
  then((recipes)=>{
    this.recipes = recipes;
    this.recipes_loaded = true;
  })
  .catch((error)=>{
    this.load_error = true;
    const body = JSON.parse(error._body);
    this.error_text = body.message;
  });
 }

public addRecipeClicked(){
  console.log(JSON.stringify(this.recipe_in_progress,null,2));
  this.recipes.unshift(this.recipe_in_progress);
  this.recipe_in_progress = Recipe.createBlank();
}

userClickedOnRecipe(recipe_id){
  this.router.navigateByUrl('/recipes/'+ recipe_id)
}

AddNewRecipePressed(){
  this.router.navigateByUrl('/editnewrecipe')
}


}
