import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTourTypeModel from "@/components/modules/Admin/TourType/AddTourTypeModal";
import {
  useDeleteTourTypeMutation,
  useGetAllTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function TourType() {
  const { data: tourTypeData } = useGetAllTourTypeQuery(undefined);
  const [deleteTourType] = useDeleteTourTypeMutation();

  const handleDelete = async (id: string) => {
    try {
      const toastId = toast.loading("deleting");
      const result = await deleteTourType(id).unwrap();
      console.log(result);
      toast.success("successfully deleted", { id: toastId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-5 ">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Tour Type list</h1>
        <AddTourTypeModel />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className="text-right">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tourTypeData?.map((tourType: { _id: string; name: string }) => (
            <TableRow key={tourType._id}>
              <TableCell className="font-medium">{tourType._id}</TableCell>
              <TableCell>{tourType.name}</TableCell>
              <TableCell className="text-right">
                <DeleteConfirmation
                  handleDelete={() => handleDelete(tourType._id)}
                >
                  <Trash2 />
                </DeleteConfirmation>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
