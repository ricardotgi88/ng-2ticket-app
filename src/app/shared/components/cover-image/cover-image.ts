import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.html',
  styleUrl: './cover-image.css',
})
export class CoverImage {
  @Input() coverSrc: string | undefined = '';
  @Input() altName = '';
  @Input() isThumbnail = false;

  notFoundSrc = 'assets/img/img-placeholder.svg';

  get coverSrcOrPlaceholder(): string {
    return this.coverSrc || this.notFoundSrc;
  }
}
