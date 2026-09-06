export async function GET(request: Request) {
  const rawKey = process.env.OPENROUTER_API_KEY;
  const rawOpenAIKey = process.env.OPENAI_API_KEY;

  if (!rawKey && !rawOpenAIKey) {
    return Response.json({
      status: "error",
      message:
        "Neither OPENROUTER_API_KEY nor OPENAI_API_KEY is found in process.env on Vercel.",
      availableEnvVarNames: Object.keys(process.env).filter(
        (k) =>
          !k.includes("SECRET") &&
          !k.includes("PASSWORD") &&
          !k.includes("TOKEN") &&
          !k.includes("KEY")
      ),
    });
  }

  const keySource = rawKey ? "OPENROUTER_API_KEY" : "OPENAI_API_KEY";
  const rawValue = rawKey || rawOpenAIKey || "";
  const keyToTest = rawValue.trim().replace(/^["']|["']$/g, "");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
      headers: {
        Authorization: `Bearer ${keyToTest}`,
      },
    });
    const data = await res.json();

    return Response.json({
      status: res.ok ? "authenticated" : "authentication_failed",
      httpStatus: res.status,
      keyDetails: {
        sourceVariable: keySource,
        length: keyToTest.length,
        prefix: keyToTest.slice(0, 12),
        suffix: keyToTest.slice(-6),
        hadQuotesOrWhitespace: rawValue !== keyToTest,
      },
      openRouterResponse: data,
    });
  } catch (err: unknown) {
    return Response.json({
      status: "network_error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
