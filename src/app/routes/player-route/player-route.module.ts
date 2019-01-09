import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { PlayerService } from './services/player.service';
import { UploadService } from './services/upload.service';
import { PlayerRouteComponent } from './player-route.component';
import { FileUploadComponent } from './components/file-upload-list/file-upload-container.component';
import { PlayerUiComponent } from './components/player-ui/player-ui.component';
import { UploadItemComponent } from './components/file-upload-item/file-upload-item.component';
import { TracksListComponent } from './components/tracks-list/tracks-list.component';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { TimestampDatePipe } from './pipes/timestamp-date.pipe';

@NgModule({
  declarations: [
    DropZoneDirective,
    FileSizePipe,
    TimeFormatPipe,
    PlayerRouteComponent,
    FileUploadComponent,
    PlayerUiComponent,
    UploadItemComponent,
    TracksListComponent,
    RoundNumberPipe,
    TrackItemComponent,
    TimestampDatePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [
    PlayerRouteComponent
  ],
  providers: [
    PlayerService,
    UploadService
  ],
  bootstrap: [PlayerRouteComponent]
})
export class PlayerRouteModule { }
