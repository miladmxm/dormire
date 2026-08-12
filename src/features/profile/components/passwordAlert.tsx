import { ShieldCheck } from "lucide-react";

const PasswordAlert = () => {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-secondary-500/5 px-4 py-3 text-xs leading-6 text-secondary-800">
      <ShieldCheck className="size-4 shrink-0" />
      هیچ‌وقت رمز عبور یا کد یک‌بارمصرف خود را در اختیار دیگران قرار ندهید.
    </div>
  );
};

export default PasswordAlert;
