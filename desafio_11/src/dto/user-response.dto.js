export const userResponseDto = (user) => {
  return { //Aca filtramos la informacion de lo que esta retornado nuestro DTO
    first_name: user.first_name,
    email: user.email,
    role: user.role,
  };
};