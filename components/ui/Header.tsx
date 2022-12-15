/**
 * Header component with search and fetch data button
 * @param props : { filter: string, onChange: (value:string) => void, onFetchData: () => void }
 * @returns 
 */
export default function Header(props: { filter: string, onChange: (value: string) => void, onFetchData: () => void }) {

    /**
     * Handle click event for fetch data button and call the onFetchData function passed in as a prop
     * @param event 
     */
    const handleClick = (event: any) => {
        event.preventDefault();
        props.onFetchData();
    }

    /**
     * Handle change event for search input and call the onChange function passed in as a prop
     * @param event : React.ChangeEvent<HTMLInputElement>
     */
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault;
        event.stopPropagation;
        props.onChange(event.target.value);
    }

    /** 
     * Render the header component
     */
    return (
        <header className="md:flex md:justify-between p-2 border-b dark:border-b-slate-900 bg-sky-200 dark:bg-slate-700 dark:text-white drop-shadow-md">
            <img
                src="https://3d-world-uk.github.io/cognitive-credit-test/CognitiveCreditAltLogo.svg"
                alt="Cognitive Credit"
                title="Cognitive Credit"
                className="flex h-10 drop-shadow-lg"
            />
            <h1 className="p-2 text-xl">Report Schedule</h1>
            <div>
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
                    className="p-2 ml-2 text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-600 rounded"
                    onChange={onChange} />
            </div>
        </header>
    )
}
