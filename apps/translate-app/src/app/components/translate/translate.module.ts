import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputCopyModule, TuiSelectModule, TuiTextAreaModule} from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core'; 
import { TranslateComponent } from 'apps/translate-app/src/app/components/translate/translate.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TranslateComponent],
  exports: [TranslateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  providers: []
})
export class TranslateModule { }
