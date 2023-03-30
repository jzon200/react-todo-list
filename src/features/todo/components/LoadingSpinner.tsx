export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600" />
    </div>
  );
}
