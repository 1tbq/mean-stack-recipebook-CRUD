import { Recipe } from '../model/recipe';
import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appHighlightNewRecipe]' })
export class HighlightNewRecipeDirective implements OnInit {

    @Input('appHighlightNewRecipe')
    recipe_to_test: Recipe;
    
    @Input('highlightnewrecipe_color') highlight_color:string;

    constructor(private el: ElementRef, private renderer: Renderer) 
    {
        this.highlight_color ='green';
     }

    ngOnInit(): void {
        console.log(this.recipe_to_test);
         const date_added = new Date(this.recipe_to_test.date_added).getTime();
        //if the recipe is less the 4 days old
        if (new Date().getTime() - 4 * 86400000 < date_added) {
            this.renderer.setElementStyle(this.el.nativeElement, 'background-color', this.highlight_color);
        }
    }
}