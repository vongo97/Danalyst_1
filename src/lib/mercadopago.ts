export const MERCADOPAGO_API_URL = "https://api.mercadopago.com";

export async function createPreference(
  preferenceData: any,
  accessToken: string
) {
  console.log(
    "Creando preferencia con datos:",
    JSON.stringify(preferenceData, null, 2)
  );
  console.log("Token utilizado:", accessToken);

  const response = await fetch(MERCADOPAGO_API_URL + "/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(preferenceData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      "Error creando preferencia Mercado Pago: " + JSON.stringify(errorData)
    );
  }

  return response.json();
}
