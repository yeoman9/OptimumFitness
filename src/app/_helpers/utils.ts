import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export default class Utils {
    static MonthsMap : Map<string, string> = 
    new Map([
        ["01", "Jan"],
        ["02", "Feb"],
        ["03", "Mar"],
        ["04", "Apr"],
        ["05", "May"],
        ["06", "Jun"],
        ["07", "Jul"],
        ["08", "Aug"],
        ["09", "Sep"],
        ["10", "Oct"],
        ["11", "Nov"],
        ["12", "Dec"]       
    ]);
}