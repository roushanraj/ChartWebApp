import { TestBed } from '@angular/core/testing';
import {BarChartComponent, Result} from './bar-chart.component'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

Result
describe("BarChartComponent", ()=> 
{
    let barservice: BarChartComponent,
    httptestconrtoller: HttpTestingController;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[BarChartComponent]
        });

        barservice = TestBed.inject(BarChartComponent);
        httptestconrtoller=TestBed.inject(HttpTestingController);

    });
    it('gets all the result',()=>{
        const dummydata: Result[]=[
            {"name":"Dummy Kumar","rollNo":420,"standard":9,"percentage":99},
            {"name":"Dummy Kishore","rollNo":421,"standard":9,"percentage":98}
    ];
        expect(barservice.names.length).toBe(2);
    });
});

