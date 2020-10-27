import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;
  recipeForm: FormGroup;

  cover_photo_for_viewing = '../../../assets/images/dummy.png'
  instruction_photos_for_viewing:string[];
cover_photo_for_upload:File;
instruction_photos_for_upload:File[];

  constructor(private recipe_service: RecipeService, private router: Router) {
    this.recipe_in_progress = Recipe.createBlank();
    this.buildFormGroup();
    this.instruction_photos_for_viewing=[];
    this.instruction_photos_for_upload=[];
  }

  ngOnInit() {
  }

  buildFormGroup(): void {
    const fg = {
      'title': new FormControl(this.recipe_in_progress.title, [Validators.required, noTunaCasseroleValidator]),
      'description': new FormControl(this.recipe_in_progress.description, [Validators.required]),
      'prepration_time': new FormControl(this.recipe_in_progress.prepration_time, [Validators.required, Validators.min(11)]),
      'feeds_this_many': new FormControl(this.recipe_in_progress.feeds_this_many,
        [Validators.required, Validators.min(11), Validators.max(100)]),
    };

    for (let i = 0; i < this.recipe_in_progress.ingredients.length; i++) {
      fg['ingredient_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].ingredient, [Validators.required]);
      fg['measure_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].ingredient, [Validators.required]);
    }
    for (let i = 0; i < this.recipe_in_progress.instructions.length; i++) {
      fg['instruction_' + i] = new FormControl(this.recipe_in_progress.instructions[i].instruction, [Validators.required]);
    }

    this.recipeForm = new FormGroup(fg)
  }

  AddIngredientsPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [{ ingredient: null, measure: null }]
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null })

    }
    this.buildFormGroup();
  }

  removeIngredientAtIndex(index) {
    this.recipe_in_progress.ingredients.splice(index, 1);
    this.buildFormGroup();
  }



  AddInstructionsPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [{ instruction: null, photo: null }];
      this.instruction_photos_for_viewing =[];
      this.instruction_photos_for_upload=[];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
      this.instruction_photos_for_viewing.push(null);
      this.instruction_photos_for_upload.push(null);
    }
    this.buildFormGroup();
  }
  removeInstructionAtIndex(index) {
    this.recipe_in_progress.instructions.splice(index, 1)
    this.instruction_photos_for_viewing.splice(index, 1);
    this.instruction_photos_for_upload.splice(index,1);
    this.buildFormGroup();
  }

  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress,{
      cover_photo:this.cover_photo_for_upload,
      instruction_photos:this.instruction_photos_for_upload
    })
      .then((recipe) => {
        this.router.navigate(['recipes', recipe.id])
      });
  }

  readUrlForCoverPhoto(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.cover_photo_for_viewing = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.cover_photo_for_upload = event.target.files[0];
    }
  }
  readInstructionUrl(i:number,event):void{
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.instruction_photos_for_viewing[i] = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.instruction_photos_for_upload[i]= event.target.files[0];
    }
  }


}

export function noTunaCasseroleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value.toLowerCase().indexOf('tuna') !== -1
      && control.value.toLowerCase().indexOf('casserol') !== -1) {
      return { 'noTunaCasserol': { value: control.value } };
    }
    return null;
  };
}
