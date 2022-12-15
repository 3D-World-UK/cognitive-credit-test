/**
 * Footer component for the application. This is a stateless component.
 * @returns Footer component
 */
export default function Footer() {
    return (
        <footer className="flex w-full justify-center text-center vertical-align-center border-t dark:border-t-slate-900 bg-sky-200 dark:bg-slate-700 dark:text-white drop-shadow-md">
        <a
          className="p-4"
          href="https://www.linkedin.com/in/ben-knowles-3949a021/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; Ben Knowles
        </a>
        <a 
          className="p-4"
          href="https://github.com/3D-World-UK/cognitive-credit-test"
          target="_blank"
          rel="noopener noreferrer"
        >
        <img 
          src="https://3d-world-uk.github.io/cognitive-credit-test/github-mark/github-mark-white.svg" 
          alt="View Source on Github" 
          title="View Source on Github" 
          className="flex w-6 h-6" />
        </a>
      </footer>
    )
}
