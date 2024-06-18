import { Component } from '@angular/core';
import { FileService } from '../core/file.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private fileService: FileService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    this.fileService.uploadFile(this.selectedFile).subscribe(
      () => {
        alert('File uploaded successfully!');
      },
      error => {
        console.error('Upload failed', error);
        alert('Upload failed. Please try again.');
      }
    );
  }
}
