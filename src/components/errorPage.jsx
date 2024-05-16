import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl mb-4">Oops!</h1>
        <p className="text-6xl mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-5xl">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <button
        type="button"
        className="mt-8 w-full px-6 py-3 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-opacity-50"
      >
        <Link to={"/"}>Go back home</Link>
      </button>
    </div>
  );
}
