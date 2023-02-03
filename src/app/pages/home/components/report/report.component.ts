import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: Date;
  homeworkRating: number;
  revisionRating: number;
  name: string;
  suwar: any[];
  revision: any[];
  note: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    console.log(this.data);
  }
}
