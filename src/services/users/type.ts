import type { UserWithPhoneNumber, UserWithRole } from "better-auth/plugins";

import type { Role } from "@/constant/appData";

export type User = UserWithPhoneNumber & UserWithRole & { role: Role };
