import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon-only" | "text-only";
  className?: string;
}

const sizeConfig = {
  sm: { icon: "w-6 h-6", text: "text-lg", container: "gap-2" },
  md: { icon: "w-8 h-8", text: "text-xl", container: "gap-3" },
  lg: { icon: "w-10 h-10", text: "text-2xl", container: "gap-3" },
  xl: { icon: "w-12 h-12", text: "text-3xl", container: "gap-4" },
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "full",
  className = "",
}) => {
  const config = sizeConfig[size];

  const CustomLogoIcon = () => (
    <div className={`${config.icon} relative`}>
      <img
        src="/MindFlow-logo.svg"
        alt="MindFlow Logo"
        className="w-full h-full"
      />
    </div>
  );

  const LogoText = () => (
    <span
      className={`${config.text} font-bold text-[#202020]`}
      style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
    >
      MindFlow
    </span>
  );

  if (variant === "icon-only") {
    return (
      <div className={className}>
        <CustomLogoIcon />
      </div>
    );
  }

  if (variant === "text-only") {
    return (
      <div className={className}>
        <LogoText />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      <CustomLogoIcon />
      <LogoText />
    </div>
  );
};

export const LogoDark: React.FC<LogoProps> = ({
  size = "md",
  variant = "full",
  className = "",
}) => {
  const config = sizeConfig[size];

  const CustomLogoIconDark = () => (
    <div className={`${config.icon} relative`}>
      <img
        src="/MindFlow-logo.svg"
        alt="MindFlow Logo"
        className="w-full h-full"
      />
    </div>
  );

  const LogoTextDark = () => (
    <span
      className={`${config.text} font-bold text-white`}
      style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
    >
      MindFlow
    </span>
  );

  if (variant === "icon-only") {
    return (
      <div className={className}>
        <CustomLogoIconDark />
      </div>
    );
  }

  if (variant === "text-only") {
    return (
      <div className={className}>
        <LogoTextDark />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      <CustomLogoIconDark />
      <LogoTextDark />
    </div>
  );
};

export default Logo;
