import { Children } from "react";

export default function Page() {
    return (
    <div className="flex min-h-screen flex-col items-center justify-center">
    <header className="flex w-full h-24 items-center justify-center border-b dark:border-b-slate-900 bg-sky-200 dark:bg-slate-700 dark:text-white drop-shadow-md"><h1>Cognitive Credit - Report Schedule</h1></header>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-sky-100 dark:bg-slate-600 dark:text-white">
        
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t  dark:border-t-slate-900 bg-sky-200 dark:bg-slate-700 dark:text-white drop-shadow-md">
        <a
          className="flex items-center justify-center gap-2"
          href="https://www.linkedin.com/in/ben-knowles-3949a021/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; Ben Knowles
        </a>
      </footer>
    </div>
    )
}
