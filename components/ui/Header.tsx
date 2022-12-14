export default function Header(props: { filter: string, onChange: (value:string) => void, onFetchData: () => void }) {

    const handleClick = (event : any) => {
        event.preventDefault();
        props.onFetchData();
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault;
        event.stopPropagation;
        props.onChange(event.target.value);
    }

    return (
        <header className="border-b dark:border-b-slate-900 bg-sky-200 dark:bg-slate-700 dark:text-white drop-shadow-md">
            <div className="flex justify-between items-center p-2">
                <h1 className="pr-4">Cognitive Credit - Report Schedule</h1>
                <button 
                    id="fetch-data-btn"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded drop-shadow-xl"
                    onClick={(event) => handleClick(event)}>
                        Fetch Data
                    </button>
                <input
                    id="search"
                    name="Search"
                    type="text"
                    placeholder="Search Company Name"
                    value={props.filter}
                    className="p-2 text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-600 rounded"
                    onChange={onChange} />
            </div>
        </header>
    )
}
