import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useCreateTourMutation,
  useGetAllTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const tourSchema = z.object({
  title: z.string(),
  division: z.string(),
  tourType: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string(),
  included: z.array(z.string()),
});

const START_DATE = new Date();
const END_DATE = new Date(START_DATE.getTime() + 3 * 24 * 60 * 60 * 1000);

const AddTourModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { data: divisionData } = useGetDivisionQuery(undefined);
  const { data: tourTypeData } = useGetAllTourTypeQuery(undefined);
  const [createTour] = useCreateTourMutation();

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      startDate: START_DATE,
      endDate: END_DATE,
      description: "",
      included: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included" as never,
  });
  const onSubmit = async (data: z.infer<typeof tourSchema>) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };
    console.log(tourData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((img) => formData.append("files", img));

    try {
      const toastId = toast.loading("creating");
      const result = await createTour(formData).unwrap();
      console.log(result);
      if (result.success) {
        toast.success("tour created successfully", { id: toastId });
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Tour</Button>
      </DialogTrigger>
      {/* Responsive Width: Full on mobile, 700px on desktop */}
      <DialogContent className="max-w-[95vw] sm:max-w-3xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Add Tour</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes and Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable container for the form */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <Form {...form}>
            <form
              id="tour-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Responsive Grid: 1 col on mobile, 2 col on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionData?.map(
                            (division: { _id: string; name: string }) => (
                              <SelectItem
                                key={division._id}
                                value={division._id}
                              >
                                {division.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tour-type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeData?.map(
                            (tourType: { _id: string; name: string }) => (
                              <SelectItem
                                key={tourType._id}
                                value={tourType._id}
                              >
                                {tourType.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date Pickers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              {/* Responsive Layout: Stacks on mobile, Side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[120px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormLabel>Tour Images</FormLabel>
                  {/* Passing the hook's setter to the component */}
                  <MultipleImageUploader setImages={setImages} />
                </div>
              </div>

              {/* Included Items Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FormLabel>What's Included</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")} // Adds a new empty string to the array
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`included.${index}`} // Important: use backticks and index
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Professional Guide"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No items added yet.
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="p-6 pt-2 border-t flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="tour-form" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourModal;
