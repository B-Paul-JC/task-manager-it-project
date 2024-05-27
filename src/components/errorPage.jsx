import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-4 items-center justify-center px-32 scale-75">
        <div className="relative">
          <img
            src="/src/assets/images/broken.png"
            className="w-96 h-96"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-6xl mb-4">Uh Oh</p>
          <h1 className="text-9xl mb-4">{error.status}</h1>
          <p className="text-5xl">
            <i>{error.statusText || error.message}</i>
          </p>
          <button
            type="button"
            className="mt-8 w-full px-6 py-3 rounded-3xl text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-opacity-50"
          >
            <Link to={"/"}>Go back home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
