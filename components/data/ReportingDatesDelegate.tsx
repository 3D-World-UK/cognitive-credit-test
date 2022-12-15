import { ReportingDate } from "../../interfaces";
import { sleep } from "../../utils";

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
 * @param date 
 * @param inferred
 * @returns Date
 */
function nextReportingDate(date: string, inferred: boolean) {
  //if no date, return null and avoid extra processing
  if(!date) return null;

  //Date Object to hold date parts
  const dObj = {
    year: 0,
    month: 0,
    day: 0,
  }

  if(date.indexOf("/") !== -1){

    //if slash, split and create date
    let [year,month,day] = date.substring(0,9).split("/")
    dObj.year = parseInt(year);
    dObj.month = parseInt(month);
    dObj.day = parseInt(day);

  }else if(date.indexOf(",") !== -1){

    //if comma, split and only keep the first part
    date = date.substring(0, date.indexOf(","));
    
  }else{
  
      //if no slash or comma, assume it's a month name
      const month = date.substring(0,3);
      const year = date.substring(4,8);
      const day = inferred || isNaN(parseInt(date.substring(9,11))) ? new Date(parseInt(year), parseInt(month), 0).getDate() : parseInt(date.substring(9,11));
      dObj.year = parseInt(year);
      dObj.month = parseInt(month);
      dObj.day = day;
  
  }
  //return the date at EoD
  return new Date(dObj.year,dObj.month,dObj.day,23,59,59);
}

/**
 * Function to parse the last reporting period
 * @param date 
 * @returns Date
 */
function lastReportingPeriod(date: string) {
  return new Date(date);
}

/**
 * Function to fetch the reporting dates from the API
 * @returns ReportingDate[]
 */
export default async function FetchReportingDates(){
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
      lastReportingDate:lastReportingDate(item.lastReportingDate),
      lastReportingPeriod: lastReportingPeriod(item.lastReportingPeriod),
      nextReportingDate: nextReportingDate(item.nextReportingDate,item.nextReportingInferred),
      nextReportingInferred: item.nextReportingInferred,
    } as ReportingDate;
  });

  return result;
}