export async function GET() {
  // Simuler un appel à une vraie API ou base de données
  // En production, vous pourriez utiliser une vraie base de données
  const nombreVisiteurs = Math.floor(Math.random() * 20000) + 10000; // Entre 10K et 30K

  return new Response(
    JSON.stringify({
      count: nombreVisiteurs,
      formated: formatNumber(nombreVisiteurs),
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
}

// Fonction utilitaire pour formater les nombres
function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}
