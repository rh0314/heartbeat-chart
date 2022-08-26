import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartOptions } from 'chart.js';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-static-heartbeat',
  templateUrl: './static-heartbeat.component.html',
  styleUrls: ['./static-heartbeat.component.scss']
})
export class StaticHeartbeatComponent implements OnInit, AfterViewInit {

  ecgPoints = [5, 6, 5, 6, 3, 30, -10, 0, 2, 3, 14, 6, 5, 5, 5, 5, 5];
  ecg = {
    data: this.ecgPoints,
    label: 'Are you alive or are you dead?'
  }
  baseecg = [5, 6, 5, 6, 3, 30, -10, 0, 2, 3, 14, 6, 5, 5, 5, 5, 5];
  ecgLabels = '.'.repeat(this.baseecg.length).split('');
  pointDelay = 100;
  ecgDelay = 0;

  ecgOptions: any = {
    responsive: true,
    resizeDelay: 1000,
    animations: {
      tension: {
        duration: 5000,
        easing: 'ease-out',
        from: 100,
        to: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: -10,
          max: 30
        }
      }]
    }
  }

  ecgColors = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#DDDDDD',
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: 'gray',
    }
  ]

  ecgCount = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    Chart.pluginService.register({
      id: 'dataLabelsPlugin',
      afterDatasetDraw: (chart, ease) => {
        let ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        let datasets = chart.data.datasets;

        chart.data.datasets.forEach((ds, idx) => {
          const meta = chart.getDatasetMeta(idx);
          let labelData = chart.data.datasets[idx].data;
          const fontSize = 40

          if (!meta.hidden) {
            meta.data.forEach((segment, iidx) => {
              let model = segment._model;  //figure out a beter way to get this 
              const labelBelowPoint = model.y < (fontSize + 10);
              const labelBeforePoint = model.x > width - (fontSize + 10);
              let x = model.x + (labelBeforePoint ? -15 : 5);
              let y = model.y + (labelBelowPoint ? 25 : -25);

              ctx.restore();

              ctx.textBaseline = 'top';
              ctx.font = 'bold 40px Arial'
              ctx.fillStyle = '#FFFFFF';

              let text = labelData[iidx].toString();
              ctx.fillText(text, x, y);
              ctx.save();


            })
          }
        })
      }
    })
  }

  configureChart() {
    this.chart.chart.data.datasets[0].datalabels = { align: 'start', anchor: 'start', display: true };

  }

  setChartOptions() {
    const options: ChartOptions = {
      plugins: {
        datalabels: {
          display: true,
          font: {
            size: 24,
            weight: 'bold',
          },
          color: '#FFRFFF',
          borderRadius: 4,
          padding: 6,
        }
      }
    }

    this.chart.options = options;
    this.chart.update();
  }

  animationProgress(animation) {
    console.log(`animation step #${animation.currentStep} of ${animation.numSteps}`);
  }

  animationComplete(animation) {
    console.log('animation complete.');
  }

}
