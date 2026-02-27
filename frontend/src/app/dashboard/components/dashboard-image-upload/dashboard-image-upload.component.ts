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
    readonly gameImageUploads = input.required<ImageUploadStats>();
    readonly igdbImageUploads = input.required<ImageUploadStats>();
    readonly playerAvatarUploads = input.required<ImageUploadStats>();
    readonly trophyIconUploads = input.required<ImageUploadStats>();
    readonly trophySuiteImageUploads = input.required<ImageUploadStats>();


    private _getSeries(uploads: ImageUploadStats): ApexAxisChartSeries {
        return [{name: 'Count', data: [uploads.uploaded, uploads.pending]}];
    }

    readonly gameImageSeries = computed<ApexAxisChartSeries>(() => this._getSeries(this.gameImageUploads()));
    readonly igdbImageSeries = computed<ApexAxisChartSeries>(() => this._getSeries(this.igdbImageUploads()));
    readonly playerAvatarSeries = computed<ApexAxisChartSeries>(() => this._getSeries(this.playerAvatarUploads()));
    readonly trophyIconSeries = computed<ApexAxisChartSeries>(() => this._getSeries(this.trophyIconUploads()));
    readonly trophySuiteImageSeries = computed<ApexAxisChartSeries>(() => this._getSeries(this.trophySuiteImageUploads()));

    readonly gameImageTitle: ApexTitleSubtitle = {text: 'Game Images', align: 'left'};
    readonly igdbImageTitle: ApexTitleSubtitle = {text: 'IGDB Images', align: 'left'};
    readonly playerAvatarTitle: ApexTitleSubtitle = {text: 'Player Avatars', align: 'left'};
    readonly trophyIconTitle: ApexTitleSubtitle = {text: 'Trophy Icons', align: 'left'};
    readonly trophySuiteImageTitle: ApexTitleSubtitle = {text: 'Trophy Suite Images', align: 'left'};

    get graphs() {
        return [
            {id: 1, series: this.gameImageSeries(), title: this.gameImageTitle},
            {id: 2, series: this.igdbImageSeries(), title: this.igdbImageTitle},
            {id: 3, series: this.playerAvatarSeries(), title: this.playerAvatarTitle},
            {id: 4, series: this.trophyIconSeries(), title: this.trophyIconTitle},
            {id: 5, series: this.trophySuiteImageSeries(), title: this.trophySuiteImageTitle},
        ]
    }


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
