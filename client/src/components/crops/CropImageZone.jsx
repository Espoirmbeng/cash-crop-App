import { cn } from "../../lib/utils";

export function CropImageZone({ imageClass, className }) {
  return (
    <div
      className={cn(
        "min-h-[160px] rounded-[16px] bg-[linear-gradient(135deg,#0D3D22,#2E8B57)]",
        imageClass,
        className,
      )}
    />
  );
}
