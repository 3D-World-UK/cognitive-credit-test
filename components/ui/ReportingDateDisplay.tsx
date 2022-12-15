import { ReportingDate } from '../../interfaces';
import {
  ColDef,
  GridOptions,
  GridApi,
} from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';

/**
 * Component to display a grid of reporting dates
 * @param props: { data: ReportingDate[], loading: boolean }
 * @returns JSX.Element
 */
export default function ReportingDateDisplay(props: { data: ReportingDate[], loading: boolean }) {

  /**
   * State
   */
  const gridRef = useRef(null);
  const [gridReady, setGridReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReportingDate[]>([...props.data]);
  const [api, setApi] = useState<GridApi | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const DateRenderer = (params: { value: Date }) => params.value ? params.value.toLocaleDateString() : null;
  /**
   * Column Definitions
   */
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'companyName', headerName: 'Company Name', minWidth: 200, sortable: true },
    {
      field: 'lastReportingDate',
      headerName: 'Last Reporting Date',
      minWidth: 120,
      sortable: true,
      cellRenderer: DateRenderer,
    },
    { 
      field: 'lastReportingPeriod', 
      headerName: 'Last Reporting Period', 
      minWidth: 120, 
      sortable: true,
    },
    {
      field: 'nextReportingDate',
      headerName: 'Next Reporting Date',
      minWidth: 120,
      sortable: true,
      cellRenderer: DateRenderer,
    },
    {
      field: 'nextReportingInferred',
      headerName: 'Next Reporting Inferred',
      minWidth: 80,
      sortable: true,
      cellRenderer: (params: any) => params.value ? '✅' : '❌',
    },
  ]);

  /**
   * Side Effects
   */
  useEffect(() => {

    setLoading(props.loading);

    // if the grid is ready, set the data and refresh the grid. otherwise, clear the data and wait for loading to complete.
    if (api) {
      if (props.loading) {
        api.setRowData([]);
        api.refreshCells();
        api.showLoadingOverlay();
      } else {
        setData(props.data);
        api.setRowData(props.data)
        api.refreshHeader();
        api.hideOverlay();
      }
      if (gridReady) api.sizeColumnsToFit();
    }
    //Apply dark mode if the user has set it in their browser
    if (window) {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (event) => {
        setDarkMode(event.matches);
      });
    }
    // remove the event listener when the component is unmounted.
    return () => {
      if (window) {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', (event) => {
          setDarkMode(event.matches);
        });
      }
    }
  }, [props.data, props.loading, gridReady]);

  /**
   * set the grid api when the grid is ready so we can use it in other logic.
   */
  const onGridReady = useCallback((params: GridOptions) => {
    setGridReady(true);
    if (params && params.api)
      setApi(params.api);
  }, []);


  /**
   * Render the component
   */
  return <div className='flex-1 '>
    <AgGridReact<ReportingDate>
      ref={gridRef}
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      className={darkMode ? 'fill-grid ag-theme-alpine-dark' : 'fill-grid ag-theme-alpine'}
      onGridSizeChanged={() => { if (api) api.sizeColumnsToFit() }}
    />
  </div>
}
