
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found!
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! It looks like you've ventured off the page. The comic you're
          looking for isn't here—maybe it's hiding behind a secret panel.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Comic Book SVG Illustration */}
      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 300"
          width="200"
          height="300"
        >

          <rect
            x="10"
            y="10"
            width="180"
            height="280"
            rx="15"
            fill="#FFF7D6"
            stroke="#000"
            strokeWidth="4"
          />

          <line x1="10" y1="150" x2="190" y2="150" stroke="#000" strokeWidth="2" />

          <text
            x="100"
            y="70"
            fontFamily="Comic Sans MS, cursive"
            fontSize="24"
            textAnchor="middle"
            fill="#000"
          >
            Comic
          </text>
          <text
            x="100"
            y="110"
            fontFamily="Comic Sans MS, cursive"
            fontSize="24"
            textAnchor="middle"
            fill="#000"
          >
            Store
          </text>

          <text
            x="100"
            y="250"
            fontFamily="Comic Sans MS, cursive"
            fontSize="16"
            textAnchor="middle"
            fill="#FF0000"
          >
            POW!
          </text>

          <line x1="30" y1="30" x2="50" y2="50" stroke="#FF0000" strokeWidth="3" />
          <line x1="150" y1="30" x2="170" y2="50" stroke="#FF0000" strokeWidth="3" />
          <line x1="30" y1="270" x2="50" y2="250" stroke="#FF0000" strokeWidth="3" />
          <line x1="150" y1="270" x2="170" y2="250" stroke="#FF0000" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
