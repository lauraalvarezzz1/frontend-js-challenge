import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sendTrend, updateTrend } from '../store/actions/trends-api.actions';
import { Trend } from '../models/trend.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend-sidebar',
  templateUrl: './trend-sidebar.component.html',
  styleUrls: ['./trend-sidebar.component.scss'],
})
export class TrendSidebarComponent implements OnInit, OnChanges {
  @Output() close = new EventEmitter<any>();
  @Input() width: number = 0;
  @Input() isToUpdate: boolean = false;
  @Input() data!: Trend;
  postForm: FormGroup;
  protected trend$ = this.store.select(selectSelectedTrend);
  hasChange: boolean = false;
  bodyToChange: any = {};

  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    this.postForm = this.formBuilder.group({
      url: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.patchFormValue();
  }

  onFormValueChange() {
    let initialValue = this.postForm.value;
    this.bodyToChange = {};
    this.postForm.valueChanges.subscribe(() => {
      this.hasChange = Object.keys(initialValue).some(key => this.postForm.value[key] != initialValue[key]);
      Object.keys(initialValue).map(key => {
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
        image: this.postForm.get('image')?.value
      }

      if (this.data) {
        this.store.dispatch(updateTrend({ id: this.data.id!, trend: this.bodyToChange }));
      } else {
        this.postForm.reset();
        this.router.navigate(['/trends']);
        this.store.dispatch(sendTrend({ trend: body }));
      }
      this.closeModal();
    }
  }

  closeModal(data?: {}) {
    this.close.emit(data);
  }

  patchFormValue() {
    if (this.data) {
      let body = this.data.body.join('\n\n');
      this.postForm.patchValue({
        url: this.data.url,
        provider: this.data.provider,
        image: this.data.image,
        title: this.data.title,
        body: body
      })
      this.onFormValueChange();
    }
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.patchFormValue();
    }
  }
}
