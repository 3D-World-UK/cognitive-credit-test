
import { ReportingDate } from '../../interfaces';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  RowSelectedEvent,
  ValueFormatterParams,
  GridApi,
} from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';

export default function ReportingDateDisplay(props: { data: ReportingDate[], loading: boolean }) {

  const [gridReady, setGridReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReportingDate[]>([ ...props.data ]);
  const [api, setApi] = useState<GridApi | null>(null);
  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'companyName', headerName: 'Company Name', sortable: true },
    { field: 'lastReportingDate', headerName: 'Last Reporting Date', sortable: true },
    { field: 'lastReportingPeriod', headerName: 'Last Reporting Period', sortable: true },
    { field: 'nextReportingDate', headerName: 'Next Reporting Date', sortable: true },
    { field: 'nextReportingInferred', headerName: 'Next Reporting Inferred', sortable: true },
  ]);

  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams<ReportingDate>) => {
      // Brute force approach to ensure unique row ids on the ReportingDate records for the sake of this exercise
      return params.data.companyName + params.data.lastReportingDate + params.data.lastReportingPeriod + params.data.nextReportingDate + params.data.nextReportingInferred;
    };
  }, []);

  useEffect(() => {
    setData(props.data);
    setLoading(props.loading);
    if(api){
      if(props.loading){
        api.showLoadingOverlay();
      }else{
        api.setRowData(props.data)
        api.hideOverlay();
      }
      if(gridReady) api.sizeColumnsToFit();
    }
  }, [props.data, props.loading, gridReady]);

  const onGridReady = useCallback((params: GridOptions) => {
    setGridReady(true);
    if(params && params.api)
    setApi(params.api);
  }, []);

    return <div className='flex-1 '>
      <AgGridReact<ReportingDate>
        ref={gridRef}
        columnDefs={columnDefs}
        getRowId={getRowId}
        onGridReady={onGridReady}
        className="fill-grid ag-theme-alpine-dark"
      />
    </div>
}
