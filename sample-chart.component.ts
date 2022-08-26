import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'prism-sample-chart',
  templateUrl: './sample-chart.component.html',
  styleUrls: ['./sample-chart.component.scss']
})
export class SampleChartComponent implements OnInit {

  ecgPoints = [5, 6, 5, 6, 3, 30, -10, 0, 2, 3, 14, 6, 5, 5, 5, 5, 5];
  ecg = {
    data: this.ecgPoints,
    label: 'Are you alive or are you dead?'
  }
  baseecg = [5, 6, 5, 6, 3, 30, -10, 0, 2, 3, 14, 6, 5, 5, 5, 5, 5];
  ecgLabels = '.'.repeat(this.baseecg.length * 3).split('');
  pointDelay = 100;
  ecgDelay = 0;

  ecgOptions: any = {
    responsive: true,
    resizeDelay: 1000,
    animations: {
      tension: {
        duration: 5000,
        easing: 'ease-out',
        from: 1,
        to: 0
      }
    },
  }

  ecgColors = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: 'gray',
    }
  ]

  ecgCount = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => { this.addecg(this) }, 1000);
  }

  addecg(component: SampleChartComponent) {
    component.baseecg.forEach((val, idx) => {
      setTimeout(() => {
        component.addPoint(component, (component.ecgCount > 20 ? 0 : val));
      }, (idx * component.pointDelay));

    });

    setTimeout(() => {
      if (component.ecgCount < 25) {
        component.addecg(component);
        component.ecgCount++;
      }
      else {
        component.ecgPoints = [];
        component.ecgLabels = '.'.repeat(this.baseecg.length * 3).split('');
        ;
        component.ecgCount = 1;
        component.addecg(component);

      }
    }, (component.baseecg.length * component.pointDelay + component.ecgDelay))


  }

  addPoint(component, val) {
    component.ecgPoints.push(val);
    // component.ecgLabels.push('.');
    if (component.ecgPoints.length > (3 * component.baseecg.length)) {
      setTimeout(() => {
        component.ecgPoints.splice(0, 1);
        // component.ecgLabels.splice(0, 1);
      }, component.pointDelay);
    }

  }

  animationProgress(animation) {
    console.log(`animation step #${animation.currentStep} of ${animation.numSteps}`);
  }

  animationComplete(animation) {
    console.log('animation complete.');
  }
}
