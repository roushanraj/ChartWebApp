import { of } from "rxjs";
import { ResultService } from "./result-service";

describe('Result sevice', () => {
    let resultService: ResultService;
    let mockhttp: any;
    beforeEach(() => {
        resultService= new ResultService(mockhttp);
    });
    
    it('should return Result of students', () => {
        let mockresult= [
            {name: "dummy Kishore", rollNo: 12, standard: 8, percentage: 88}
        ];
        let result: any;
        spyOn(resultService, "getResult").and.returnValue(of(mockresult));
        resultService.getResult("result").subscribe(res => {result= res});
        expect(result).toEqual(mockresult);
    });
});
