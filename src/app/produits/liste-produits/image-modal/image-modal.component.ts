import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { imageBase64 } from 'src/assets/imageEnBase64';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  convertBase64ToImages(image: any): SafeUrl {
    let base64 = "data:image/png;base64, " + imageBase64;
    if (image && image.picbyte) {
      const imageUrl = 'data:' + image.type + ';base64,' + image.picbyte;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(base64);
    }
  }
}
