import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sendTrend, updateTrend } from '../store/actions/trends-api.actions';
import { Trend } from '../models/trend.model';

@Component({
  selector: 'app-trend-sidebar',
  templateUrl: './trend-sidebar.component.html',
  styleUrls: ['./trend-sidebar.component.scss'],
})
export class TrendSidebarComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() width: number = 0;
  @Input() isToUpdate: boolean = false;
  @Input() data!: Trend;
  postForm: FormGroup;
  protected trend$ = this.store.select(selectSelectedTrend);
  hasChange: boolean = false;
  bodyToChange: any = {};

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      url: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      let body = this.data.body.join('\n\n');
      this.postForm.patchValue({
        url: this.data.url,
        provider: this.data.provider,
        title: this.data.title,
        body: body
      })
    }
    this.onFormValueChange();
  }

  onFormValueChange() {
    const initialValue = this.postForm.value;
    this.bodyToChange = {};
    this.postForm.valueChanges.subscribe(() => {
      this.hasChange = Object.keys(initialValue).some(key => this.postForm.value[key] != initialValue[key]);
      Object.keys(initialValue).some(key => {
        if (this.postForm.value[key] != initialValue[key]) {
          this.bodyToChange[key] = this.postForm.value[key];
        }
      })
    });
  }

  savePost() {
    if (this.postForm.valid) {
      let body: Trend = {
        url: this.postForm.get('url')?.value,
        provider: this.postForm.get('provider')?.value,
        title: this.postForm.get('title')?.value,
        body: this.postForm.get('body')?.value,
        image: 'https://emtstatic.com/2020/02/iStock-170222445.jpg'
      }

      if (this.data) {
        this.store.dispatch(updateTrend({ id: this.data.id!, trend: this.bodyToChange }));
      } else {
        this.store.dispatch(sendTrend({ trend: body }));
      }
      this.closeModal();
    }
  }

  closeModal(data?: {}) {
    this.close.emit(data);
  }
}
