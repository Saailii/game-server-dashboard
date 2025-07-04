import { useAuth } from "@/context/authContext";

export const useIsAuthor = (authorId: string): boolean => {
  const { user, isLoading } = useAuth();

  // tant qu’on charge, on n’est pas auteur
  if (isLoading || !user) {
    return false;
  }

  // on renvoie directement le résultat de la comparaison
  return user.id === authorId;
};
