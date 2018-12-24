import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
//import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ReverseListPipe } from './pipes/reverse-list.pipe';
import { PlayerRouteComponent } from './player-route.component';
import { FileUploadComponent } from './components/file-upload-list/file-upload-list.component';
import { PlayerUiComponent } from './components/player-ui/player-ui.component';
import { UploadItemComponent } from './components/file-upload-item/file-upload-item.component'

@NgModule({
  declarations: [
    DropZoneDirective,
    FileSizePipe,
    ReverseListPipe,
    PlayerRouteComponent,
    FileUploadComponent,
    PlayerUiComponent,
    UploadItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [
    PlayerRouteComponent
  ],
  bootstrap: [PlayerRouteComponent]
})
export class PlayerRouteModule { }
