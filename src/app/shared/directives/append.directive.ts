import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Student } from '../../_interfaces/student.model';

@Directive({
  selector: '[appAppend]'
})
export class AppendDirective implements OnChanges {
  @Input('appAppend') studentParam: Student;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.studentParam.currentValue){
      const accNum = changes.studentParam.currentValue.accounts.length;
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(` (${accNum}) accounts`);

      this.renderer.appendChild(span, text);
      this.renderer.appendChild(this.element.nativeElement, span);
    }
  }
}