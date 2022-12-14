import { ReportingDate } from "../../interfaces";
import { sleep } from "../../utils";

//Mock API Call

export default async function FetchReportingDates(){
  //hardcoded url. In a real world scenario, this would be a config value
  const response = await fetch('/cognitive-credit-test/api/reporting-dates');

  console.log("Sleeping for 3 seconds...")
  //Mock Loading Time
  await sleep(3000);
  console.log("Done Sleeping...")

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(`response is not okay${text ? `: ${text}` : ""}`);
  }

  return await response.json() as ReportingDate[];
}