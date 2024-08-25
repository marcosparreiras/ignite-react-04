import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
  });

  const { register, handleSubmit, formState } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManageRestaurantCache(data: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);
    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name: data.name,
          description: data.description,
        }
      );
    }
    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate(variables) {
      const { cached } = updateManageRestaurantCache({
        description: variables.description ?? "",
        name: variables.name,
      });

      return { previusProfile: cached };
    },
    onError(_error, _variables, context) {
      if (context?.previusProfile) {
        updateManageRestaurantCache({
          description: context.previusProfile.description ?? "",
          name: context.previusProfile.name,
        });
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn(data);
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Algo deu errado, tente novamente mais tarde!");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={formState.isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
