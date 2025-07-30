type Stack = "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";

type FrontendOnly =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

type Common = "auth" | "config" | "middleware" | "utils";

type Package = FrontendOnly | Common;

export async function Log(
  stack: Stack,
  level: Level,
  logPackage: Package,
  message: string
): Promise<void> {
  const allowedPackages: Package[] = [
    "api", "component", "hook", "page", "state", "style",
    "auth", "config", "middleware", "utils"
  ];

  if (!allowedPackages.includes(logPackage)) {
    console.error(`Invalid log package "${logPackage}" for frontend`);
    return;
  }

  const payload = {
    stack,
    level,
    package: logPackage,
    message,
  };

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Log sent:", data);
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
