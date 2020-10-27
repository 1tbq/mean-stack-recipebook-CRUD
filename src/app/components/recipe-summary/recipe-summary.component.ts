import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../model/recipe';
//import { HighlightNewRecipeDirective } from '../../misc/highlightnewrecipe.directive';

@Component({
  selector: 'recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent{

 @Input()recipe:Recipe;
 @Output() userClick: EventEmitter<number> = new EventEmitter();



 userClicked(){
    this.userClick.emit(this.recipe.id);
 }

}
