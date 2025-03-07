import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BeansAddComponent} from './beans-add.component';
import {TranslateModule} from '@ngx-translate/core';

import {KeysPipe} from '../../../pipes/keys';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {File} from '@ionic-native/file/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
;
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavParamsMock} from '../../../classes/mock/NavParamsMock';


describe('BeansAddComponent', () => {
  let component: BeansAddComponent;
  let fixture: ComponentFixture<BeansAddComponent>;
  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, IonicStorageModule.forRoot(), CommonModule, IonicModule],
      declarations: [BeansAddComponent, KeysPipe],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeansAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
