/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SdsStepper } from '@gsa-sam/sam-formly';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sam-layouts-stepper',
  templateUrl: './stepper.component.html',
  providers: [{ provide: SdsStepper, useExisting: SLStepperComponent }],
  styles: [
    '.justify-content-space-between {justify-content: space-between; }',
    '.usa-sidenav__item--disabled {cursor: default; hover:none; opacity: 60%; pointer-events: none}',
    '.usa-step-indicator__header { border: 1px solid red; }',
  ],
})
export class SLStepperComponent extends SdsStepper implements AfterContentInit {
  @Input() hideSideNav = true;
  @Input() expirationDate: string;
  @Input() versions: [];
  @Input() discardDraftButtonDisabled: boolean;
  @Input() submitButtonDisabled: boolean;
  @Input() showActions = false;
  @Output() versionChange = new EventEmitter<any>();
  @Output() discardDraft = new EventEmitter<any>();
  @Output() submitSteps = new EventEmitter<any>();

  /**
   * @ignore
   */
  stepLabels: any = [];
  /**
   * @ignore
   */
  currentStepIndex = 0;

  /**
   * @ignore
   */
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this.stepLabels = this.stepTemplates.map((stepTemplate, index) => {
      if (stepTemplate.id === this.currentStepId) {
        this.currentStepIndex = index;
      }
      return { ...stepTemplate, label: stepTemplate.text };
    });
  }

  selectChange($event) {
    this.versionChange.emit($event.target.value);
  }

  discardDraftButtonClick($event) {
    this.discardDraft.emit($event);
  }

  submitButtonClick($event) {
    this.submitSteps.emit($event);
  }
}