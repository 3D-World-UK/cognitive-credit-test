import type { NextPage } from 'next'
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState, useRef, useCallback } from 'react';
import fetchReportingDates from '../components/data/ReportingDatesDelegate';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import ReportingDateDisplay from '../components/ui/ReportingDateDisplay';
import { ReportingDate } from '../interfaces';
/**
 * The main page for the application. This is a stateful component which wires up the data fetching and filtering.
 * @returns 
 */
const Home: NextPage = () => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState<ReportingDate[]>([]);
  const [unfilteredData, setUnfilteredData] = useState<ReportingDate[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Handle fetch data button click, manage state and fetch data
  const handleFetch = async () => {
    setIsFetching(true);
    const data: ReportingDate[] = await fetchReportingDates();
    setIsFetching(false);
    setUnfilteredData(data);    
    setData(data);
  }

  // Filter the data when the filter value changes
  useEffect(() => {
    if(filter.length > 0 && data.length > 0) {
      const filteredData = data.filter((item) => item.companyName.toLowerCase().includes(filter.toLowerCase()));
      setData(filteredData);
    }
    else{
      setData(unfilteredData);
    }
  }, [filter]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Head>
        <title>Ben Knowles - Cognitive Credit Technical Test</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Header
        filter={filter}
        onChange={setFilter}
        onFetchData={()=>{
          setData([]); 
          handleFetch();}}
      />
      <ReportingDateDisplay data={data} loading={isFetching} />
      <Footer />
    </div>
  )
}

export default Home


