import {Component, computed, input} from '@angular/core';
import {IgdbMappingStats} from "../../../core/api/dtos/igdb/igdb-mapping-stats";
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
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
                {
                    name: "Count",
                    data: [
                        stats.pending,
                        stats.matched,
                        stats.validationRequired,
                        stats.noFoundCandidate,
                        stats.allRefused
                    ]
                }
            ],
            chart: {
                height: 350,
                type: "bar"
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: false
                }
            },
            xaxis: {
                categories: ["Pending", "Matched", "Validation Required", "No Candidate Found", "All Refused"]
            },
            dataLabels: {
                enabled: true,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };
    });
}
