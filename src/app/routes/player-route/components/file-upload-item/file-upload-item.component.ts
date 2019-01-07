import { Component, OnInit, Input } from '@angular/core';
import { UploadService, UploadItem } from '../../services/upload.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'file-upload-item',
  templateUrl: './file-upload-item.component.html',
  styleUrls: ['./file-upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {

  @Input() private uploadItem: UploadItem;
  private uploadForm: FormGroup;
  private isUploadingStarted = false;
  private isUploaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      track: ['', Validators.required],
      artist: ['', Validators.required]
    });
  }

  startUpload() {
    this.isUploadingStarted = true;
    const track = this.uploadForm.value.track;
    const artist = this.uploadForm.value.artist;

    const previousValue = this.uploadItem;
    const uploadData = this.uploadService.uploadAudioFile(track, artist, this.uploadItem.file);
    this.uploadItem = {
      ...previousValue,
      track,
      artist,
      ...uploadData
    };
    this.uploadItem.isUploaded.subscribe(data => this.isUploaded = data);
  }
}
