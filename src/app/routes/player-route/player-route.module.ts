import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
//import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { DropZoneDirective } from './directives/drop-zone.directive';
import { PlayerRouteComponent } from './player-route.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSizePipe } from './pipes/file-size.pipe'

@NgModule({
  declarations: [
    PlayerRouteComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
  ],
  imports: [
    CommonModule,
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
