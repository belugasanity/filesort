import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/file.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  files: any[] = [];
  filteredFiles: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  filesPerPage: number = 10;
  displayedColumns: string[] = ['name', 'size', 'createdAt', 'link'];

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getFiles().subscribe(
      files => {
        this.files = files;
        this.filteredFiles = this.files.slice(0, this.filesPerPage);
      },
      error => {
        console.error('Error fetching files', error);
      }
    );
  }

  applyFilter() {
    const filtered = this.files.filter(file =>
      file.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredFiles = filtered.slice(0, this.filesPerPage);
  }

  changePage(event: any) {
    const startIndex = event.pageIndex * this.filesPerPage;
    const endIndex = startIndex + this.filesPerPage;
    this.filteredFiles = this.files.slice(startIndex, endIndex);
  }

}
