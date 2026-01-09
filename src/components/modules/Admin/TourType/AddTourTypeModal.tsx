import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const tourTypeSchema = z.object({
  name: z.string(),
});

export default function AddTourTypeModel() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const [createTourType] = useCreateTourTypeMutation();

  const onsubmit = async (data: z.infer<typeof tourTypeSchema>) => {
    try {
      const toastId = toast.loading("creating");
      await createTourType(data).unwrap();
      setOpen(false);
      toast.success("Tour Type created successfully", { id: toastId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form id="tour-type" onSubmit={form.handleSubmit(onsubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tour type name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="tour-type" type="submit">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
