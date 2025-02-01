import Spinner from '../components/Spinner';

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner size={100} />
        </div>
    );
};

export default LoadingPage;