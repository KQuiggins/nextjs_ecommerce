import Image from "next/image";

interface ComicBookSpinnerProps {
    size?: number;
  }

  const ComicBookSpinner: React.FC<ComicBookSpinnerProps> = ({ size = 100 }) => {
    return (
      <div className="flex items-center justify-center" aria-label="Loading">
        <Image
          src="/images/loading.webp"
          alt="Comic Book Spinner"
          width={size}
          height={size}
          className="animate-spin"
        />
      </div>
    );
  };

  export default ComicBookSpinner;
