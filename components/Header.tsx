import Link from "next/link";

// import NextThemeProvider from "./ThemeProvider";
// import ThemeSwitch from "./ThemeSwitch";


function Header() {

  return (
    <div className="bg-gray-800 p-4 text-white dark:bg-gray-700 dark:text-white">
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center flex-grow">
          {/* <NextThemeProvider>
            <ThemeSwitch />
          </NextThemeProvider> */}
        </div>
        <h1 className="text-2xl font-extrabold uppercase">
          <Link href={`/`}>Todo List</Link>
        </h1>
        <div className="flex items-center flex-grow justify-end">
          <Link
            href={`/add`}
            className="dark:hover:text-gray-300 font-extrabold uppercase">
            Add Todo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
