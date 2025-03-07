import {Component, Input, OnInit} from '@angular/core';
import {PreparationTool} from '../../../classes/preparation/preparationTool';
import {ModalController, NavParams} from '@ionic/angular';
import {UIHelper} from '../../../services/uiHelper';
import {UIToast} from '../../../services/uiToast';
import {UIAnalytics} from '../../../services/uiAnalytics';
import PREPARATION_TRACKING from '../../../data/tracking/preparationTracking';

import {UIPreparationStorage} from '../../../services/uiPreparationStorage';
import {Preparation} from '../../../classes/preparation/preparation';
import {Brew} from '../../../classes/brew/brew';
import {UIAlert} from '../../../services/uiAlert';
import {UIBrewStorage} from '../../../services/uiBrewStorage';
import {UIPreparationHelper} from '../../../services/uiPreparationHelper';
import {Settings} from '../../../classes/settings/settings';
import {UISettingsStorage} from '../../../services/uiSettingsStorage';

@Component({
  selector: 'app-preparation-edit-tool',
  templateUrl: './preparation-edit-tool.component.html',
  styleUrls: ['./preparation-edit-tool.component.scss'],
})
export class PreparationEditToolComponent implements OnInit {



  public static COMPONENT_ID: string = 'preparation-edit-tool';
  public data: PreparationTool = new PreparationTool();

  @Input() private preparationTool: PreparationTool;
  @Input() private preparation: Preparation;

  constructor (private readonly navParams: NavParams,
               private  readonly modalController: ModalController,
               private readonly uiHelper: UIHelper,
               private readonly uiToast: UIToast,
               private readonly uiAnalytics: UIAnalytics,
               private readonly uiPreparationStorage: UIPreparationStorage,
               private readonly uiPreparationHelper: UIPreparationHelper,
               private readonly uiAlert: UIAlert,
               private readonly uiBrewStorage: UIBrewStorage,
               private readonly uiSettingsStorage: UISettingsStorage) {

  }

  public ionViewWillEnter(): void {
    this.uiAnalytics.trackEvent(PREPARATION_TRACKING.TITLE, PREPARATION_TRACKING.ACTIONS.EDIT_TOOL);
    this.data = this.uiHelper.cloneData(this.preparationTool);
  }

  public async deleteTool() {
    const relatedBrews: Array<Brew> =  this.uiPreparationHelper.getAllBrewsForThisPreparation(this.preparation.config.uuid).filter((e) => e.method_of_preparation_tools.includes(this.data.config.uuid));
    await this.uiAlert.showConfirm('DELETE_PREPARATION_TOOL_QUESTION', 'SURE_QUESTION', true).then(async () => {
        this.uiAnalytics.trackEvent(PREPARATION_TRACKING.TITLE, PREPARATION_TRACKING.ACTIONS.TOOL_DELETED);
        if (relatedBrews.length > 0) {
          for (const brew of relatedBrews) {
            for(let i = 0; i <  brew.method_of_preparation_tools.length; i++){
              if (brew.method_of_preparation_tools[i] === this.data.config.uuid) {
                brew.method_of_preparation_tools.splice(i, 1);
                break;
              }
              await this.uiBrewStorage.update(brew);

            }


            // await  this.uiBrewStorage.removeByUUID(brew.config.uuid);
          }
        }

        this.preparation.deleteTool(this.data);
        await this.uiPreparationStorage.update(this.preparation);
        const settings: Settings = this.uiSettingsStorage.getSettings();
        settings.resetFilter();
        await this.uiSettingsStorage.saveSettings(settings);

        this.dismiss();
      },
      () => {
        // No
      });

  }

  public async archiveTool() {
    this.data.archived = !this.data.archived;
    await this._editTool();


  }

  public async editTool() {
    if (this.data.name.trim() !== '') {
      await this._editTool();
    }
  }

  public async _editTool() {
    if (this.preparation.updateTool(this.data)) {
      await this.uiPreparationStorage.update(this.preparation);
      this.uiToast.showInfoToast('TOAST_PREPARATION_TOOL_EDITED_SUCCESSFULLY');
      this.uiAnalytics.trackEvent(PREPARATION_TRACKING.TITLE, PREPARATION_TRACKING.ACTIONS.EDIT_TOOL_FINISH);
      this.dismiss();
    }


  }



  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    },undefined,PreparationEditToolComponent.COMPONENT_ID);
  }
  public ngOnInit() {}


}
