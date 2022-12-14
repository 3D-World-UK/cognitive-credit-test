import type { NextPage } from 'next'
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState, useRef, useCallback } from 'react';
import fetchReportingDates from '../components/data/ReportingDatesDelegate';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import ReportingDateDisplay from '../components/ui/ReportingDateDisplay';
import { ReportingDate } from '../interfaces';

const Home: NextPage = () => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState<ReportingDate[]>([]);
  const [unfilteredData, setUnfilteredData] = useState<ReportingDate[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = async () => {
    setData([]);
    setFilter('');
    setIsFetching(true);
    const data = await fetchReportingDates();
    setIsFetching(false);
    setData(data);
    setUnfilteredData(data);    
  }

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
        onFetchData={handleFetch}
      />
      <ReportingDateDisplay data={data} loading={isFetching} />
      <Footer />
    </div>
  )
}

export default Home


