import {Component, computed, input} from '@angular/core';
import {IgdbMappingStats} from "../../../core/api/dtos/igdb/igdb-mapping-stats";
import {ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: string[];
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'tq-dashboard-igdb-mapping',
    imports: [
        NgApexchartsModule
    ],
    templateUrl: './dashboard-igdb-mapping.component.html',
    styleUrl: './dashboard-igdb-mapping.component.scss',
})
export class DashboardIgdbMappingComponent {
    readonly stats = input.required<IgdbMappingStats>();

    readonly chartOptions = computed<ChartOptions>(() => {
        const stats = this.stats();
        return {
            series: [
                stats.matched,
                stats.validationRequired,
                stats.pending,
                stats.noFoundCandidate,
                stats.allRefused
            ],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: ["Matched", "Validation Required", "Pending", "No Candidate Found", "All Refused"],
            dataLabels: {
                enabled: true,
                colors: [
                    '#00E396',
                    '#ffea00',
                    '#FEB019',
                    '#FF4560',
                    '#ff0044',
                ]
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };
    });
}
