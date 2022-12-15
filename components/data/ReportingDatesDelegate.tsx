import { ReportingDate } from "../../interfaces";
import { sleep } from "../../utils";
import {format} from "date-fns";

/**
 *  Function to parse the last reporting date
  * @param date 
  * @returns Date
 */
function lastReportingDate(date: string) {
  return new Date(date);
}

/**
 * Function to parse the next reporting date
 * @param date : string
 * @param inferred : boolean
 * @param name : string
 * @returns Date
 */
function nextReportingDate(date: string, inferred: boolean, name: string = "") { 
  //if no date, return null and avoid extra processing
  if (!date) return null;

  let initialDate = new Date(date);

  if (initialDate.toString() === "Invalid Date") {
    //Date Object to hold date parts
    const dObj = {
      year: 0,
      month: 0,
      day: 0,
    }

    if (date.indexOf("/") !== -1) {

      //if slash, split and create date
      let [day,month,year] = date.substring(0, 10).split("/")
      dObj.year = parseInt(year);
      //month is parsed differently to the other conditions. Subtract 1 to get the correct month in the later logic
      dObj.month = parseInt(month) -1;
      dObj.day = parseInt(day);

    } else if (date.indexOf(",") !== -1) {

      //if comma, split and only keep the first part
      date = date.substring(0, date.indexOf(","));

    } 
    //if dash split and assign to date object
    if(date.indexOf("-") !== -1) {
      const parts = date.split('-');
      dObj.year = parseInt(parts[0]);
      dObj.month = parseInt(parts[1]);
      dObj.day = parseInt(parts[2]);
    }
    //set the date at EoD
    initialDate = new Date(dObj.year, dObj.month, dObj.day, 23, 59, 59);
  }
  //if inferred, set to last day of the month
  if (inferred) {
    //Enable logging to verify accuracy of the date conversion
    //console.log(name,date)
    //console.log(name,initialDate)
    initialDate.setMonth(initialDate.getMonth() + 1);
    initialDate.setDate(0);
    initialDate.setHours(23, 59, 59);
    //console.log(name,initialDate)
  }
  return initialDate;
}


/**
 * Function to parse the last reporting period
 * @param date 
 * @returns Date
 */
function lastReportingPeriod(date: string) {
  const periods : { [key: string]: number } = {
    "1Q": 3,
    "2Q": 6,
    "3Q": 9,
    "4Q": 12,
    "1H": 6,
    "2H": 12,
    "FY": 4,
  }
  const period = date.substring(0, 2);
  const year = date.substring(2, 4);
  const d = new Date();
  d.setFullYear(parseInt(`20${year}`));
  d.setMonth(periods[period]);
  d.setDate(0);
  d.setHours(23, 59, 59);
  return  `(${format(d,'yyyy-MM-dd')}) ${date}`;
}

/**
 * Function to fetch the reporting dates from the API
 * @returns ReportingDate[]
 */
export default async function FetchReportingDates() {
  //hardcoded url. In a real world scenario, this would be a config value
  const response = await fetch(`${window.location.href}/api/reporting-dates`);

  //Mock Loading Time
  await sleep(3000);

  //if response is not okay, throw an error
  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(`response is not okay${text ? `: ${text}` : ""}`);
  }

  //parse the response
  const raw: any[] = await response.json();

  //map the response to the ReportingDate interface
  const result: ReportingDate[] = raw.map((item) => {
    return {
      companyName: item.companyName,
      lastReportingDate: lastReportingDate(item.lastReportingDate),
      lastReportingPeriod: lastReportingPeriod(item.lastReportingPeriod),
      nextReportingDate: nextReportingDate(item.nextReportingDate, item.nextReportingInferred, item.companyName),
      nextReportingInferred: item.nextReportingInferred,
    } as ReportingDate;
  });

  return result;
}