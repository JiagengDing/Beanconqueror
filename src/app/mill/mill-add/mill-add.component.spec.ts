import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MillAddComponent} from './mill-add.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {CommonModule} from '@angular/common';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';
import {KeysPipe} from '../../../pipes/keys';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {NavParamsMock} from '../../../classes/mock/NavParamsMock';
import {File} from '@ionic-native/file/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
;
import {Router} from '@angular/router';

describe('MillAddComponent', () => {
  let component: MillAddComponent;
  let fixture: ComponentFixture<MillAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, IonicStorageModule.forRoot(), CommonModule, IonicModule],
      declarations: [MillAddComponent, KeysPipe],
      providers: [
        {provide: InAppBrowser},
        {provide: ModalController},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: Storage},
        {provide: File},
        {provide: Camera},
        {provide: ImagePicker},
        {provide: AndroidPermissions},

        {provide: Router}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
