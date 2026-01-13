import AddTourModal from "@/components/modules/Tour/AddTourModal";

const Tour = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Tour list</h1>
        <AddTourModal />
      </div>
    </div>
  );
};

export default Tour;
