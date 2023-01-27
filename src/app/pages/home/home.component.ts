import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QURAN } from 'src/app/data/Quran';

type FormGroupType = {
  name: string;
  date: string;
  surahName: string;
  start: any[];
  end: any[];
  count: any[];
  note: string;
};
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
  constructor(private fb: FormBuilder) {}

  formGroup = this.fb.group<FormGroupType>({
    name: '',
    date: '',
    surahName: '',
    start: [],
    end: [],
    count: [],
    note: '',
  });

  onSubmit() {
    console.log(this.formGroup.value);
  }

  onChangeSurahHandler(e: any) {
    const value = e.value;
    this.surahName = value;
    this.formGroup.get('start')?.reset();
    this.formGroup.get('end')?.reset();

    const filteredValue = this.QURAN.find((qr) => qr.id === value);

    const endCountOfEverySurah = Array(
      filteredValue.array[filteredValue.array.length - 1].id
    );

    this.formGroup.get('count')?.patchValue(endCountOfEverySurah);
  }
  onChangeFromSelectHandler(felidName: string) {
    const filteredValue = this.QURAN.find((qr) => qr.id === this.surahName);
    this.startStr[felidName] =
      filteredValue.array[this.formGroup.get(felidName)?.value].ar;
  }
}
// name - date - rate1 -rate2 - dropdown(list) -
