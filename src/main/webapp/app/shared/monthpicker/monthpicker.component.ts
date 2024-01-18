/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
// import 'moment/locale/de';

@Component({
  selector: 'monthpicker',
  templateUrl: './monthpicker.component.html',
})
export class MonthpickerComponent implements OnInit {
  @Input()
  locale!: string;
  @Input()
  year!: number;
  @Input()
  month!: number;

  @Input() enabledMonths: Array<number> = [];
  @Input() disabledMonths: Array<number> = [];

  @Input() enabledYears: Array<number> = [];
  @Input() disabledYears: Array<number> = [];

  @Input()
  multiple!: boolean; // TODO

  @Output() change = new EventEmitter<{ monthIndex: number; year: number }>();

  model!: MonthPickerModel;

  ngOnInit(): void {
    if (this.locale) {
      moment.locale(this.locale);
    } else {
      moment.locale('de');
    }

    this.model = new MonthPickerModel();

    if (this.year) {
      this.model.selectedYearMoment = moment().year(this.year);
      this.model.updateYearText();
    }

    if (this.month) {
      this.model.selectedMonthIndex = this.month;
      this.model.selectedMonthMoment = moment().month(this.month);
      if (this.year) {
        this.model.selectedMonthYear = this.year;
      }
    }

    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  decrement(): void {
    this.model.decrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  increment(): void {
    this.model.incrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  selectMonth(index: number): void {
    this.model.selectMonth(index);
    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  isSelectedMonth(monthIndex: number): boolean {
    return this.model.selectedMonthIndex === monthIndex && this.model.selectedMonthYear == this.model.selectedYearMoment.year();
  }

  onChange(monthIndex: number, year: number): void {
    this.change.emit({ monthIndex, year });
  }

  isDisabled(index: number): boolean {
    let disabled = false;
    if (this.enabledMonths && this.enabledMonths.length > 0) {
      disabled = this.enabledMonths.indexOf(index) < 0;
    }
    if (this.disabledMonths && this.disabledMonths.length > 0) {
      disabled = this.disabledMonths.indexOf(index) >= 0;
    }
    return disabled;
  }

  isShowYears!: boolean;
  years: Array<number> = [];
  toggleShowYears(): void {
    this.isShowYears = !this.isShowYears;
    this.renderYears();
  }

  renderYears(): void {
    this.years = [];
    for (let i = 5; i > 0; i--) {
      this.years.push(this.model.selectedYearMoment.year() - i);
    }
    for (let i = 0; i <= 6; i++) {
      this.years.push(this.model.selectedYearMoment.year() + i);
    }
  }

  selectYear(year: number): void {
    this.isShowYears = false;
    this.model.selectedYearMoment = moment().year(year);
    this.model.updateYearText(); // in set get aendern
  }

  isSelectedYear(year: number): boolean {
    return this.model.selectedYearMoment.year() === year;
  }

  isDisabledYear(year: number): boolean {
    // console.warn(year)
    let disabled = false;
    if (this.enabledYears && this.enabledYears.length > 0) {
      disabled = this.enabledYears.findIndex(y => y === year) < 0;
    }
    if (this.disabledYears && this.disabledYears.length > 0) {
      disabled = this.disabledYears.findIndex(y => y === year) >= 0;
    }
    return disabled;
  }
}

export class MonthPickerModel {
  constructor() {
    this.selectedYearMoment = moment();
    this.updateYearText();

    this.selectedMonthMoment = moment();

    this.months = moment.months();

    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
  }

  selectedYearMoment: moment.Moment;
  selectedYearText!: string;

  selectedMonthMoment: moment.Moment;
  selectedMonthIndex: number;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  selectedMonthYear: number;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  months: Array<string> = [];

  updateYearText(): void {
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
  }

  selectMonth(index: number): void {
    this.selectedMonthMoment = moment().month(index);
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
  }

  incrementYear(): void {
    this.selectedYearMoment = this.selectedYearMoment.add(1, 'year');
    this.updateYearText();
  }

  decrementYear(): void {
    this.selectedYearMoment = this.selectedYearMoment.subtract(1, 'year');
    this.updateYearText();
  }
}
