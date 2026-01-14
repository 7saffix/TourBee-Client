import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";

const DivisionList = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Division list</h1>
        <AddDivisionModal />
      </div>
    </div>
  );
};

export default DivisionList;
