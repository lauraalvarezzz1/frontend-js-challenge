import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trend-sidebar',
  templateUrl: './trend-sidebar.component.html',
  styleUrls: ['./trend-sidebar.component.scss'],
})
export class TrendSidebarComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() width: number = 0;
  @Input() isToUpdate: boolean = false;
  @Input() data = { url: '', provider: '', title: '', body: [''] };
  postForm: FormGroup;
  protected trend$ = this.store.select(selectSelectedTrend);

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      url: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      let body = this.data.body.join('\n\n');
      this.postForm.patchValue({
        url: this.data.url,
        autor: this.data.provider,
        titulo: this.data.title,
        contenido: body
      })
    }
  }

  savePost() {
    if (this.postForm.valid) {
      let body = {

      }
    }
  }

  cancel() {
    this.close.emit();
  }
}
