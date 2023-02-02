import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { getBySurahName, QURAN } from 'src/app/data/Quran';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  QURAN: any[] = QURAN;
  selectFrom: any;
  startStr: any = { start: '', end: '' };
  endStr: string = '';
  surahName: string = '';
  formGroup = this.fb.group({
    name: [''],
    date: [new Date()],
    suwar: this.fb.array([this.surahContent()]),
    revision: this.fb.array([]),
    note: [''],
  });
  get suwar() {
    return this.formGroup.get('suwar') as FormArray;
  }
  get revision() {
    return this.formGroup.get('revision') as FormArray;
  }
  constructor(private fb: FormBuilder) {}

  surahContent() {
    return this.fb.group({
      name: [''],
      count: [0],
      start: [''],
      end: [''],
      startStr: [''],
      endStr: [''],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
  // onChangeSurahHandler(e: any) {
  //   console.log(e);
  // }
  onChangeSurahHandler(e: any, formGroup: AbstractControl) {
    const value = e.value;
    this.surahName = value;

    const filteredValue = this.QURAN.find((qr) => qr.name === value);

    const endCountOfEverySurah = Array(
      filteredValue.array[filteredValue.array.length - 1].id
    );

    formGroup?.get('count')?.patchValue(endCountOfEverySurah);
  }

  onChangeFromSelectHandler(
    e: MatSelectChange,
    propertyName: string,
    formGroup: AbstractControl
  ) {
    console.log(formGroup);

    const surahName = formGroup?.get('name')?.value;
    const surahNumber = e.value;
    const surahArr = getBySurahName(surahName);
    const startStr = surahArr?.array?.find(
      (item) => item?.id === surahNumber
    )?.ar;
    formGroup?.get(propertyName)?.patchValue(startStr);
  }

  addSurah(revision?: string) {
    if (revision) {
      this.revision.push(this.surahContent());
    } else {
      this.suwar.push(this.surahContent());
    }
  }
}
// name - date - rate1 -rate2 - dropdown(list) -
