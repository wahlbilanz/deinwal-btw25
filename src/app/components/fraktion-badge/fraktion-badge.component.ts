import { Component, input } from '@angular/core';
import { AlphanumPipe } from '../../pipes/alphanum.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'wal-fraktion-badge',
  imports: [AlphanumPipe, LowerCasePipe],
  templateUrl: './fraktion-badge.component.html',
  styleUrl: './fraktion-badge.component.css',
})
export class FraktionBadgeComponent {
  public fraktion = input.required<string>();
}
