import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { RecipeService } from './services/recipe.service';
import { SwearingPipe } from './misc/swearing.pipe';
import { HighlightNewRecipeDirective } from './misc/highlightnewrecipe.directive';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    RecipeDetailsComponent,
    EditNewRecipeComponent,
    SwearingPipe,
    HighlightNewRecipeDirective
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'editnewrecipe',
        component: EditNewRecipeComponent
      },
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
      },
      {
        path: 'recipes',
        component: RecipeListComponent
      },
      {
        path: 'recipes/:recipe_id',
        component: RecipeDetailsComponent
      }


    ]),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
