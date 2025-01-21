import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { PartyDecisionThreshold } from '../../consts/threshold.const';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { MemoizePipe } from '../../pipes/memoize.pipe';
import { NgClass } from '@angular/common';
import { AntwortenService } from '../../state/antworten.service';

@Component({
  selector: 'wal-antwort-icon',
  imports: [AngularLineawesomeModule, MemoizePipe, NgClass],
  templateUrl: './antwort-icon.component.html',
  styleUrl: './antwort-icon.component.css',
})
export class AntwortIconComponent {
  private antwortService = inject(AntwortenService);

  @ViewChild('antwortIcon')
  public divElement: ElementRef | undefined;

  public antwort = input.required<number | undefined | null>();
  public abstimmungs_id = input<string>();
  public mitText = input<boolean>(false);
  public aenderbar = input<boolean>(false);

  public clicked = output<void>();

  public threshold = PartyDecisionThreshold;
  public showDropDown = false;

  public toText(i: number | undefined | null): string {
    if (i === null || i === undefined) {
      return '???';
    }
    if (i > PartyDecisionThreshold) {
      return 'Ja';
    }
    if (i < -PartyDecisionThreshold) {
      return 'Nein';
    }
    return 'Enthalten';
  }

  public click(): void {
    if (this.aenderbar()) {
      this.showDropDown = !this.showDropDown;
    }
    this.clicked.emit();
  }

  public aktualisiereAntwort(number: number): void {
    const abstimmungs_id = this.abstimmungs_id();
    if (!abstimmungs_id?.length) {
      return;
    }
    this.antwortService.updateAntwort(abstimmungs_id, number);
  }

  @HostListener('document:mousedown', ['$event'])
  public onGlobalClick(event: MouseEvent): void {
    if (!this.showDropDown || !this.divElement || !this.aenderbar() || !event?.target) {
      return;
    }
    // check if the click targeted this element
    if (!this.divElement.nativeElement.contains(event.target)) {
      // otherwise close the "dropdown"
      this.showDropDown = false;
    }
  }
}
