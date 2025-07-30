import fetch from "node-fetch";

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";

type BackendOnly =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

type FrontendOnly =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

type Common = "auth" | "config" | "middleware" | "utils";

type Package = BackendOnly | FrontendOnly | Common;

export async function Log(
  stack: Stack,
  level: Level,
  logPackage: Package,
  message: string
): Promise<void> {
  const backendOnly: BackendOnly[] = [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
  ];

  const frontendOnly: FrontendOnly[] = [
    "api",
    "component",
    "hook",
    "page",
    "state",
    "style",
  ];

  const common: Common[] = ["auth", "config", "middleware", "utils"];


  const isValid =
    (stack === "backend" &&
      (backendOnly.includes(logPackage as BackendOnly) ||
        common.includes(logPackage as Common))) ||
    (stack === "frontend" &&
      (frontendOnly.includes(logPackage as FrontendOnly) ||
        common.includes(logPackage as Common)));

  if (!isValid) {
    console.error(
      `Invalid package "${logPackage}" used with stack "${stack}"`
    );
    return;
  }

  const payload = {
    stack,
    level,
    package: logPackage,
    message,
  };

  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("Log sent:", data);
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
