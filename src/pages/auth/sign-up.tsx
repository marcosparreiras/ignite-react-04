import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  email: z.string().email(),
  phone: z.string(),
  restaurantName: z.string(),
  managerName: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const { register, formState, handleSubmit } = useForm<SignUpForm>();
  const navigate = useNavigate();

  const { mutateAsync: createRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await createRestaurant(data);
      toast.success("Restautante registrado", {
        action: {
          label: "login",
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`);
          },
        },
      });
    } catch {
      toast.error("Algo deu errado, tente novamente mais tarde!");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurant">Seu resutaurente</Label>
              <Input
                id="restaurant"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">Seu nome</Label>
              <Input id="manager" type="text" {...register("managerName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input id="phone" type="text" {...register("phone")} />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com os nossos{" "}
              <a className="underline underline-offset-4" href="#">
                termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="#">
                politicas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
