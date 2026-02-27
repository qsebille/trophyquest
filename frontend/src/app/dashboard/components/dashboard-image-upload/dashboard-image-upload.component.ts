import {Component, computed, input} from '@angular/core';
import {ApexChart, ChartComponent} from "ng-apexcharts";
import {ImageUploadStats} from "../../../core/api/dtos/images/image-upload-stats";

@Component({
    selector: 'tq-dashboard-image-upload',
    imports: [
        ChartComponent,
    ],
    templateUrl: './dashboard-image-upload.component.html',
    styleUrl: './dashboard-image-upload.component.scss',
})
export class DashboardImageUploadComponent {
    readonly psnUploads = input.required<ImageUploadStats>();
    readonly igdbUploads = input.required<ImageUploadStats>();

    readonly psnSeries = computed<ApexAxisChartSeries>(() => [{
        name: 'Count',
        data: [this.psnUploads().uploaded, this.psnUploads().pending]
    }]);
    readonly igdbSeries = computed<ApexAxisChartSeries>(() => [{
        name: 'Count',
        data: [this.igdbUploads().uploaded, this.igdbUploads().pending]
    }]);


    readonly psnTitle: ApexTitleSubtitle = {text: 'PSN Images', align: 'left'};
    readonly igdbTitle: ApexTitleSubtitle = {text: 'IGDB Images', align: 'left'};
    readonly chart: ApexChart = {
        height: 350,
        type: "bar"
    }
    readonly xaxis: ApexXAxis = {
        categories: ['Uploaded', 'Pending']
    }
    readonly colors = ['#1f7a4d', '#c43c3c']
    readonly plotOptions: ApexPlotOptions = {
        bar: {
            distributed: true,
            horizontal: false
        }
    }
    readonly dataLabels: ApexDataLabels = {
        enabled: true,
    }
    readonly responsive: ApexResponsive[] = [{
        breakpoint: 480,
        options: {
            legend: {
                position: "bottom"
            }
        }
    }]
}
